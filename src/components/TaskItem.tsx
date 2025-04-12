
import { useState } from 'react';
import { Calendar, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '@/types';
import { useProjects } from '@/context/ProjectContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface TaskItemProps {
  task: Task;
  projectId: string;
}

const TaskItem = ({ task, projectId }: TaskItemProps) => {
  const { toggleTaskCompletion, deleteTask } = useProjects();

  return (
    <div className={`flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 group ${task.completed ? 'bg-secondary/30' : ''}`}>
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={() => toggleTaskCompletion(projectId, task.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <span className={task.completed ? 'task-completed' : ''}>{task.title}</span>
      </div>
      <div className="flex items-center gap-2">
        {task.dueDate && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(task.dueDate), 'MMM d')}
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => deleteTask(projectId, task.id)}
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
