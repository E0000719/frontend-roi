import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, FileText, Bot, TrendingUp, Target } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { title: "Home", icon: Home, path: "/" },
    { title: "ROI Business Case", icon: FileText, path: "/roi-business-case" },
    { title: "On Track Agents", icon: Bot, path: "/on-track-agents" },
    { title: "Process Improvement", icon: TrendingUp, path: "/process-improvement" },
    { title: "AI Adoption", icon: Target, path: "/ai-adoption" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">ROI Roomie</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                onClick={() => navigate(item.path)}
                isActive={location.pathname === item.path}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
