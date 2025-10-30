import { Menu, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  modules: Array<{
    name: string;
    href: string;
    icon?: any;
    iconSrc?: string;
    iconColor?: string;
    active?: boolean;
  }>;
  navigation?: Array<{ 
    name: string; 
    href: string;
    icon: any; 
    children?: Array<{ name: string; href: string }> 
  }>;
}

const Layout = ({ children, modules, navigation }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Track which parent menu is open by name
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex">
      <div className="bg-black">
          {/* Sidebar */}
          <div className={`z-[1000] h-full fixed mt-6 pb-6 transform transition-all duration-100 ease-in lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-24" : "lg:w-64"}`}>
            <nav className="pl-6 pb-6 h-full bg-black-points">
              <div className="w-full h-full bg-bluegrey-500 rounded-2xl space-y-6 pb-8 pt-4 px-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <img src="/icons/roomie.png" alt="Roomie" width="98" height="38" 
                    className={`bg-gray-900 p-3 rounded-[8px] ${collapsed ? "lg:hidden" : ""}`}/>
                  <Button variant="outline" size="icon" className="border-0 bg-transparent hover:bg-transparent focus:ring-0"
                    onClick={() => {setCollapsed(!collapsed); setSidebarOpen(false)}}>
                      <img src="/icons/roomie_icon.png" alt="Menu" className={`hidden ${collapsed?'lg:block':''}`}/>
                      <Menu className={`size-6 text-bluegrey-800 ${collapsed?'lg:hidden':''}`}></Menu>
                  </Button>
                </div>
                <div className="h-[calc(100%-4rem)] space-y-4 overflow-y-auto thin-scrollbar">
                {navigation.map((item) => {
                  if (item.children) {
                    const isOpen = openMenus[item.name] || false;
                    return (
                      <div key={item.name} className="space-y-1">
                        <button
                          className={`flex items-center space-x-2 p-2 rounded-xl w-full transition-size duration-50 text-bluegrey-700 hover:text-foreground hover:bg-muted ${isOpen ? "font-semibold" : ""}`}
                          onClick={() => setOpenMenus((prev) => ({ ...prev, [item.name]: !prev[item.name] }))}
                          type="button"
                        >
                          <item.icon className="size-6" />
                          <span className={`font-medium flex-1 text-left ${collapsed ? "hidden" : ""}`}>{item.name}</span>
                          {isOpen ? <ChevronUp className={`size-4 ${collapsed ? "hidden" : ""}`} /> : <ChevronDown className={`size-4 ${collapsed ? "hidden" : ""}`} />}
                        </button>
                        {isOpen && (
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
                      className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-100 ${
                        isActive(item.href)
                          ? "text-primary-foreground bg-primary"
                          : "text-bluegrey-700 hover:text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="size-6" />
                      <span className={`font-medium ${collapsed ? "lg:hidden" : ""}`}>{item.name}</span>
                    </Link>
                  );
                })}
                </div>
              </div>
            </nav>
          </div>
      </div>
      <div className={`w-full ${collapsed ? "lg:ml-24" : "lg:ml-64"}`}>
        <div className={`fixed top-0 left-0 pl-2 px-6 pt-6 pb-0 z-[999] header w-full ${collapsed ? "lg:ml-24 lg:w-[calc(100%-96px)]" : "lg:ml-64 lg:w-[calc(100%-256px)]"}`}>
          <Header onSidebarOpen={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} modules={modules} />
        </div>
        <div className="w-full">
          {/* Main content */}
          <div className={`w-full h-full md:h-[calc(100vh)] pl-2 pr-6 pb-6 pt-24`}>
            {/* Page content */}
            <main className="w-full h-full pl-[10px] bg-white rounded-2xl overflow-hidden">
              <div className="h-full overflow-y-auto p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

export function MainLayout( { modules, navigation }: { modules: LayoutProps["modules"], navigation: LayoutProps["navigation"] } ) {
  return (
    <Layout modules={modules} navigation={navigation}>
      <Outlet />
    </Layout>
  )
};
