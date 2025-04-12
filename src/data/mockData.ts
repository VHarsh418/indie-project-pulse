
import { Project } from "../types";
import { v4 as uuidv4 } from 'uuid';

export const mockProjects: Project[] = [
  {
    id: uuidv4(),
    name: "ProjectPilot",
    description: "A minimal personal project tracker for solo developers and indie hackers.",
    status: "in-progress",
    githubUrl: "https://github.com/username/projectpilot",
    deploymentUrl: "https://projectpilot.vercel.app",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    tasks: [
      { id: uuidv4(), title: "Create landing page", completed: true },
      { id: uuidv4(), title: "Design dashboard", completed: true },
      { id: uuidv4(), title: "Implement project detail page", completed: false },
      { id: uuidv4(), title: "Add task management", completed: false, dueDate: "2025-04-20" },
      { id: uuidv4(), title: "Enable tagging system", completed: false }
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "DevBlog",
    description: "Personal developer blog built with Next.js and MDX.",
    status: "completed",
    githubUrl: "https://github.com/username/devblog",
    deploymentUrl: "https://devblog.vercel.app",
    technologies: ["Next.js", "MDX", "Tailwind CSS"],
    tasks: [
      { id: uuidv4(), title: "Setup Next.js project", completed: true },
      { id: uuidv4(), title: "Design blog layout", completed: true },
      { id: uuidv4(), title: "Add MDX support", completed: true },
      { id: uuidv4(), title: "Create first post", completed: true },
      { id: uuidv4(), title: "Deploy to Vercel", completed: true }
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    name: "WeatherApp",
    description: "Real-time weather app using OpenWeather API.",
    status: "planning",
    technologies: ["React", "API Integration", "CSS"],
    tasks: [
      { id: uuidv4(), title: "Research weather APIs", completed: true },
      { id: uuidv4(), title: "Create wireframes", completed: false, dueDate: "2025-04-18" },
      { id: uuidv4(), title: "Setup project structure", completed: false }
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    name: "Budget Tracker",
    description: "Personal finance and budget tracking application.",
    status: "on-hold",
    githubUrl: "https://github.com/username/budget-tracker",
    technologies: ["React", "Firebase", "Chart.js"],
    tasks: [
      { id: uuidv4(), title: "Design database schema", completed: true },
      { id: uuidv4(), title: "Create auth flow", completed: true },
      { id: uuidv4(), title: "Implement dashboard charts", completed: false },
      { id: uuidv4(), title: "Add expense categories", completed: false }
    ],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
];
