
import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import ProjectCard from '@/components/ProjectCard';
import StatusFilter from '@/components/StatusFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectStatus } from '@/types';

const Dashboard = () => {
  const { projects } = useProjects();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    let result = [...projects];
    
    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(project => project.status === selectedStatus as ProjectStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        project =>
          project.name.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.technologies.some(tech => tech.toLowerCase().includes(term))
      );
    }
    
    setFilteredProjects(result);
  }, [selectedStatus, searchTerm, projects]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Projects Dashboard</h1>
        <Button asChild>
          <Link to="/new-project" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No projects found</p>
          <Button asChild>
            <Link to="/new-project">Create your first project</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
