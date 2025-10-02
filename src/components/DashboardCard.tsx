import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  to: string;
  iconColor?: string;
}

export function DashboardCard({ title, icon: Icon, to, iconColor = "text-primary" }: DashboardCardProps) {
  return (
    <Link to={to} className="block group">
      <Card className="gradient-card shadow-card hover:shadow-hover transition-smooth border-border/50 h-full">
        <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center min-h-[240px]">
          <div className={`mb-6 p-6 rounded-2xl bg-muted/50 group-hover:scale-110 transition-smooth ${iconColor}`}>
            <Icon className="h-12 w-12 md:h-16 md:w-16" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-card-foreground group-hover:text-primary transition-smooth">
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
