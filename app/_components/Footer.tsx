import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import ContactDialog from "./ContactDialog";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left side */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Let’s connect</h3>
          <p className="text-gray-600 mb-4">Got questions or feedback? We’d love to hear from you.</p>
          <ContactDialog />
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-3 items-center md:items-end">
          <div className="flex gap-4">
            <Link
              href="https://github.com/Aryan0512398"
              target="_blank"
              className="text-gray-600 hover:text-[#9b2ddb] transition"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/aryan-gupta-b1407a2b5/"
              target="_blank"
              className="text-gray-600 hover:text-[#9b2ddb] transition"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 <span className="font-medium text-[#9b2ddb]">CoachWise</span>. Built by Aryan Gupta.
          </p>
        </div>
      </div>
    </footer>
  );
}
