
import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useProjects } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get days that have tasks with due dates
  const taskDates: Record<string, { taskCount: number, projectIds: string[] }> = {};
  
  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.dueDate) {
        const dateStr = format(new Date(task.dueDate), 'yyyy-MM-dd');
        if (!taskDates[dateStr]) {
          taskDates[dateStr] = { taskCount: 0, projectIds: [] };
        }
        taskDates[dateStr].taskCount += 1;
        if (!taskDates[dateStr].projectIds.includes(project.id)) {
          taskDates[dateStr].projectIds.push(project.id);
        }
      }
    });
  });

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (dateStr: string) => {
    if (taskDates[dateStr]?.projectIds.length === 1) {
      navigate(`/project/${taskDates[dateStr].projectIds[0]}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Calendar</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={prevMonth} size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-2 min-w-32 justify-center">
            <CalendarIcon className="h-4 w-4" />
            <span>{format(currentMonth, 'MMMM yyyy')}</span>
          </div>
          <Button variant="outline" onClick={nextMonth} size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
        
        {Array(monthStart.getDay()).fill(null).map((_, i) => (
          <div key={`empty-start-${i}`} />
        ))}
        
        {monthDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const hasTask = dateStr in taskDates;
          
          return (
            <Card 
              key={dateStr}
              className={`h-28 ${!isSameMonth(day, currentMonth) ? 'opacity-50' : ''} ${
                hasTask ? 'hover:border-primary cursor-pointer' : ''
              }`}
              onClick={() => hasTask && handleDayClick(dateStr)}
            >
              <CardContent className="p-2 h-full flex flex-col">
                <div className={`text-right text-sm mb-1 ${isSameDay(day, new Date()) ? 'font-bold text-primary' : ''}`}>
                  {format(day, 'd')}
                </div>
                {taskDates[dateStr] && (
                  <div className="mt-auto">
                    <Badge className="bg-primary text-xs">
                      {taskDates[dateStr].taskCount} {taskDates[dateStr].taskCount === 1 ? 'task' : 'tasks'}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {taskDates[dateStr].projectIds.length} {taskDates[dateStr].projectIds.length === 1 ? 'project' : 'projects'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
