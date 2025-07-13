"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const tool = {
  name: "AI Career Q&A Chat",
  desc: "Chat with AI Agent",
  icon: "/chatbot.png",
  button: "Let's Chat",
  path: "/ai-tools/ai-chat",
};
function WelcomeBanner() {
  const id = uuidv4();
  const router=useRouter()
  const onClickButton = async () => {
    const result = await axios.post("/api/history", {
      recordId: id,
      content: [],
      aiAgentType: tool.path,
    });
    console.log("History saved on Database", result);
    router.push(tool.path + "/" + id);
  };
  return (
    <div className="p-5 bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] text-white rounded-lg shadow-lg">
      <h2 className="font-bold text-2xl">AI Career Coach Agent</h2>
      <p>Your personal AI coach for career development.</p>

      <Button onClick={onClickButton} variant={"outline"} className="text-black mt-5">
        Let's Get Started
      </Button>
    </div>
  );
}

export default WelcomeBanner;
