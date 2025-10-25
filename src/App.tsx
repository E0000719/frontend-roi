import { MainLayout } from "./components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import RoiBusinessCase from "./pages/RoiBusinessCase";
import SystemOverview from "./pages/SystemOverview";
import AgentSelection from "./pages/AgentSelection";
import ChatInterface from "./pages/ChatInterface";
import OnTrackAgents from "./pages/OnTrackAgents";
import ProcessImprovement from "./pages/ProcessImprovement";
import AiAdoption from "./pages/AiAdoption";
import NotFound from "./pages/NotFound";
import RealTimeInsightsIcon from "./components/icons/RealTimeInsightsIcon";
import LegacySystemsTakeoverIcon from "./components/icons/LegacySystemsTakeoverIcon";
import AgenticRecruitingHiringIcon from "./components/icons/AgenticRecruitingHiringIcon";
import OrderToCash from "./components/icons/OrderToCash";
import LegalCompliance from "./components/icons/LegalCompliance";
import AgenticCustomerITSupport from "./components/icons/AgenticCustomerITSupport";
import PhysicalAgentServiceRobotsIcon from "./components/icons/PhysicalAgentServiceRobotsIcon";
import { Bot, FileText, HomeIcon, Target, TrendingUp } from "lucide-react";

const queryClient = new QueryClient();

const modules: Array<{
  name: string;
  href: string;
  icon?: any;
  iconSrc?: string;
  iconColor?: string;
  active?: boolean;
}> = [
  { name: "ROI First", href: "", icon: PhysicalAgentServiceRobotsIcon, iconColor: "text-green-400" },
  { name: "Agentic Customer & IT Support", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:8080/", icon: AgenticCustomerITSupport, iconColor: "text-warning-300" },
  { name: "Legal & Compliance", href: "", icon: LegalCompliance, iconColor: "text-green-300" },
  { name: "Order to Cash", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:9098", icon: OrderToCash, iconColor: "text-pink-400" },
  { name: "Agentic Recruiting & Hiring", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:8083/", icon: AgenticRecruitingHiringIcon, iconColor: "text-blue-500" },
  { name: "Legacy Systems Takeover", href: "", icon: LegacySystemsTakeoverIcon, iconColor: "text-pink-400" },
  { name: "Real-Time Insights", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:9092/", icon: RealTimeInsightsIcon, iconColor: "text-green-400" },
];

const navigation: Array<{ 
  name: string; 
  href: string; 
  icon: any; 
  children?: Array<{ name: string; href: string }> 
}> = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "ROI Business case", href: "/roi-business-case", icon: FileText },
  { name: "On track agents", href: "/on-track-agents", icon: Bot },
  { name: "Continuous process improvement", href: "/process-improvement", icon: TrendingUp },
  { name: "360 Company AI adoption", href: "/ai-adoption", icon: Target },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout modules={modules} navigation={navigation} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/roi-business-case" element={<RoiBusinessCase />} />
            <Route path="/roi-business-case/:system/overview" element={<SystemOverview />} />
            <Route path="/roi-business-case/:system/select-agent" element={<AgentSelection />} />
            <Route path="/roi-business-case/:system/chat" element={<ChatInterface />} />
            <Route path="/on-track-agents" element={<OnTrackAgents />} />
            <Route path="/process-improvement" element={<ProcessImprovement />} />
            <Route path="/ai-adoption" element={<AiAdoption />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
