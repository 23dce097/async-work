import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "tasks">("dashboard");
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { projects, loading: projectsLoading } = useProjects();
  const { tasks, loading: tasksLoading } = useTasks();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleTaskClick = (task: any) => {
    console.log("Opening task:", task);
    // TODO: Implement task detail modal
  };

  const handleAddTask = (status: string) => {
    console.log("Adding task with status:", status);
    // TODO: Implement add task modal
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (authLoading || projectsLoading || tasksLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Header 
        notificationCount={3} 
        onSignOut={handleSignOut}
        userEmail={user?.email || ""}
      />
      
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
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <ProjectCard 
                        key={project.id} 
                        project={{
                          ...project,
                          progress: project.progress || 0,
                          dueDate: "Dec 15",
                          memberCount: project.member_count || 0,
                          completedTasks: project.completed_tasks || 0,
                          totalTasks: project.total_tasks || 0,
                          members: []
                        }} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No projects yet</p>
                    <Button>Create your first project</Button>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <RecentActivity />
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Task Board</h2>
              <TaskBoard 
                tasks={tasks}
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

export default Dashboard;