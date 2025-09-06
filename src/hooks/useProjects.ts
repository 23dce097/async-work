import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
  completed_tasks?: number;
  total_tasks?: number;
  progress?: number;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_members(count),
          tasks(id, status)
        `);

      if (error) throw error;

      const processedProjects = data?.map(project => {
        const totalTasks = project.tasks?.length || 0;
        const completedTasks = project.tasks?.filter((task: any) => task.status === 'done').length || 0;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        return {
          ...project,
          member_count: project.project_members?.[0]?.count || 0,
          total_tasks: totalTasks,
          completed_tasks: completedTasks,
          progress
        };
      }) || [];

      setProjects(processedProjects);
    } catch (error: any) {
      toast({
        title: "Error loading projects",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: {
    name: string;
    description: string;
    color?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          color: projectData.color || 'bg-blue-500',
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      // Add current user as project member
      await supabase
        .from('project_members')
        .insert([{
          project_id: data.id,
          user_id: user.id,
          role: 'owner'
        }]);

      await loadProjects();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating project",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    loadProjects,
    createProject,
  };
};