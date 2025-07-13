"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = (form[0] as HTMLInputElement).value;
    const email = (form[1] as HTMLInputElement).value;
    const message = (form[2] as HTMLTextAreaElement).value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");
      toast.success("✅ Message sent!");
      setDialogOpen(false);
    } catch {
      toast.error("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo + Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo2.svg"
            alt="CoachWise Logo"
            width={140}
            height={160}
            className="rounded-full"
          />
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[17px] font-medium text-gray-800">
          <Link href="/" className="hover:text-[#BA55D3]">
            Home
          </Link>
          <Link href="#features" className="hover:text-[#BA55D3]">
            Features
          </Link>
          <Link href="#users" className="hover:text-[#BA55D3]">
            Users
          </Link>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-[#BA55D3] hover:bg-[#9b00c5] text-white rounded-lg px-5 py-2"
          >
            Contact Us
          </Button>
        </nav>

        {/* Right: Auth/CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button className="bg-[#BA55D3] hover:bg-[#9b00c5] text-white rounded-full px-5 py-2">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-[#BA55D3] hover:bg-[#9b00c5] text-white rounded-full px-5 py-2">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Contact Us Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1e1e1e]">
              Send us a message
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea placeholder="Your Message..." rows={4} required />
            <Button
              type="submit"
              className="w-full bg-[#BA55D3] hover:bg-[#9b00c5] text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
