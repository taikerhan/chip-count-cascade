
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterChipProps {
  activeFilters: number;
  onClick: () => void;
}

const FilterChip = ({ activeFilters, onClick }: FilterChipProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Filter className="h-4 w-4" />
      Filters
      {activeFilters > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
          {activeFilters}
        </span>
      )}
    </Button>
  );
};

export default FilterChip;
