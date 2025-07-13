import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req:any){
    const {content ,recordId,aiAgentType} = await req.json();
    const user=await currentUser()
    try {
        const result=await db.insert(HistoryTable).values({
            recordId: recordId,
            content: content,
            userEmail:user?.primaryEmailAddress?.emailAddress || "",
            createdAt: new Date().toISOString(),
            aiAgentType:aiAgentType
        })
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error saving history:", error);
        return NextResponse.json(error, { status: 500 });
        
    }
}
export async function PUT(req:any){
    const {content ,recordId} = await req.json();
     try {
        const result=await db.update(HistoryTable).set({
            
            content: content,
        }).where(eq(HistoryTable.recordId, recordId))
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error in Updating data:", error);
        return NextResponse.json(error, { status: 500 });
        
    }
}
export async function GET(req:any){
    const {searchParams} = new URL(req.url);
    const recordId = searchParams.get("recordId");
    const user=await currentUser()
    try {
        if(recordId){
            const result=await db.select().from(HistoryTable).where(eq(HistoryTable.recordId, recordId));
        return NextResponse.json(result[0], { status: 200 });
        }
        else{
            const userEmail = user?.primaryEmailAddress?.emailAddress;
            if (!userEmail) {
                return NextResponse.json({ error: "User email not found" }, { status: 400 });
            }
            const result=await db.select().from(HistoryTable).where(eq(HistoryTable.userEmail, userEmail)).orderBy(desc(HistoryTable.id));
            return NextResponse.json(result, { status: 200 });
        }
    } catch (error) {
        console.error("Error in fetching data:", error);
        return NextResponse.json(error, { status: 500 });
        
    }
}