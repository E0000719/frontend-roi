import { FileText, Users, TrendingUp, Target } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

const modules = [
  {
    title: "New ROI Business Case",
    icon: FileText,
    to: "/roi-business-case",
    iconColor: "text-primary",
  },
  {
    title: "On Track Agents",
    icon: Users,
    to: "/on-track-agents",
    iconColor: "text-accent",
  },
  {
    title: "Continuous Process Improvement",
    icon: TrendingUp,
    to: "/process-improvement",
    iconColor: "text-primary",
  },
  {
    title: "360 Company AI Adoption",
    icon: Target,
    to: "/ai-adoption",
    iconColor: "text-accent",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          ROI First Core
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Select a module to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {modules.map((module) => (
          <DashboardCard
            key={module.title}
            title={module.title}
            icon={module.icon}
            to={module.to}
            iconColor={module.iconColor}
          />
        ))}
      </div>
    </div>
  );
}
