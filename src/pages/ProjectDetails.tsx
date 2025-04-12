
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  ChevronLeft, 
  Clock, 
  ExternalLink, 
  Github, 
  Pencil, 
  Save, 
  Trash, 
  Plus, 
  X 
} from 'lucide-react';
import { format } from 'date-fns';
import { ProjectStatus } from '@/types';
import { useProjects } from '@/context/ProjectContext';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import TaskItem from '@/components/TaskItem';
import AddTaskForm from '@/components/AddTaskForm';
import TechnologyBadge from '@/components/TechnologyBadge';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProject, updateProject, deleteProject } = useProjects();
  
  const project = getProject(id || '');
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '' as ProjectStatus,
    githubUrl: '',
    deploymentUrl: '',
  });
  const [newTechnology, setNewTechnology] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  
  useEffect(() => {
    if (!project) {
      navigate('/');
      return;
    }
    
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      githubUrl: project.githubUrl || '',
      deploymentUrl: project.deploymentUrl || '',
    });
    
    setTechnologies(project.technologies);
  }, [project, navigate]);
  
  if (!project) return null;
  
  const handleSave = () => {
    updateProject(project.id, {
      ...formData,
      technologies,
    });
    setIsEditing(false);
  };
  
  const handleDeleteProject = () => {
    deleteProject(project.id);
    navigate('/');
  };
  
  const handleAddTechnology = () => {
    if (newTechnology.trim() && !technologies.includes(newTechnology.trim())) {
      setTechnologies([...technologies, newTechnology.trim()]);
      setNewTechnology('');
    }
  };
  
  const handleRemoveTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 -ml-3">
          <Link to="/" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>

        <div className="flex justify-between items-start">
          <div>
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-2xl font-bold mb-2 max-w-md"
              />
            ) : (
              <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Updated {format(new Date(project.updatedAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <Button onClick={handleSave} className="flex items-center gap-1">
                <Save className="h-4 w-4" /> Save
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1"
              >
                <Pencil className="h-4 w-4" /> Edit
              </Button>
            )}
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the project and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteProject}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {isEditing ? (
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge 
            className={`
              ${project.status === 'in-progress' ? 'bg-project-in-progress' : ''}
              ${project.status === 'completed' ? 'bg-project-completed' : ''}
              ${project.status === 'planning' ? 'bg-project-planning' : ''}
              ${project.status === 'on-hold' ? 'bg-project-on-hold' : ''}
              border-none
            `}
          >
            {project.status.replace('-', ' ')}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Description</h2>
            {isEditing ? (
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-24"
              />
            ) : (
              <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Tasks</h2>
            <AddTaskForm projectId={project.id} />
            
            <div className="space-y-1 mt-4">
              {project.tasks.length > 0 ? (
                project.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} projectId={project.id} />
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No tasks yet. Add your first task above.</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Technologies</h2>
            {isEditing && (
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add technology..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddTechnology} 
                  disabled={!newTechnology.trim()} 
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.length > 0 ? (
                technologies.map((tech) => (
                  <TechnologyBadge
                    key={tech}
                    technology={tech}
                    onRemove={isEditing ? () => handleRemoveTechnology(tech) : undefined}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No technologies added yet.</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Links</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">GitHub Repository</p>
                {isEditing ? (
                  <Input
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                ) : project.githubUrl ? (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <Github className="h-4 w-4" /> View Repository
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">No GitHub repository added</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Deployment</p>
                {isEditing ? (
                  <Input
                    value={formData.deploymentUrl}
                    onChange={(e) => setFormData({ ...formData, deploymentUrl: e.target.value })}
                    placeholder="https://your-project.vercel.app"
                  />
                ) : project.deploymentUrl ? (
                  <a 
                    href={project.deploymentUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" /> View Deployment
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">No deployment URL added</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
