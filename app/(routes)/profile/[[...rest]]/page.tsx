"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function Profile() {
  const scrollToProfile = () => {
    const section = document.getElementById("UserProfileSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="my-8 text-center px-4">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-violet-700 tracking-wide mb-2">
        Manage Your Profile
      </h2>
      <p className="text-lg text-gray-600">
        Update your account, preferences, and personal settings here.
      </p>

      {/* User Profile Component */}
      <div id="UserProfileSection" className="mt-10">
        <UserProfile />
      </div>

      {/* Divider */}
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="w-full border-t border-gray-300" />
      </div>

      {/* Scroll to Profile Button */}
      <Button
        onClick={scrollToProfile}
        className="cursor-pointer mt-6 px-6 py-2 bg-violet-700 text-white rounded-xl hover:bg-violet-800 transition"
      >
        Go to Profile Settings
      </Button>

      {/* Footer Note */}
      <p className="mt-10 text-sm text-gray-400 italic">
        Your data is secure and privacy-protected.
      </p>
    </div>
  );
}

export default Profile;
