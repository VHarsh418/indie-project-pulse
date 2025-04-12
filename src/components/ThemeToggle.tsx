
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  // For now, we'll just render the dark theme since that's what was requested
  return (
    <Button variant="outline" size="icon">
      <Moon className="h-4 w-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
