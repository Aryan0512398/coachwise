"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const aiTools = [
  {
    name: "AI Career Q&A Chat",
    desc: "Chat with AI Agent",
    icon: "/chatbot.png",
    button: "Let's Chat",
    path: "/ai-tools/ai-chat",
  },
  {
    name: "AI Resume Analyzer",
    desc: "Improve your resume with AI",
    icon: "/resume.png",
    button: "Analyze Now",
    path: "/ai-tools/ai-resume-analyzer",
  },
  {
    name: "Career RoadMap Generator",
    desc: "Generate a  career roadmap",
    icon: "/roadmap.png",
    button: "Generate Now",
    path: "/ai-tools/ai-roadmap-agent",
  },
  {
    name: "Cover Letter Generator",
    desc: "Write a  cover letter",
    icon: "/cover.png",
    button: "Create Now",
    path: "/cover-letter-generator",
  },
];
function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const GetHistroy = async () => {
    setLoading(true);
    const result = await axios.get("/api/history");
    console.log("User History is ", result.data);
    setUserHistory(result.data);
    setLoading(false);
  };
  const GetAgentName = (path: string) => {
    const agent = aiTools.find((item) => item.path === path);
    return agent;
  };
  const handleScroll = () => {
    const target = document.getElementById("ai");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    GetHistroy();
  }, []);
  return (
    <div className="mt-5 p-5 bg-white rounded-lg border shadow-lg">
      <h2 className="font-bold text-lg">My History</h2>
      <p>Here you can find your past interactions and activities.</p>
      {loading && (
        <div>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index}>
              <Skeleton className="h-[20px] w-full mt-4 rounded-md" />
            </div>
          ))}
        </div>
      )}
      {userHistory.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center mt-5">
          <Image src={"/bulb.png"} alt="bulb" width={50} height={50} />
          <h2>You don't have any history yet.</h2>
          <Button onClick={handleScroll} className="mt-5">
            Explore AI Tools
          </Button>
        </div>
      ) : (
        <div className="mt-2 sm:text-sm md:text-xl ">
          {userHistory?.map((history: any, index: number) => (
            <Link
              href={history?.aiAgentType + "/" + history?.recordId}
              key={index}
              className="flex justify-between my-3 border p-3 rounded-lg"
            >
              <div className="flex gap-5">
                <Image
                  src={
                    GetAgentName(history?.aiAgentType)?.icon ?? "/letter.png"
                  }
                  width={20}
                  height={20}
                  alt="Icon"
                ></Image>
                <h2>
                  {GetAgentName(history?.aiAgentType)?.name ??
                    "Cover Letter Generator"}
                </h2>
              </div>
              <h2>
                {new Date(history?.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h2>{" "}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
