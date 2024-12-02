"use client"

import {
  CalendarCheck,
  LifeBuoy,
  MonitorCog,
  Send
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"

const data = {
  navMain: [
    {
      title: "Attendence",
      url: "#",
      icon: CalendarCheck,
      isActive: true,
      items: [
        {
          title: "Mark Attendence",
          url: "attendance",
        },
        {
          title: "Export/Share",
          url: "export",
        },
      ],
    },
    {
      title: "System Management",
      url: "system-management",
      icon: MonitorCog,
      items: [
        {
          title: "Courses",
          url: "cources",
        },
        {
          title: "Students",
          url: "students",
        },
      ],
    },

  ],
  navSecondary: [
    {
      title: "Support",
      url: "suppport",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "feedback",
      icon: Send,
    },
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> ) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <img className="size-8" src="logo.png" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-md font-semibold">Mark Me</span>
                  <span className="truncate text-xs">Let's mark everyone</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  )
}
