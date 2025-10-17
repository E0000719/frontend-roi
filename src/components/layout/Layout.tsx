import { Menu, X, Home, TrendingUp, Bot, Target, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [arOpen, setArOpen] = useState(false); // For Accounts receivable dropdown
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigation: Array<{ 
    name: string; 
    href: string; 
    icon: typeof Home; 
    children?: Array<{ name: string; href: string }> 
  }> = [
    { name: "Home", href: "/", icon: Home },
    { name: "ROI Business case", href: "/roi-business-case", icon: FileText },
    { name: "On track agents", href: "/on-track-agents", icon: Bot },
    { name: "Continuous process improvement", href: "/process-improvement", icon: TrendingUp },
    { name: "360 Company AI adoption", href: "/ai-adoption", icon: Target },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex">
      <div>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
          {/* Sidebar */}
          <div className={`fixed mt-6 transform transition-all duration-300 ease-in ${collapsed ? "w-24" : " w-64"}`}>
            <div className="lg:hidden flex h-16 items-center justify-between px-6 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <nav className="pl-6 pb-6 h-full">
              <div className="w-full h-full bg-bluegrey-500 rounded-2xl space-y-6 pb-8 pt-4 px-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <img src="/icons/roomie.png" alt="Roomie" width="98" height="38" 
                    className={`bg-gray-900 p-3 rounded-[8px] ${collapsed ? "hidden" : ""}`}/>
                  <Button variant="outline" size="icon" className="border-0 bg-transparent hover:bg-transparent focus:ring-0"
                    onClick={() => setCollapsed(!collapsed)}>
                      {collapsed ? <img src="/icons/roomie_icon.png" alt="Menu" /> : <Menu className="size-6 text-bluegrey-800"></Menu>}
                  </Button>
                </div>
                <div className="h-[calc(100%-4rem)] space-y-4 overflow-y-auto scrollbar-hide">
                {navigation.map((item) => {
                  if (item.children) {
                    // Accounts receivable with dropdown
                    return (
                      <div key={item.name} className="space-y-1">
                        <button
                          className={`flex items-center space-x-2 p-2 rounded-xl w-full transition-size duration-50 text-bluegrey-700 hover:text-foreground hover:bg-muted ${arOpen ? "font-semibold" : ""}`}
                          onClick={() => setArOpen((open) => !open)}
                          type="button"
                        >
                          <item.icon className="size-6" />
                          <span className={`font-medium flex-1 text-left ${collapsed ? "hidden" : ""}`}>{item.name}</span>
                          {arOpen ? <ChevronUp className={`size-4 ${collapsed ? "hidden" : ""}`} /> : <ChevronDown className={`size-4 ${collapsed ? "hidden" : ""}`} />}
                        </button>
                        {arOpen && (
                          <div className="ml-8 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                className={`block p-2 rounded-lg transition-all duration-50 ${
                                  isActive(child.href)
                                    ? "text-primary-foreground bg-primary"
                                    : "text-bluegrey-700 hover:text-foreground hover:bg-muted"
                                }`}
                                onClick={() => setSidebarOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  // Regular menu item
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-50 ${
                        isActive(item.href)
                          ? "text-primary-foreground bg-primary"
                          : "text-bluegrey-700 hover:text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="size-6" />
                      <span className={`font-medium ${collapsed ? "hidden" : ""}`}>{item.name}</span>
                    </Link>
                  );
                })}
                </div>
              </div>
            </nav>
          </div>
      </div>
      <div className={`w-full ${collapsed ? "ml-24" : "ml-64"}`}>
        <div className={` hidden sm:block fixed top-0 left-0 pl-2 px-6 ml-[50] pt-6 pb-0 z-[999] header ${collapsed ? "ml-24 w-[calc(100%-96px)]" : "ml-64 w-[calc(100%-256px)]"}`}>
          <Header />
        </div>
        <div className="w-full">

          {/* Main content */}
          <div className={`w-full lg:pt-24`}>
            {/* Page content */}
            <main className="w-full pl-[10px] pr-6 pb-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

export function MainLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
};
