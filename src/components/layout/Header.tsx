import { LucideIcon, Bell, LayoutDashboard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../ui/logo";

interface Module {
  name: string;
  href: string;
  icon: LucideIcon;
  iconColor?: string;
  active?: boolean;
}

interface HeaderProps {
  modules?: Module[];
}

const Header = ({ modules }: HeaderProps) => {
  // Default modules if none provided
  const defaultModules = [
        { name: "Compliance OS", href: "/compliance", icon: LayoutDashboard, iconColor: "text-green-300", active: true },
    { name: "Customer Support Automation", href: "/discovery", icon: LayoutDashboard, iconColor: "text-green-300" },
    { name: "Realtime Insights", href: "/insights", icon: LayoutDashboard, iconColor: "text-blue-500" },
    { name: "Cost to Hire", href: "/cost", icon: LayoutDashboard, iconColor: "text-error-100" },

  ];

  const modulesToRender = modules || defaultModules;

  return (
    <div className="w-full">
      {/* Logo Section */}
      <div className="bg-bluegrey-500 rounded-2xl p-2 pr-4 mb-4">
        <div className="w-full flex items-center space-x-2">
            <Logo src="/icons/logo.svg" alt="Logo" className="size-14" />
          {/* Modules Navigation */}
            <div className="flex-grow flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2">
                {modulesToRender.map((module) => {
                    const Icon = module.icon;
                    
                    return (
                    <a key={module.name} href={module.href} target="_blank" rel="noopener noreferrer">
                        <Button
                        variant="outline"
                        className={`h-12 flex items-center px-4 py-2 rounded-xl text-bluegrey-50 ${module.active ? 'bg-gray-800' : 'bg-[#434B4F] bg-gradient-to-r from-[#434B4F] to-[#59656C]'}`}
                        >
                        <Icon 
                            className={`size-6 ${module.iconColor}`}
                        />
                        <span className="font-medium">{module.name}</span>
                        </Button>
                    </a>
                    );
                })}
              </div>
            </div>
            <div className="ml-2">
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