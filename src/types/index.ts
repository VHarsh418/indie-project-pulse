
export type ProjectStatus = "planning" | "in-progress" | "completed" | "on-hold";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  githubUrl?: string;
  deploymentUrl?: string;
  technologies: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
