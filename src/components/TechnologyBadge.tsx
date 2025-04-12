
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TechnologyBadgeProps {
  technology: string;
  onRemove?: () => void;
  className?: string;
}

const TechnologyBadge = ({ technology, onRemove, className = '' }: TechnologyBadgeProps) => {
  return (
    <Badge 
      variant="secondary"
      className={`${className} ${onRemove ? 'pr-1' : ''} text-xs`}
    >
      {technology}
      {onRemove && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export default TechnologyBadge;
