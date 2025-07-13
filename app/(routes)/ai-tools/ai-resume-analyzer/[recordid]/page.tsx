"use client";

import ResumeUploadDialog from "@/app/(routes)/dashboard/_components/ResumeUploadDialog";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function AiResumeAnalyzer() {
  const [openResumeUpload, setOpenResumeUpload] = useState(false);
  const { recordid } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [aiReport, setAiReport] = useState<any>(null);

  const GetResumeAnalyzerRecord = async () => {
    const res = await axios.get(`/api/history?recordId=${recordid}`);
    setPdfUrl(res?.data?.metaData);
    setAiReport(res?.data?.content);
  };

  useEffect(() => {
    if (recordid) GetResumeAnalyzerRecord();
  }, [recordid]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 lg:flex-row">
        {/* LEFT SIDE - AI Analysis */}
        <div className="lg:w-1/2 w-full space-y-6">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              AI Resume Analysis
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setOpenResumeUpload(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:opacity-90 text-sm"
              >
                Reanalyze
              </button>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 text-sm">
                Go to Premium
              </button>
            </div>
          </div>

          {aiReport ? (
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
              {/* Score */}
              <div>
                <p className="text-gray-500 text-sm">Overall Score</p>
                <div className="flex items-center justify-between">
                  <h1 className="text-5xl font-bold text-indigo-700">
                    {aiReport.overall_score}
                    <span className="text-xl text-gray-400">/100</span>
                  </h1>
                  <p className="text-green-600 font-semibold text-lg">
                    {aiReport.overall_feedback}
                  </p>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  {aiReport.summary_comment}
                </p>
              </div>

              {/* Sections */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(aiReport.sections).map(
                  ([section, val]: any) => {
                    const score = val.score;
                    const color =
                      score >= 85
                        ? "bg-green-100 text-green-800"
                        : score >= 70
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800";

                    return (
                      <div key={section} className={`rounded-lg p-3 ${color}`}>
                        <div className="flex justify-between items-center">
                          <h4 className="capitalize font-medium">
                            {section.replace("_", " ")}
                          </h4>
                          <span className="font-bold">{score}%</span>
                        </div>
                        <p className="text-sm mt-1">{val.comment}</p>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-gray-700 font-semibold mb-2">
                  Tips for Improvement
                </h3>
                <ul className="tips-scroll list-disc pl-5 space-y-1 text-sm text-gray-600 max-h-40 overflow-y-scroll pr-2">
                  {aiReport.tips_for_improvement.map(
                    (tip: string, i: number) => (
                      <li key={i}>{tip}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-center mt-4 mb-2 text-gray-500">
              Loading AI Report...
            </p>
          )}
        </div>

        {/* RIGHT SIDE - Resume Preview */}
        <div className="lg:w-1/2 w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl">
            <h2 className="text-lg font-semibold">Resume Preview</h2>
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                Open in New Tab
              </a>
            )}
          </div>

          {pdfUrl ? (
            <>
              <iframe
                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                  pdfUrl
                )}`}
                className="w-full h-[90vh]"
                style={{ border: "none" }}
                loading="lazy"
                title="Resume PDF Preview"
              />

              {/* Text below iframe */}
              <div className="px-4 py-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Having trouble with formatting?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Recheck your document layout or try uploading a different version.
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-center mt-4 mb-2 text-gray-500">
              Loading PDF...
            </p>
          )}
        </div>
      </div>

      {/* Upload Dialog Component */}
      <ResumeUploadDialog
        openResumeUploadDialog={openResumeUpload}
        setOpenResumeUploadDialog={setOpenResumeUpload}
      />
    </div>
  );
}

export default AiResumeAnalyzer;
