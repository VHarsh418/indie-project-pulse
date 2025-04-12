
import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Planning', value: 'planning' },
  { label: 'On Hold', value: 'on-hold' },
];

interface StatusFilterProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  setSelectedStatus,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedStatus === 'all' 
            ? 'All Projects'
            : `${statuses.find((status) => status.value === selectedStatus)?.label}`
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {statuses.map((status) => (
              <CommandItem
                key={status.value}
                onSelect={(currentValue) => {
                  setSelectedStatus(currentValue);
                  setOpen(false);
                }}
                value={status.value}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedStatus === status.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {status.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StatusFilter;
