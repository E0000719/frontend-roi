import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Home from "./pages/Home";
import RoiBusinessCase from "./pages/RoiBusinessCase";
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
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/roi-business-case" element={<RoiBusinessCase />} />
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
