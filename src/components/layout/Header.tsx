import { LucideIcon, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { name: "Order to Cash", href: "/cost", iconSrc: "/icons/order-to-cash-icon.png", iconColor: "text-error-100", active: true },

    { name: "Legacy Systems Takeover", href: "/legacy", iconSrc: "/icons/legacy-icon.png", iconColor: "text-error-100" },
    { name: "Agentic Customer & IT Support", href: "/discovery", iconSrc: "/icons/customer-icon.png", iconColor: "text-green-300" },
    { name: "Legal & Compliance", href: "/compliance", iconSrc: "/icons/compliance-icon.png", iconColor: "text-green-300"},
    { name: "Enterprise Application Automation", href: "/cost", iconSrc: "/icons/enterprise-icon.png", iconColor: "text-error-100" },
    { name: "Real-Time Insights", href: "/insights", iconSrc: "/icons/real-time-icon.png", iconColor: "text-blue-500" },
    { name: "Agentic Recruiting & Hiring", href: "/recruiting", iconSrc: "/icons/recruting-icon.png", iconColor: "text-error-100" },
    { name: "Physical Agents Service Robots", href: "/recruiting", iconSrc: "/icons/physical-icon.png", iconColor: "text-error-100" },

  ];

  const modulesToRender = modules || defaultModules;

  return (
    <div className="w-full">
      {/* Logo Section */}
      <div className="bg-bluegrey-500 rounded-2xl p-2 pb-1 pr-4 mb-4">
        <div className="w-full flex items-center justify-between gap-2">
          {/* Modules Navigation */}
            <div className="thin-scrollbar w-full flex items-center overflow-x-auto gap-2">
                <div className="flex space-x-2">
                {modulesToRender.map((module) => {
                    const Icon = module.icon;
                    
                    return (
                    <a key={module.name} href={module.href} target="_blank" rel="noopener noreferrer">
                        <Button
                        variant="outline"
                        className={`h-12 flex items-center px-8 py-2 rounded-xl text-bluegrey-50 ${module.active ? 'bg-gray-800' : 'bg-[#434B4F] bg-gradient-to-r from-[#434B4F] to-[#59656C]'}`}
                        >
                          <img src={module.iconSrc} alt={`${module.name} icon`} className="size-8 mr-1" style={{ display: module.iconSrc ? 'inline-block' : 'none' }} />
                          
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