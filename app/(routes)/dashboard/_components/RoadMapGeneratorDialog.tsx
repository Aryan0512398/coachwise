import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";


function RoadMapGeneratorDialog({openDialog,setOpenDialog}:any) {
  const [userInput , setUserInput]=useState<string>()
  const [loading ,setLoading]=useState(false)
  const router=useRouter()
   const { has } = useAuth()
  const GenerateRoadMap=async()=>{
    const roadmapId=uuidv4();
    setLoading(true)
    //@ts-ignore
  const hasSubscriptionEnabledPro=await has({plan:'premium'})
  console.log("PLan Started",hasSubscriptionEnabledPro)
  if(!hasSubscriptionEnabledPro ){
    toast("Upgrade your Plan to Premium");
    router.push("/billing")

    return null

  }
    console.log("Try Started")
    try {
      const result=await axios.post('/api/ai-roadmap-agent',{
        roadmapId ,userInput:userInput
      })
      setLoading(false)
      console.log("Roadmap Data is", result.data)
      router.push('/ai-tools/ai-roadmap-agent/'+roadmapId)
    } catch (error) {
      setLoading(false)
      console.log("Error in generating roadmap",error)
    }
  }
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
            <DialogDescription asChild>
             <div className="mt-2">
               <Input type="text" placeholder="e.g Frontend Developer" onChange={(event)=>setUserInput(event?.target.value)}
               ></Input>
             </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="!justify-center flex gap-4 mt-0">
            <Button onClick={GenerateRoadMap} disabled={loading || !userInput}>{loading ? <Loader2Icon className="animate-spin"/> : <SparklesIcon/>}Generate</Button>
            <Button variant={"outline"}  onClick={() => setOpenDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RoadMapGeneratorDialog;
