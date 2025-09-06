import { CheckCircle, Clock, AlertTriangle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}

const stats: Stat[] = [
  {
    title: "Completed Tasks",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: CheckCircle,
  },
  {
    title: "In Progress",
    value: "16",
    change: "+4%",
    trend: "up",
    icon: Clock,
  },
  {
    title: "Overdue Tasks",
    value: "3",
    change: "-2%",
    trend: "down",
    icon: AlertTriangle,
  },
  {
    title: "Team Members",
    value: "12",
    change: "+1",
    trend: "up",
    icon: Users,
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-foreground-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className={`text-xs ${
              stat.trend === "up" 
                ? "text-success" 
                : stat.trend === "down" 
                ? "text-destructive" 
                : "text-foreground-muted"
            }`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}