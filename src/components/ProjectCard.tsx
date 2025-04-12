
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Github, Layers } from 'lucide-react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            <Link to={`/project/${project.id}`} className="hover:text-primary transition-colors">
              {project.name}
            </Link>
          </CardTitle>
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
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mt-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
          <Layers className="h-3 w-3" />
          <span>{project.tasks.filter(t => t.completed).length}/{project.tasks.length} tasks completed</span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-2 flex justify-between">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Updated {format(new Date(project.updatedAt), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Github className="h-3 w-3" />
            </a>
          )}
          {project.deploymentUrl && (
            <a 
              href={project.deploymentUrl} 
              target="_blank" 
              rel="noreferrer"
              className="text-muted-foreground hover:text-white transition-colors" 
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
