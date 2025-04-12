
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { mockProjects } from "../data/mockData";
import { Project, Task, ProjectStatus } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

interface ProjectContextType {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  updateProject: (id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id">) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Omit<Task, "id">>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  toggleTaskCompletion: (projectId: string, taskId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const getProject = useCallback((id: string) => {
    return projects.find(project => project.id === id);
  }, [projects]);

  const addProject = useCallback((project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
    toast.success("Project created successfully!");
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id 
          ? { ...project, ...updates, updatedAt: new Date().toISOString() } 
          : project
      )
    );
    toast.success("Project updated successfully!");
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast.success("Project deleted successfully!");
  }, []);

  const addTask = useCallback((projectId: string, task: Omit<Task, "id">) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              tasks: [...project.tasks, { ...task, id: uuidv4() }],
              updatedAt: new Date().toISOString()
            } 
          : project
      )
    );
    toast.success("Task added successfully!");
  }, []);

  const updateTask = useCallback((projectId: string, taskId: string, updates: Partial<Omit<Task, "id">>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              tasks: project.tasks.map(task => 
                task.id === taskId 
                  ? { ...task, ...updates } 
                  : task
              ),
              updatedAt: new Date().toISOString()
            } 
          : project
      )
    );
    toast.success("Task updated successfully!");
  }, []);

  const deleteTask = useCallback((projectId: string, taskId: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              tasks: project.tasks.filter(task => task.id !== taskId),
              updatedAt: new Date().toISOString()
            } 
          : project
      )
    );
    toast.success("Task deleted successfully!");
  }, []);

  const toggleTaskCompletion = useCallback((projectId: string, taskId: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              tasks: project.tasks.map(task => 
                task.id === taskId 
                  ? { ...task, completed: !task.completed } 
                  : task
              ),
              updatedAt: new Date().toISOString()
            } 
          : project
      )
    );
  }, []);

  return (
    <ProjectContext.Provider value={{
      projects,
      getProject,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
