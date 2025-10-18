import { LucideIcon, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgenticCustomerITSupport from "@/components/icons/AgenticCustomerITSupport";
import LegalCompliance from "@/components/icons/LegalCompliance";
import OrderToCash from "@/components/icons/OrderToCash";

interface Module {
  name: string;
  href: string;
  icon?: LucideIcon;
  iconSrc?: string; // Optional icon source for image icons
  iconColor?: string;
  active?: boolean;
}

interface HeaderProps {
  modules?: Module[];
}

const Header = ({ modules }: HeaderProps) => {
  // Default modules if none provided
  const defaultModules = [
    { name: "Agentic Customer & IT Support", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:8080/", icon: AgenticCustomerITSupport, iconColor: "text-warning-300" },
    { name: "Legal & Compliance", href: "", icon: LegalCompliance, iconColor: "text-green-300" },
    { name: "Order to Cash", href: "https://roomie2.sgrhost.com/", icon: OrderToCash, iconColor: "text-error-100" },
  ];

  const modulesToRender = modules || defaultModules;

  return (
    <div className="w-full">
      {/* Logo Section */}
      <div className="bg-bluegrey-500 rounded-2xl p-2 pr-4">
        <div className="w-full flex items-center justify-between gap-2">
          {/* Modules Navigation */}
            <div className="thin-scrollbar w-full flex items-center overflow-x-auto gap-2">
                <div className="flex space-x-2">
                {modulesToRender.map((module) => {
                  const Icon = module.icon;
                  return (
                    <a key={module.name} href={module.href}>
                      <Button
                        variant="outline"
                        className={`h-12 border-0 flex items-center px-8 py-2 rounded-xl text-bluegrey-50 ${module.active ? 'bg-gray-800' : 'bg-[#434B4F] bg-gradient-to-r from-[#434B4F] to-[#59656C]'}`}
                      >
                        {Icon && (
                          <Icon className={`size-8 ${module.iconColor} bg-black rounded-full`} />
                        )}
                        <span className="font-medium">{module.name}</span>
                      </Button>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="ml-2 w-32">
                <Button variant="ghost" size="icon">
                    <Bell className="size-6" />
                </Button>
                <Button variant="ghost" size="icon" className="ml-2 size-8 rounded-full border-0 bg-green-300">
                    <User className="size-6" />
                </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Header;