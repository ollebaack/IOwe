import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar";
import {
  Users,
  Wallet,
  User,
  Settings,
  HelpCircle,
  PlusCircle,
  ChevronRight,
  Home,
} from "lucide-react";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Groups",
    href: "/groups",
    icon: Users,
  },
  {
    title: "Balances",
    href: "/balances",
    icon: Wallet,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
  {
    title: "New Group",
    href: "/groups/new",
    icon: PlusCircle,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-muted/60">
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-sm font-medium text-foreground/80 hover:text-foreground"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      <span>{item.title}</span>
                      {item.title === "Home" && (
                        <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
