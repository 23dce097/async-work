import { useState } from "react";
import { 
  FolderOpen, 
  Plus, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronDown,
  Hash
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

const mockProjects: Project[] = [
  { id: "1", name: "Website Redesign", color: "bg-blue-500", taskCount: 12 },
  { id: "2", name: "Mobile App", color: "bg-green-500", taskCount: 8 },
  { id: "3", name: "Marketing Campaign", color: "bg-purple-500", taskCount: 5 },
];

const navigationItems = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "My Tasks", href: "/tasks", icon: Calendar },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 border-r border-border bg-surface/30 backdrop-blur-xl flex flex-col">
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Projects */}
        <div className="mt-8">
          <Collapsible open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-0 h-auto text-sm font-medium text-foreground-muted hover:text-foreground"
              >
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Projects
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  isProjectsOpen && "rotate-180"
                )} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-2">
              {mockProjects.map((project) => (
                <NavLink
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group",
                    isActive(`/projects/${project.id}`)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full", project.color)} />
                  <span className="flex-1 truncate">{project.name}</span>
                  <span className="text-xs opacity-60">{project.taskCount}</span>
                </NavLink>
              ))}
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-surface-hover"
              >
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </aside>
  );
}