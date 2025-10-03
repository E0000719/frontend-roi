import { FileText, Wrench, DollarSign, Headphones, Eye, FileCheck, ShoppingCart, Cpu, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    title: "Legacy Takeover",
    subtitle: "Takeover",
    icon: Wrench,
    description: "Modernize legacy systems",
    route: "legacy_takeover"
  },
  {
    title: "Agentic Cost to Hire",
    subtitle: "Cost to Hire",
    icon: DollarSign,
    description: "Optimize hiring costs",
    route: "cost-to-hire"
  },
  {
    title: "Agentic Customer Support",
    subtitle: "Customer Support",
    icon: Headphones,
    description: "AI-powered support",
    route: "customer-support"
  },
  {
    title: "Real Time Insights",
    subtitle: "Insights",
    icon: Eye,
    description: "Live analytics",
    route: "insights"
  },
  {
    title: "Contract Management Compliance",
    subtitle: "Compliance",
    icon: FileCheck,
    description: "Manage contracts",
    route: "compliance"
  },
  {
    title: "Agentic Order to Cash",
    subtitle: "Order to Cash",
    icon: ShoppingCart,
    description: "Streamline O2C",
    route: "order-to-cash"
  },
  {
    title: "Physical AI",
    subtitle: "AI",
    icon: Cpu,
    description: "Physical automation",
    route: "physical-ai"
  },
  {
    title: "Web Interface Takeover",
    subtitle: "Takeover",
    icon: Globe,
    description: "Web automation",
    route: "web-takeover"
  }
];

export default function RoiBusinessCase() {
  const navigate = useNavigate();

  const handleModuleClick = (route: string) => {
    navigate(`/roi-business-case/${route}/overview`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <FileText className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">New ROI Implementation</h1>
          <p className="text-muted-foreground">New ROI Business Case</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">ROI First Assistant</h2>
        </div>

        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Select one of the AgenticAI Modules
          </h3>
          <p className="text-lg text-muted-foreground">
            to create a new Business Case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.title}
                onClick={() => handleModuleClick(module.route)}
                className="group cursor-pointer transition-all hover:shadow-hover hover:scale-105 border-border/50"
              >
                <CardHeader className="text-center pb-3">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-muted group-hover:bg-accent/10 transition-colors">
                      <Icon className="h-8 w-8 text-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground leading-tight">
                    {module.title.split(' ')[0]}
                  </CardTitle>
                  <CardDescription className="text-accent font-medium text-base">
                    {module.subtitle || module.title.split(' ').slice(1).join(' ')}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
