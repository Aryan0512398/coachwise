"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import EmptyState from "../../_components/EmptyState";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type messages = {
  content: string;
  role: string;
  type: string;
};
function AIChat() {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<messages[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {chatId} = useParams();
  const router = useRouter();
  const id = uuidv4();
  console.log("Chat ID:", chatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GetMessagesList=async () => {
    const result = await axios.get("/api/history?recordId=" + chatId)
     console.log("Get Messages List:", result.data);
     setMessageList(result.data.content);
    };
  const onSend = async () => {
    setLoading(true);
    setMessageList((prev) => [
      ...prev,
      { content: userInput ?? "", role: "user", type: "text" },
    ]);
    setUserInput("");
    const result = await axios.post("/api/ai-career-chat-agent", {
      userInput,
    });
    setLoading(false);

    console.log("Chat Result:", result.data);
    setMessageList((prev) => [...prev, result.data]);
  };
  const updateMessageList=async()=>{
    const result = await axios.put("/api/history", {
      content: messageList,
      recordId: chatId,
    });
    console.log("Message List Updated and saved to DB", result.data);
  }
  console.log("Message List:", messageList);
   const onNewChatClick = async () => {
    const result = await axios.post("/api/history", {
      recordId: id,
      content: [],
    });
    console.log("History saved on Database", result);
    router.replace( "/ai-tools/ai-chat/" + id);
  };

  useEffect(() => {
    // Save Message List to Database
    messageList.length>0 && updateMessageList()
    scrollToBottom(); 
  }, [messageList]);
  useEffect(() => {
    // Fetch Messages List from Database
    GetMessagesList();
  }, [chatId]);
  
  return (
    <div className="px-10 md:px-24 lg:px-32 h-[75vh] overflow-auto no-scrollbar">
      <div className="flex items-center gap-8 justify-between ">
        <div>
          <h2 className="font-bold text-lg">AI Career Q/A Chat</h2>
          <p>AI-powered career tips and a custom roadmap — instantly.</p>
        </div>
        <Button onClick={onNewChatClick}>+ New Chat</Button>
      </div>
      <div className="flex flex-col h-[75vh]  ">
        {messageList.length === 0 && (
          <div className="mt-3">
            {/* Empty State Component */}
            <EmptyState
              selectedQuestion={(question: string) => {
                setUserInput(question);
              }}
            />
          </div>
        )}
        <div className="flex-1 mt-2 ">
          {messageList.map((message, index) => (
            <div>
              <div
                key={index}
                className={`flex items-start  gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 mb-2 rounded-lg gap-2   ${
                    message.role === "user"
                      ? "bg-gray-200  text-black rounded-lg"
                      : "bg-gray-50  text-black"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
              {loading && messageList?.length - 1 === index && (
                <div className="flex items-center justify-start gap-2 p-3 rounded-lg bg-gray-50 text-black mb-2">
                  <LoaderCircle className="animate-spin" />
                  Thinking...
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="pt-4"> </div>
        <div className="flex mt-2  items-center justify-between gap-2 absolute bottom-5 w-[50%]">
          {/* Message Input */}
          <Input
            placeholder="Type your message here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            onClick={onSend}
            disabled={!userInput || loading}
            className="flex -left-4 items-center gap-2"
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
