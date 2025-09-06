import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  project_id: string;
  assignee_id?: string;
  created_by: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  project_name?: string;
  commentCount: number;
  attachmentCount: number;
  projectName: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          project:projects(name)
        `);

      if (error) throw error;

      const processedTasks = data?.map(task => ({
        ...task,
        status: task.status as 'todo' | 'in_progress' | 'done',
        priority: task.priority as 'low' | 'medium' | 'high' | 'urgent',
        assignee: task.assignee_id ? {
          id: task.assignee_id,
          name: 'User',
        } : undefined,
        project_name: task.project?.name || '',
        commentCount: 0,
        attachmentCount: 0,
        projectName: task.project?.name || ''
      })) || [];

      setTasks(processedTasks);
    } catch (error: any) {
      toast({
        title: "Error loading tasks",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: {
    title: string;
    description?: string;
    status?: 'todo' | 'in_progress' | 'done';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    project_id: string;
    assignee_id?: string;
    due_date?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          ...taskData,
          status: taskData.status || 'todo',
          priority: taskData.priority || 'medium',
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      await loadTasks();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;

      await loadTasks();
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    loadTasks,
    createTask,
    updateTask,
  };
};