
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarDays, Home, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 lg:min-h-screen bg-secondary p-4 flex flex-row lg:flex-col justify-between">
        <div className="flex flex-row lg:flex-col gap-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              ProjectPilot
            </h1>
          </div>
          <nav className="space-y-1 flex flex-row lg:flex-col gap-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-primary/20 text-primary' : 'hover:bg-secondary-foreground/10'
                }`
              }
              end
            >
              <Home size={18} />
              <span className="hidden lg:inline">Dashboard</span>
            </NavLink>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-primary/20 text-primary' : 'hover:bg-secondary-foreground/10'
                }`
              }
            >
              <CalendarDays size={18} />
              <span className="hidden lg:inline">Calendar</span>
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-primary/20 text-primary' : 'hover:bg-secondary-foreground/10'
                }`
              }
            >
              <Settings size={18} />
              <span className="hidden lg:inline">Settings</span>
            </NavLink>
          </nav>
        </div>
        <div className="mt-auto flex flex-row lg:flex-col gap-2 items-center lg:items-start">
          <Button asChild variant="outline" size="sm" className="w-full">
            <NavLink to="/new-project" className="flex items-center gap-2">
              <Plus size={16} />
              <span className="hidden lg:inline">New Project</span>
            </NavLink>
          </Button>
          <div className="hidden lg:block mt-2">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
