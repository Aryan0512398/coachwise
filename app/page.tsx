"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, MessageSquareText, FileText, Route } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import FeatureCard from "./_components/FeatureCard";

export default function Home() {
  const images = [
    "./preview1.png",
    "./preview2.png",
    "./preview3.png",
    "./preview4.png",
  ];

  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      });
    }
  }, [isHovered, controls]);

  const handleClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number): any => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-24 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-4">
          Your AI Career Assistant — <span className="text-[#BA55D3]">CoachWise</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
          Analyze resumes, generate cover letters, get AI-guided career roadmaps, and chat for job guidance — all in one smart tool.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={user ? "/dashboard" : "/sign-in"}>
            <Button className="bg-[#BA55D3] hover:bg-[#9b00c5] text-white px-6 py-2 rounded-xl">
              Try Our Tools
            </Button>
          </Link>
          <Link href={user ? "/dashboard" : "/sign-in"}>
            <Button
              variant="outline"
              className="text-[#BA55D3] border-[#BA55D3] hover:bg-[#f3e8ff] px-6 py-2 rounded-xl"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
          Why Choose <span className="text-[#BA55D3]">CoachWise</span>?
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Brain,
              title: "Resume Analyzer",
              description:
                "Upload your resume and get instant AI feedback, keyword suggestions, and role-based recommendations.",
            },
            {
              icon: Route,
              title: "Career Roadmap",
              description:
                "Let CoachWise create a personalized step-by-step career path tailored to your goals and experience.",
            },
            {
              icon: MessageSquareText,
              title: "AI Career Q&A",
              description:
                "Ask job-related questions to your smart AI coach — from interview prep to job switches, it's got your back.",
            },
            {
              icon: FileText,
              title: "CoverLetter Generator",
              description:
                "Generate tailored cover letters based on the job role and your resume with just one click.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="users" className="bg-[#f9f5ff] py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
          Used & Trusted by Job Seekers 💜
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Anjali Sinha",
              quote:
                "CoachWise showed me the mistakes in my resume and helped me land two interviews in a week!",
            },
            {
              name: "Rohan Malhotra",
              quote:
                "The roadmap was so tailored — it knew I was switching careers and gave me exact certifications to do.",
            },
            {
              name: "Zoya Khan",
              quote:
                "Loved the AI Q&A chat! It answered my internship doubts better than any senior I asked.",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-700 italic mb-4">“{review.quote}”</p>
              <p className="font-semibold text-[#BA55D3] text-right">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshot Carousel */}
      <section className="bg-white py-20 px-4 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
          See CoachWise in Action 🚀
        </h2>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div className="flex gap-6" animate={controls}>
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                onClick={() => handleClick(src)}
                className="w-[300px] aspect-video rounded-xl overflow-hidden border shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out shrink-0 group cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full Preview"
                className="w-full h-auto object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f9f5ff] py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
          Frequently Asked Questions ❓
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#BA55D3]">
              How does the resume analyzer work?
            </h3>
            <p className="text-gray-700 mt-2">
              Upload your resume and our AI will scan it for key improvements, recruiter friendliness, and ATS compatibility.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#BA55D3]">
              Can I use CoachWise for free?
            </h3>
            <p className="text-gray-700 mt-2">
              Yes! Start with free tools. Unlock more features with our premium upgrade.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#BA55D3]">
              Do I need to install anything?
            </h3>
            <p className="text-gray-700 mt-2">
              Nope! CoachWise works fully online — mobile and desktop supported.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#ede9fe] to-[#f3e8ff] py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4b0082]">
          Ready to land your dream role?
        </h2>
        <p className="text-lg text-[#5a189a] mb-6">
          CoachWise gives you the edge. Start improving your career today — no resume left behind!
        </p>
        <Link href={user ? "/dashboard" : "/sign-in"}>
          <Button className="bg-[#BA55D3] hover:bg-[#9b00c5] text-white rounded-xl text-lg px-8 py-3 transition">
            Get Started for Free
          </Button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
