import * as React from "react";
import { NavMain } from "@/components/NavMain";
import { UserMenu } from "@/components/UserMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/clerk-react";
import {
  MdDashboard,
  MdCategory,
  MdShoppingCart,
  MdListAlt,
  MdPeople,
} from "react-icons/md";

export function AdminSidebar({ ...props }) {
  const { user } = useUser();

  const data = {
    user: {
      name: user?.fullName || "Guest User",
      email: user?.primaryEmailAddress?.emailAddress || "No Email",
      avatar: user?.imageUrl || "",
    },

    navMain: [
      {
        title: "Dashboard",
        url: "/",
        isActive: true,
        icon: MdDashboard ,
      },
      {
        title: "Categories",
        url: "/categories",
        icon: MdCategory,
      },
      {
        title: "Products",
        url: "/products",
        icon: MdShoppingCart,
      },
      {
        title: "Orders",
        url: "/orders",
        icon: MdListAlt,
      },
      {
        title: "Users",
        url: "/users",
        icon: MdPeople,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 w-full">
          <button className="flex items-center gap-2 px-2 py-1 rounded-md transition">
            <img
              src="/logo.svg"
              alt="Shopcart CMS Logo"
              className="size-8 rounded-lg bg-sidebar-primary"
            />
            <div className="flex flex-col text-left">
              <span className="truncate text-sm font-semibold">
                Shopcart Admin
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Manage your store
              </span>
            </div>
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
