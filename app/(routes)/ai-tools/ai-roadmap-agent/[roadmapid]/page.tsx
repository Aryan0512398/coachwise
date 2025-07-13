"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RoadMapFlowChart from "./_components/RoadMapFlowChart";
import RoadMapGeneratorDialog from "@/app/(routes)/dashboard/_components/RoadMapGeneratorDialog";
import { LoaderPinwheelIcon } from "lucide-react";

function layoutNodesManually(nodes: any[], edges: any[]) {
  const levels: Record<number, any[]> = {};
  const levelMap: Record<string, number> = {};

  function assignLevels(nodeId: string, level: number) {
    if (levelMap[nodeId] !== undefined && levelMap[nodeId] <= level) return;
    levelMap[nodeId] = level;
    edges
      .filter((e) => e.source === nodeId)
      .forEach((e) => assignLevels(e.target, level + 1));
  }

  const rootNodes = nodes.filter(
    (n) => !edges.find((e) => e.target === n.id)
  );
  rootNodes.forEach((n) => assignLevels(n.id, 0));

  nodes.forEach((node) => {
    const lvl = levelMap[node.id] || 0;
    if (!levels[lvl]) levels[lvl] = [];
    levels[lvl].push(node);
  });

  const nodeWidth = 280;
  const nodeHeight = 180;
  const gapX = 80;
  const gapY = 80;

  let layoutedNodes: any[] = [];

  Object.keys(levels).forEach((level) => {
    const y = parseInt(level) * (nodeHeight + gapY);
    const nodesAtLevel = levels[+level];
    const totalWidth =
      nodesAtLevel.length * nodeWidth + (nodesAtLevel.length - 1) * gapX;
    const startX = -totalWidth / 2;

    nodesAtLevel.forEach((node, idx) => {
      node.position = {
        x: startX + idx * (nodeWidth + gapX),
        y,
      };
      node.sourcePosition = "bottom";
      node.targetPosition = "top";
      layoutedNodes.push(node);
    });
  });

  return layoutedNodes;
}

function RoadmapGeneratorAgent() {
  const { roadmapid } = useParams();
  const [roadMapDetail, setRoadMapDetail] = useState<any>();
    const [openRoadMapDialog, setOpenRoadMapDialog] =useState(false)
  

  useEffect(() => {
    const GetRoadMapDetails = async () => {
      const res = await axios.get(`/api/history?recordId=${roadmapid}`);
      const content = res.data?.content;

      if (content?.initialNodes && content?.initialEdges) {
        const layoutedNodes = layoutNodesManually(
          content.initialNodes,
          content.initialEdges
        );
        setRoadMapDetail({
          ...content,
          initialNodes: layoutedNodes,
        });
      }
    };

    roadmapid && GetRoadMapDetails();
  }, [roadmapid]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="border rounded-xl p-5">
        <h2 className="font-bold text-2xl">{roadMapDetail?.roadmapTitle}</h2>
        <p className="text-gray-400 mt-3">
          <strong className="text-black">Description :</strong> <br />
          {roadMapDetail?.description}
        </p>
        <h2 className="mt-5 font-medium text-blue-700">
          Duration: {roadMapDetail?.duration}
        </h2>
        <Button onClick={()=>setOpenRoadMapDialog(true)} className="mt-3 w-full">+ Create Another RoadMap</Button>
      </div>

      <div className="md:col-span-1 w-full h-[80vh]">
        {roadMapDetail?.initialNodes && roadMapDetail?.initialEdges ? (
          <RoadMapFlowChart
            initialNodes={roadMapDetail.initialNodes}
            initialEdges={roadMapDetail.initialEdges}
          />
        ) : (
          <div className="h-full flex items-center gap-2 justify-center text-gray-400">
            <LoaderPinwheelIcon className="animate-spin"></LoaderPinwheelIcon>Loading roadmap...
          </div>
        )}
      </div>
      <RoadMapGeneratorDialog openDialog={openRoadMapDialog} setOpenDialog={setOpenRoadMapDialog}/>
    </div>
  );
}

export default RoadmapGeneratorAgent;
