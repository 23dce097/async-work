import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./TaskCard";
import { cn } from "@/lib/utils";

interface Task {
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
}

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: Task["status"]) => void;
}

const columns = [
  { id: "todo", title: "To Do", className: "bg-surface/30" },
  { id: "in_progress", title: "In Progress", className: "bg-warning/5" },
  { id: "done", title: "Done", className: "bg-success/5" },
] as const;

export function TaskBoard({ tasks, onTaskClick, onAddTask }: TaskBoardProps) {
  const getTasksByStatus = (status: Task["status"]) => 
    tasks.filter(task => task.status === status);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        
        return (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{column.title}</h3>
                <span className="text-sm text-foreground-muted bg-surface px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-surface-hover"
                onClick={() => onAddTask?.(column.id)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Column Content */}
            <div className={cn(
              "flex-1 rounded-lg p-3 space-y-3 min-h-[500px]",
              column.className
            )}>
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
              
              {/* Add Task Button */}
              <Button
                variant="ghost"
                className="w-full h-12 border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 text-foreground-muted hover:text-primary"
                onClick={() => onAddTask?.(column.id)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}