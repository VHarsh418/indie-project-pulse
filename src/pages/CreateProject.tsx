
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { useProjects } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TechnologyBadge from '@/components/TechnologyBadge';
import { ProjectStatus } from '@/types';
import { Link } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning' as ProjectStatus,
    githubUrl: '',
    deploymentUrl: '',
  });
  
  const [newTechnology, setNewTechnology] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addProject({
      ...formData,
      technologies,
      tasks: []
    });
    
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
      <Button variant="ghost" asChild className="mb-4 -ml-3">
        <Link to="/" className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>

      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Project Name</label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter project name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your project"
            className="min-h-24"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="technologies" className="text-sm font-medium">Technologies</label>
          <div className="flex gap-2">
            <Input
              id="technologies"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Add technology"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={handleAddTechnology} 
              disabled={!newTechnology.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.length > 0 ? (
              technologies.map((tech) => (
                <TechnologyBadge
                  key={tech}
                  technology={tech}
                  onRemove={() => handleRemoveTechnology(tech)}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No technologies added yet.</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="githubUrl" className="text-sm font-medium">GitHub Repository URL (optional)</label>
          <Input
            id="githubUrl"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            placeholder="https://github.com/username/repo"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="deploymentUrl" className="text-sm font-medium">Deployment URL (optional)</label>
          <Input
            id="deploymentUrl"
            value={formData.deploymentUrl}
            onChange={(e) => setFormData({ ...formData, deploymentUrl: e.target.value })}
            placeholder="https://your-project.vercel.app"
          />
        </div>
        
        <div className="pt-4">
          <Button type="submit" disabled={!formData.name || !formData.description}>
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
