import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RoiBusinessCase from "./pages/RoiBusinessCase";
import SystemOverview from "./pages/SystemOverview";
import AgentSelection from "./pages/AgentSelection";
import ChatInterface from "./pages/ChatInterface";
import OnTrackAgents from "./pages/OnTrackAgents";
import ProcessImprovement from "./pages/ProcessImprovement";
import AiAdoption from "./pages/AiAdoption";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/layout/Layout";
import modules from "./modules";
import navigation from "./navigation";

const router = createBrowserRouter([
  {
    element: <MainLayout modules={modules} navigation={navigation} />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/roi-business-case", element: <RoiBusinessCase /> },
      { path: "/roi-business-case/:system/overview", element: <SystemOverview /> },
      { path: "/roi-business-case/:system/select-agent", element: <AgentSelection /> },
      { path: "/roi-business-case/:system/chat", element: <ChatInterface /> },
      { path: "/on-track-agents", element: <OnTrackAgents /> },
      { path: "/process-improvement", element: <ProcessImprovement /> },
      { path: "/ai-adoption", element: <AiAdoption /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
