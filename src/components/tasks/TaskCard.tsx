import { Calendar, MessageCircle, Paperclip } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    dueDate?: string;
    assignee?: {
      id: string;
      name: string;
      avatar?: string;
    };
    commentCount: number;
    attachmentCount: number;
    projectName: string;
  };
  onClick?: () => void;
}

const statusConfig = {
  todo: { label: "To Do", className: "status-todo" },
  in_progress: { label: "In Progress", className: "status-progress" },
  done: { label: "Done", className: "status-done" },
};

const priorityConfig = {
  low: { className: "priority-low" },
  medium: { className: "priority-medium" },
  high: { className: "priority-high" },
  urgent: { className: "priority-urgent" },
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";
  
  return (
    <Card 
      className={cn(
        "hover-lift cursor-pointer bg-card border-border animate-fade-in",
        isOverdue && "border-destructive/50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={cn("priority-indicator", priorityConfig[task.priority].className)} />
            <Badge className={statusConfig[task.status].className}>
              {statusConfig[task.status].label}
            </Badge>
          </div>
          {task.assignee && (
            <Avatar className="w-6 h-6">
              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {task.assignee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h4 className="font-medium text-foreground line-clamp-2">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-foreground-muted line-clamp-2">{task.description}</p>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-foreground-muted">
          <span className="font-medium text-primary">{task.projectName}</span>
          <div className="flex items-center gap-3">
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive"
              )}>
                <Calendar className="w-3 h-3" />
                <span>{task.dueDate}</span>
              </div>
            )}
            {task.commentCount > 0 && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{task.commentCount}</span>
              </div>
            )}
            {task.attachmentCount > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                <span>{task.attachmentCount}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}