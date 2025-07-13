import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { roadmapId, userInput } = await req.json();
    const user = await currentUser();

    // Send Inngest event
    const resultIds = await inngest.send({
      name: "AiRoadMapAgent",
      data: {
        userInput,
        roadmapId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });

    const runId = resultIds?.ids?.[0];
    if (!runId) {
      console.error("❌ No runId received from Inngest.");
      return NextResponse.json({ error: "No runId received." }, { status: 500 });
    }

    let runStatus;

    // Poll for completion
    while (true) {
      const result = await getRuns(runId);
      runStatus = result?.data;
      console.log("👀 runStatus:", JSON.stringify(runStatus, null, 2));

      if (runStatus?.[0]?.status === "Completed") break;

      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 sec
    }

    const output = runStatus?.[0]?.output;

    if (!output) {
      console.error("❌ No output returned by agent:", runStatus?.[0]);
      return NextResponse.json({ error: "No output from agent" }, { status: 500 });
    }

    return NextResponse.json(output); // ✅ return entire roadmap object

  } catch (err) {
    console.error("🔥 [ai-roadmap-agent] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function getRuns(runId: string) {
  const result = await axios.get(
    `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
    {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    }
  );
  return result.data;
}
