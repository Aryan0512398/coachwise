"use client";

import React from "react";
import AiTools from "../dashboard/_components/AiTools";
import { Button } from "@/components/ui/button";

function AIToolsAll() {
  const scrollToTools = () => {
    const toolsSection = document.getElementById("AiTools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="my-8 text-center px-4">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-violet-700 tracking-wide mb-4">
        Explore AI-Powered Career Chatbots
      </h2>

      {/* AI Tools Section */}
      <div id="AiTools">
        <AiTools />
      </div>

      {/* Description */}
      <p className="mt-8 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
        Whether you're exploring career paths, polishing your resume, or preparing for interviews — our AI tools are here to guide you every step of the way.
      </p>

      {/* Prompt Suggestions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Try asking:
        </h3>
        <ul className="text-sm text-gray-700 space-y-2 max-w-md mx-auto text-left">
          <li>🧭 "What's the best roadmap to become a data scientist?"</li>
          <li>📄 "Analyze my resume and give improvement tips."</li>
          <li>✍️ "Write a cover letter for a frontend developer job."</li>
          <li>🤖 "Suggest tech jobs that fit my skills."</li>
        </ul>
      </div>

      {/* Divider */}
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="w-full border-t border-gray-300" />
      </div>

      {/* Scroll to Tools Button */}
      <Button
        onClick={scrollToTools}
        className="cursor-pointer mt-6 px-6 py-2 bg-violet-700 text-white rounded-xl hover:bg-violet-800 transition"
      >
        Try All Tools Now
      </Button>

      {/* Footer Note */}
      <p className="mt-10 text-sm text-gray-400 italic -mb-8">
        New features and improvements are added regularly.
      </p>
    </div>
  );
}

export default AIToolsAll;
