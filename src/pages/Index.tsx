import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { Button } from "@/components/ui/button";

// Mock data
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of our company website with modern design and improved UX",
    progress: 75,
    dueDate: "Dec 15",
    memberCount: 6,
    completedTasks: 9,
    totalTasks: 12,
    color: "bg-blue-500",
    members: [
      { id: "1", name: "Sarah Chen", avatar: "/placeholder.svg" },
      { id: "2", name: "Mike Johnson" },
      { id: "3", name: "Anna Davis" },
      { id: "4", name: "Tom Wilson" },
    ],
  },
  {
    id: "2",
    name: "Mobile App",
    description: "Native mobile application for iOS and Android platforms",
    progress: 45,
    dueDate: "Jan 20",
    memberCount: 4,
    completedTasks: 4,
    totalTasks: 8,
    color: "bg-green-500",
    members: [
      { id: "5", name: "David Kim" },
      { id: "6", name: "Lisa Zhang" },
      { id: "7", name: "John Smith" },
    ],
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q1 digital marketing campaign across social media platforms",
    progress: 20,
    dueDate: "Feb 28",
    memberCount: 3,
    completedTasks: 1,
    totalTasks: 5,
    color: "bg-purple-500",
    members: [
      { id: "8", name: "Emma Wilson" },
      { id: "9", name: "Alex Rodriguez" },
    ],
  },
];

const mockTasks = [
  {
    id: "1",
    title: "Design homepage hero section",
    description: "Create an engaging hero section with clear value proposition",
    status: "todo" as const,
    priority: "high" as const,
    dueDate: "Dec 10",
    assignee: { id: "1", name: "Sarah Chen", avatar: "/placeholder.svg" },
    commentCount: 3,
    attachmentCount: 2,
    projectName: "Website Redesign",
  },
  {
    id: "2",
    title: "Implement user authentication",
    status: "in_progress" as const,
    priority: "urgent" as const,
    dueDate: "Dec 8",
    assignee: { id: "2", name: "Mike Johnson" },
    commentCount: 5,
    attachmentCount: 0,
    projectName: "Mobile App",
  },
  {
    id: "3",
    title: "Create social media templates",
    description: "Design templates for Instagram, Facebook, and Twitter posts",
    status: "done" as const,
    priority: "medium" as const,
    assignee: { id: "8", name: "Emma Wilson" },
    commentCount: 2,
    attachmentCount: 5,
    projectName: "Marketing Campaign",
  },
  {
    id: "4",
    title: "Set up CI/CD pipeline",
    status: "todo" as const,
    priority: "low" as const,
    dueDate: "Dec 12",
    assignee: { id: "3", name: "Anna Davis" },
    commentCount: 0,
    attachmentCount: 1,
    projectName: "Website Redesign",
  },
];

const Index = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "tasks">("dashboard");

  const handleTaskClick = (task: any) => {
    console.log("Opening task:", task);
  };

  const handleAddTask = (status: string) => {
    console.log("Adding task with status:", status);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header notificationCount={3} />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={activeView === "dashboard" ? "default" : "ghost"}
                onClick={() => setActiveView("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={activeView === "tasks" ? "default" : "ghost"}
                onClick={() => setActiveView("tasks")}
              >
                Task Board
              </Button>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>

          {activeView === "dashboard" ? (
            <>
              {/* Stats */}
              <DashboardStats />

              {/* Projects */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Active Projects</h2>
                  <Button variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Project
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <RecentActivity />
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Task Board</h2>
              <TaskBoard 
                tasks={mockTasks}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
