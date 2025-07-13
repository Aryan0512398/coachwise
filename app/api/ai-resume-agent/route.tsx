import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile");
    const recordId = formData.get("recordId");

    if (!resumeFile || !(resumeFile instanceof File)) {
      return NextResponse.json({ message: "Invalid or missing resume file" }, { status: 400 });
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    const loader = new WebPDFLoader(blob);
    const docs = await loader.load();
    const pdfText = docs[0]?.pageContent;

    const user = await currentUser();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId,
        base64ResumeFile: base64,
        pdfText,
        aiAgentType: "/ai-tools/ai-resume-analyzer",
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });

    const runId = resultIds?.ids?.[0];
    if (!runId) {
      return NextResponse.json({ message: "Failed to trigger AI agent" }, { status: 500 });
    }

    let runStatus;
    while (true) {
      runStatus = await getRuns(runId);
      if (runStatus?.data?.[0]?.status === "Completed") break;
      await new Promise((res) => setTimeout(res, 1000));
    }

    const rawOutput = runStatus.data?.[0]?.output?.output?.[0];
    console.log("✅ Final AI Output:", rawOutput);

    if (!rawOutput) {
      return NextResponse.json({
        message: "AI analysis completed but returned no output.",
      });
    }

    const safeOutput = JSON.parse(JSON.stringify(rawOutput));
    return NextResponse.json(safeOutput);

  } catch (err: any) {
    console.error("❌ Server error in /api/ai-resume-agent:", err);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: err.message || "Unknown error",
      },
      { status: 500 }
    );
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
