import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { roadmapId, userInput } = await req.json();
    const user = await currentUser();

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
      return NextResponse.json({ error: "No runId received." }, { status: 500 });
    }

    let runStatus;
    while (true) {
      const result = await getRuns(runId);
      runStatus = result?.data;
      console.log("👀 runStatus:", JSON.stringify(runStatus, null, 2));
      if (runStatus?.[0]?.status === "Completed") break;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const output = runStatus?.[0]?.output;
    if (!output) {
      return NextResponse.json({ error: "No output from agent" }, { status: 500 });
    }

    return NextResponse.json(output);

  } catch (err) {
    console.error("🔥 [ai-roadmap-agent] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 🔧 FIXED: removed export
async function getRuns(runId: string) {
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
