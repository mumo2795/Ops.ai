"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  Briefcase,
  DollarSign,
  Globe,
  LayoutDashboard,
  Megaphone,
  Settings,
  Sparkles,
  Users,
  UserRound,
} from "lucide-react";
import { OpsAiLogo } from "@/components/OpsAiBranding";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const workspaceNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/hr", label: "AI HR", icon: Users },
  { href: "/dashboard/finance", label: "AI Finance", icon: DollarSign },
  { href: "/dashboard/inventory", label: "AI Inventory", icon: Boxes },
  { href: "/dashboard/operation", label: "AI Operation", icon: Briefcase },
  { href: "/dashboard/marketing", label: "AI Marketing", icon: Megaphone },
  { href: "/dashboard/sales", label: "AI Sales", icon: BarChart3 },
] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider className="min-h-svh">
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard">
                  <OpsAiLogo size="sm" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {workspaceNav.map((item) => {
                  const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Setup guide">
                <Link href="/onboarding">
                  <Sparkles className="size-4" />
                  <span className="truncate">Setup guide</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Marketing site">
                <Link href="/" className="text-muted-foreground">
                  <Globe className="size-4 shrink-0" />
                  <span className="truncate">Marketing site</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Account" isActive={pathname === "/dashboard/account"}>
                <Link href="/dashboard/account">
                  <UserRound className="size-4" />
                  <span className="truncate">Account</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 glass border-b border-black/10 px-4 dark:border-zinc-800/90 md:rounded-t-2xl">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
