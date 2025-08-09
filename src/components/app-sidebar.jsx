import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/clerk-react";

export function AppSidebar({ ...props }) {
  const { user } = useUser();


  const data = {
    user: {
      name: user?.fullName || "Guest User",
      email: user?.primaryEmailAddress?.emailAddress || "No Email",
      avatar: user?.imageUrl || "",
    },
    teams: [
      {
        name: "Shopcart Admin",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        isActive: true,
        items: [],
      },
      {
        title: "Categories",
        url: "/categories",
        items: [
          {
            title: "Add Category",
            url: "/add-category",
          },
        ],
      },
      {
        title: "Products",
        url: "/products",
        items: [
          {
            title: "Add Products",
            url: "/add-products",
          },
        ],
      },
      {
        title: "Orders",
        url: "/orders",
        items: [],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
