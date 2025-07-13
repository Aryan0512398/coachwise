"use client";

import React from "react";
import History from "../dashboard/_components/History";
import { Button } from "@/components/ui/button";

function MyHistory() {
  const scrollToHistory = () => {
    const historySection = document.getElementById("HistorySection");
    if (historySection) {
      historySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="my-8 text-center px-4">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-violet-700 tracking-wide mb-4">
        Your AI Memory Lane
      </h2>

      {/* History Section */}
      <div id="HistorySection">
        <History />
      </div>

      {/* Description */}
      <p className="mt-8 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
        Revisit your past AI conversations — whether it was resume reviews, cover letter help, roadmap suggestions, or personalized advice.
      </p>

      {/* Example Scenarios */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Recently Asked:
        </h3>
        <ul className="text-sm text-gray-700 space-y-2 max-w-md mx-auto text-left">
          <li>📄 "Rate this resume and suggest improvements"</li>
          <li>✍️ "Draft a cover letter for a backend internship"</li>
          <li>🧭 "Show me the roadmap to become a machine learning engineer"</li>
          <li>🤖 "What’s the best way to switch from ECE to web dev?"</li>
        </ul>
      </div>

      {/* Divider */}
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="w-full border-t border-gray-300" />
      </div>

      {/* Scroll to History Button */}
      <Button
        onClick={scrollToHistory}
        className="cursor-pointer mt-6 px-6 py-2 bg-violet-700 text-white rounded-xl hover:bg-violet-800 transition"
      >
        View Your Full History
      </Button>

      {/* Footer Note */}
      <p className="mt-10 text-sm text-gray-400 italic -mb-8">
        Conversations are saved locally — more features coming soon!
      </p>
    </div>
  );
}

export default MyHistory;
