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
      <Card className="border-0 bg-bluegrey-400 px-6 py-12">
        <CardContent className="flex flex-col items-center p-0">
          <div className="bg-bluegrey-200 rounded-2xl size-14 flex items-center justify-center mb-4">
            <Icon className="size-10 text-bluegrey-700" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mt-6">
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
