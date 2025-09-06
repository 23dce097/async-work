import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "task_completed" | "task_created" | "comment_added" | "member_joined";
  user: {
    name: string;
    avatar?: string;
  };
  task?: string;
  project: string;
  timestamp: Date;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "task_completed",
    user: { name: "Sarah Chen", avatar: "/placeholder.svg" },
    task: "Design new homepage layout",
    project: "Website Redesign",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: "2",
    type: "comment_added",
    user: { name: "Mike Johnson" },
    task: "Implement user authentication",
    project: "Mobile App",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    type: "task_created",
    user: { name: "Anna Davis" },
    task: "Create social media assets",
    project: "Marketing Campaign",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: "4",
    type: "member_joined",
    user: { name: "Tom Wilson" },
    project: "Website Redesign",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const activityConfig = {
  task_completed: {
    label: "completed",
    badge: "success",
  },
  task_created: {
    label: "created",
    badge: "secondary",
  },
  comment_added: {
    label: "commented on",
    badge: "secondary",
  },
  member_joined: {
    label: "joined",
    badge: "secondary",
  },
} as const;

export function RecentActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {activity.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-foreground text-sm">
                  {activity.user.name}
                </span>
                <span className="text-sm text-foreground-muted">
                  {activityConfig[activity.type].label}
                </span>
                {activity.task && (
                  <span className="text-sm font-medium text-primary">
                    {activity.task}
                  </span>
                )}
                <span className="text-sm text-foreground-muted">in</span>
                <Badge variant="outline" className="text-xs">
                  {activity.project}
                </Badge>
              </div>
              <p className="text-xs text-foreground-subtle">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}