import { Headphones, ShoppingCart, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    title: "Order to Cash",
    subtitle: "Order to Cash",
    icon: ShoppingCart,
    description: "Streamline O2C",
    route: "order_to_cash"
  },
  {
    title: "Customer Support",
    subtitle: "Customer Support",
    icon: Headphones,
    description: "AI-powered support",
    route: "customer_support"
  }
];

export default function RoiBusinessCase() {
  const navigate = useNavigate();

  const handleModuleClick = (route: string) => {
    navigate(`/roi-business-case/${route}/overview`);
  };

  return (
    <div className="w-full h-full main-card bg-white rounded-2xl  py-8 px-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          ROI Business Case
        </h1>
        <p className="text-bluegrey-900 text-sm md:text-base mt-2">
          Create a new ROI business case.
        </p>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-bluegrey-200 rounded-2xl size-10 flex items-center justify-center mt-8">
          <Bot className="size-6 text-bluegrey-700" />
        </div>
        <h2 className="text-2xl mt-4 text-gray-900 font-bold">ROI First Assistant</h2>
        <div className="text-base text-center">
          Select one of the agentic AI modules to create a new business case
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card 
              key={module.title}
              onClick={() => handleModuleClick(module.route)}
              className="rounded-2xl text-card-foreground shadow-sm border-0 secondary-card bg-bluegrey-100 px-6 py-8"
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center">
                  <div className="bg-bluegrey-200 rounded-2xl size-14 flex items-center justify-center mb-4">
                    <Icon className="size-10 text-bluegrey-700 group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground leading-tight mt-6">
                  {module.title.split(' ')[0]}
                </CardTitle>
                <CardDescription className="text-bluegrey-900 text-sm font-normal">
                  {module.subtitle || module.title.split(' ').slice(1).join(' ')}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
