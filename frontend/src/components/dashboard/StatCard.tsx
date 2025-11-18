import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconBgColor?: string;
}

export function StatCard({ title, value, icon: Icon, trend, iconBgColor = "bg-primary" }: StatCardProps) {
  return (
    <Card className="hover-lift border-2 overflow-hidden relative glass-card shadow-xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-100/50 to-transparent rounded-full -mr-20 -mt-20" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-sm font-semibold ${trend.isPositive ? "text-success" : "text-destructive"}`}>
                  {trend.isPositive ? "↑" : "↓"} {trend.value}
                </span>
              </div>
            )}
          </div>
          <div className={`w-16 h-16 rounded-2xl ${iconBgColor} flex items-center justify-center shadow-xl`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
