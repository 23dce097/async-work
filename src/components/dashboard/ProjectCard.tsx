import { Calendar, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    progress: number;
    dueDate: string;
    memberCount: number;
    completedTasks: number;
    totalTasks: number;
    members: Array<{
      id: string;
      name: string;
      avatar?: string;
    }>;
    color: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover-lift cursor-pointer bg-card border-border animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${project.color}`} />
            <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {Math.round(project.progress)}% Complete
          </Badge>
        </div>
        <p className="text-sm text-foreground-muted line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground-muted">Progress</span>
            <span className="text-foreground">{project.completedTasks}/{project.totalTasks} tasks</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-foreground-muted">
              <Calendar className="w-4 h-4" />
              <span>{project.dueDate}</span>
            </div>
            <div className="flex items-center gap-1 text-foreground-muted">
              <Users className="w-4 h-4" />
              <span>{project.memberCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-success">
            <CheckCircle className="w-4 h-4" />
            <span>{project.completedTasks} done</span>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="w-6 h-6 border-2 border-card">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-surface border-2 border-card flex items-center justify-center">
                <span className="text-xs text-foreground-muted">
                  +{project.members.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}