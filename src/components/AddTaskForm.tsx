
import { useState, FormEvent } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjects } from '@/context/ProjectContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface AddTaskFormProps {
  projectId: string;
}

const AddTaskForm = ({ projectId }: AddTaskFormProps) => {
  const { addTask } = useProjects();
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(projectId, {
        title: taskTitle.trim(),
        completed: false,
        dueDate: dueDate ? dueDate.toISOString() : undefined
      });
      setTaskTitle('');
      setDueDate(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <Input
        placeholder="Add a new task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="flex-1"
      />
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" type="button">
            <Calendar className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 pointer-events-auto" align="end">
          <CalendarComponent
            mode="single"
            selected={dueDate}
            onSelect={(date) => {
              setDueDate(date);
              setCalendarOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button type="submit" disabled={!taskTitle.trim()}>
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default AddTaskForm;
