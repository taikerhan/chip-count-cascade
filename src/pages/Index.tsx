
import React, { useState } from 'react';
import FilterChip from '@/components/FilterChip';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [filters, setFilters] = useState({
    leadStatus: false,
    source: false,
    leadType: false,
    dateCreated: false,
  });

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleFilterChange = (filterKey: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  return (
    <div className="p-4">
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <FilterChip
              activeFilters={activeFiltersCount}
              onClick={() => {}}
            />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="leadStatus"
                checked={filters.leadStatus}
                onCheckedChange={() => handleFilterChange('leadStatus')}
              />
              <Label htmlFor="leadStatus">Lead Status</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="source"
                checked={filters.source}
                onCheckedChange={() => handleFilterChange('source')}
              />
              <Label htmlFor="source">Source</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="leadType"
                checked={filters.leadType}
                onCheckedChange={() => handleFilterChange('leadType')}
              />
              <Label htmlFor="leadType">Lead Type</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dateCreated"
                checked={filters.dateCreated}
                onCheckedChange={() => handleFilterChange('dateCreated')}
              />
              <Label htmlFor="dateCreated">Date Created</Label>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setFilters({
                leadStatus: false,
                source: false,
                leadType: false,
                dateCreated: false,
              })}
            >
              Reset
            </Button>
            <SheetTrigger asChild>
              <Button>Apply</Button>
            </SheetTrigger>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
