import { MainLayout } from "./components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoiBusinessCase from "./pages/RoiBusinessCase";
import SystemOverview from "./pages/SystemOverview";
import AgentSelection from "./pages/AgentSelection";
import ChatInterface from "./pages/ChatInterface";
import OnTrackAgents from "./pages/OnTrackAgents";
import ProcessImprovement from "./pages/ProcessImprovement";
import AiAdoption from "./pages/AiAdoption";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
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
