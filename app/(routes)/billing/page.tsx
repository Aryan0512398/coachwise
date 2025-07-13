"use client";

import { PricingTable } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";

function Billing() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("PricingSection");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="my-8 text-center px-4">
      {/* Heading */}
      <h2 className="font-bold text-3xl md:text-4xl text-violet-700 mb-2">
        Choose Your Plan
      </h2>
      <p className="text-lg text-gray-600">
        Select a subscription plan that fits your needs.
      </p>

      {/* Pricing Table Section */}
      <div id="PricingSection" className="mt-10">
        <PricingTable />
      </div>

      {/* Feature Highlights  */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
        <div className="p-4 bg-white shadow-sm rounded-xl border">
          <h3 className="text-violet-700 font-semibold text-lg">🚀 Unlimited AI Access</h3>
          <p className="text-sm text-gray-600 mt-1">
            Use resume, roadmap, chatbot, and cover letter tools with no limits.
          </p>
        </div>
        <div className="p-4 bg-white shadow-sm rounded-xl border">
          <h3 className="text-violet-700 font-semibold text-lg">📊 Progress Tracking</h3>
          <p className="text-sm text-gray-600 mt-1">
            Save chat history and track your AI-driven improvements over time.
          </p>
        </div>
        <div className="p-4 bg-white shadow-sm rounded-xl border">
          <h3 className="text-violet-700 font-semibold text-lg">💬 Priority Support</h3>
          <p className="text-sm text-gray-600 mt-1">
            Get help from our team instantly when you upgrade.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="w-full border-t border-gray-300" />
      </div>

      {/* Scroll to Pricing Button */}
      <Button
        onClick={scrollToPricing}
        className="cursor-pointer mt-6 px-6 py-2 bg-violet-700 text-white rounded-xl hover:bg-violet-800 transition"
      >
        View Subscription Plans
      </Button>

      {/* Footer Note */}
      <p className="mt-10 text-sm text-gray-400 italic -mb-8">
        Cancel anytime. Your journey, your control.
      </p>
    </div>
  );
}

export default Billing;
