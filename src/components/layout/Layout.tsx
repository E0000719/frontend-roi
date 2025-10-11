import { Menu, X, LayoutDashboard, FileText, User, BookMarked, SquareCode, Target, TrendingUp, Home, Users, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import Header from "./Header";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
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
    <div className="min-h-screen">
      <div className="hidden lg:block fixed w-full top-0 left-0 px-6 pt-6 pb-2">
        <Header />
      </div>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:pt-24 inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
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

        <nav className="pl-6 pt-2 pb-6 h-full">
          <div className="w-full h-full bg-bluegrey-500 rounded-2xl space-y-6 py-8 px-4 mb-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-primary-foreground bg-primary"
                    : "text-bluegrey-700 hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="size-6" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 lg:pt-24">
        {/* Top bar */}
        <div className="lg:hidden sticky z-30 flex h-16 items-center gap-4 border-b border-border backdrop-blur-sm px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="flex-1" />
        </div>

        {/* Page content */}
        <main className="pl-[10px] pr-6 pt-2 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

export function DashboardLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
};
