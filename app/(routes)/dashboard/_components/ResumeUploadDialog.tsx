import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { File, Loader2Icon, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";


function ResumeUploadDialog({
  openResumeUploadDialog,
  setOpenResumeUploadDialog,
}: any) {
  const [file,setFile]=useState<any>()
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  const { has } = useAuth()
  const onFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file.name);
      setFile(file)
    }
  };
 const onUploadAndAnalyse = async () => {
  setLoading(true);
  const recordId = uuidv4();
  const formData = new FormData();
  formData.append("recordId", recordId);
  formData.append("resumeFile", file);
  //@ts-ignore
  const hasSubscriptionEnabled=await has({plan:'free_user'})
  if(hasSubscriptionEnabled ){
    toast("Upgrade your Plan to Pro or Premium");
    router.push("/billing")

    return null

  }
    console.log("Try Started")

  try {
    const result = await axios.post("/api/ai-resume-agent", formData);
    console.log(result.data);
  } catch (err: any) {
    console.error("❌ Upload failed:", err);
    alert(err?.response?.data?.message || "Server error. Please try again.");
  } finally {
    setLoading(false);
    router.push('/ai-tools/ai-resume-analyzer/'+recordId)
    setOpenResumeUploadDialog(false)
  }
};


  return (
    <Dialog
      open={openResumeUploadDialog}
      onOpenChange={setOpenResumeUploadDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            Upload your resume as a PDF file. We'll analyze it with AI.
          </DialogDescription>
        </DialogHeader>

        {/* Move interactive content OUTSIDE DialogDescription */}
        <div>
          <label
            htmlFor="resume"
            className="flex items-center flex-col justify-center p-7 border border-dashed rounded cursor-pointer hover:bg-slate-100"
          >
            <File className="w-10 h-10" />
            {file ? 
            <span className="mt-3 text-blue-700">{file?.name}</span>
            : <span className="mt-3 font-medium">
              Click here to upload PDF file
            </span>
            }
           
          </label>
          <input
            id="resume"
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        <DialogFooter className="!justify-center flex gap-4 mt-0">
          <Button disabled={!file || loading} onClick={onUploadAndAnalyse}>
            {loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin"/> :<Sparkle className="mr-2 h-4 w-4" />}
            Upload & Analyse
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpenResumeUploadDialog(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeUploadDialog;
