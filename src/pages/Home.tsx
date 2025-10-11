import { FileText, Users, TrendingUp, Target } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

const modules = [
  {
    title: "Nuevo Caso de Negocio de ROI",
    icon: FileText,
    to: "/roi-business-case",
    iconColor: "text-primary",
  },
  {
    title: "Agentes en Seguimiento",
    icon: Users,
    to: "/on-track-agents",
    iconColor: "text-accent",
  },
  {
    title: "Mejora Continua de Procesos",
    icon: TrendingUp,
    to: "/process-improvement",
    iconColor: "text-primary",
  },
  {
    title: "Adopción de IA 360 Empresarial",
    icon: Target,
    to: "/ai-adoption",
    iconColor: "text-accent",
  },
];

export default function Home() {
  return (
    <div className="w-full h-full bg-bluegrey-500 rounded-2xl py-8 px-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Home
        </h1>
        <p className="text-bluegrey-900 text-sm md:text-base mt-2">
          Select a module to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
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
