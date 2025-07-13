import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Inbox,
  Layers2,
  Search,
  Settings,
  UserCircle2,
  UserCircle2Icon,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    title: "Workspace",
    url: "/dashboard",
    icon: Layers2,
  },
  {
    title: "AI Tools",
    url: "/ai-tools",
    icon: Inbox,
  },
  {
    title: "My History",
    url: "/my-history",
    icon: Calendar,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: Wallet,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserCircle2Icon,
  },
];

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 mt-2 px-3 mr-2">
          <Image
            onClick={() => router.push("/")}
            src={"/logo2.svg"}
            alt="logo"
            width={100}
            height={70}
            className="w-full cursor-pointer "
          />
          <h2 className="text-sm text-gray-400 text-center mt-3">
            Your AI Mentor is Here
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              {items.map((item, index) => (
                <a
                  href={item.url}
                  key={index}
                  className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${
                                   path.includes(item.url) && "bg-gray-200ß"
                                 }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </a>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
