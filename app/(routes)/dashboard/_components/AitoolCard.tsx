"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ResumeUploadDialog from "./ResumeUploadDialog";
import RoadMapGeneratorDialog from "./RoadMapGeneratorDialog";

interface Tool {
  name: string;
  desc: string;
  icon: string;
  button: string;
  path: string;
}
type AitoolCardProps = {
  tool: Tool;
};
function AitoolCard({ tool }: AitoolCardProps) {
  const id = uuidv4();
  const { user } = useUser();
  const router = useRouter();
  const [openResumeUploadDialog, setOpenResumeUploadDialog] =useState(false)
  const [openRoadMapDialog, setOpenRoadMapDialog] =useState(false)
  const onClickButton = async () => {
    if(tool.name==="AI Resume Analyzer"){
      setOpenResumeUploadDialog(true);
       return;
      
    }
    if(tool.name==="Career RoadMap Generator"){
      setOpenRoadMapDialog(true);
      return
    }
    const result = await axios.post("/api/history", {
      recordId: id,
      content: [],
      aiAgentType:tool.path
    });
    console.log("History saved on Database", result);
    router.push(tool.path + "/" + id);
  };

  return (
    <div className="p-5 bg-white rounded-lg border shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image src={tool.icon} width={40} height={40} alt={tool.name}></Image>
      <h2 className="font-bold mt-2">{tool.name}</h2>
      <p className="text-gray-400">{tool.desc}</p>
      <Button className="w-full mt-3" onClick={onClickButton}>
  {tool.button}
</Button>
      <ResumeUploadDialog openResumeUploadDialog={openResumeUploadDialog}setOpenResumeUploadDialog={setOpenResumeUploadDialog} />
      <RoadMapGeneratorDialog openDialog={openRoadMapDialog} setOpenDialog={setOpenRoadMapDialog}/>
    </div>
  );
}

export default AitoolCard;
