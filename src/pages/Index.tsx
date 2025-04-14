
import React, { useState, useEffect } from 'react';
import FilterChip from '@/components/FilterChip';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [filters, setFilters] = useState({
    leadStatus: 'open',
    source: {
      all: true,
      web: true,
      referral: true,
    },
    leadType: {
      all: true,
      buyer: true,
      seller: true,
    },
    dateCreated: 'any',
  });

  // Effect to handle child checkboxes when parent changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      source: {
        ...prev.source,
        web: prev.source.all ? true : prev.source.web,
        referral: prev.source.all ? true : prev.source.referral,
      },
      leadType: {
        ...prev.leadType,
        buyer: prev.leadType.all ? true : prev.leadType.buyer,
        seller: prev.leadType.all ? true : prev.leadType.seller,
      },
    }));
  }, [filters.source.all, filters.leadType.all]);

  const activeFiltersCount = [
    filters.leadStatus !== 'open',
    Object.values(filters.source).some(v => !v),
    Object.values(filters.leadType).some(v => !v),
    filters.dateCreated !== 'any'
  ].filter(Boolean).length;

  const handleCheckboxChange = (section: 'source' | 'leadType', key: string) => {
    if (key === 'all') {
      // When toggling the parent checkbox
      const newValue = !filters[section].all;
      setFilters(prev => ({
        ...prev,
        [section]: {
          all: newValue,
          // Set all children to match parent
          ...(section === 'source' 
            ? { web: newValue, referral: newValue }
            : { buyer: newValue, seller: newValue }
          ),
        }
      }));
    } else {
      // When toggling a child checkbox
      setFilters(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: !prev[section][key],
          // If any child is unchecked, uncheck the parent
          all: prev[section].all && !prev[section][key],
        }
      }));
    }
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
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium">Lead Status</h3>
              <RadioGroup 
                value={filters.leadStatus}
                onValueChange={(value) => setFilters(prev => ({ ...prev, leadStatus: value }))}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="open" id="open" />
                  <Label htmlFor="open">Open (Default)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="closed" id="closed" />
                  <Label htmlFor="closed">Closed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Source</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="source-all"
                    checked={filters.source.all}
                    onCheckedChange={() => handleCheckboxChange('source', 'all')}
                  />
                  <Label htmlFor="source-all">All (Default)</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox
                    id="source-web"
                    checked={filters.source.web}
                    disabled={filters.source.all}
                    onCheckedChange={() => handleCheckboxChange('source', 'web')}
                  />
                  <Label htmlFor="source-web">Web</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox
                    id="source-referral"
                    checked={filters.source.referral}
                    disabled={filters.source.all}
                    onCheckedChange={() => handleCheckboxChange('source', 'referral')}
                  />
                  <Label htmlFor="source-referral">Referral</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Lead Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="type-all"
                    checked={filters.leadType.all}
                    onCheckedChange={() => handleCheckboxChange('leadType', 'all')}
                  />
                  <Label htmlFor="type-all">All (Default)</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox
                    id="type-buyer"
                    checked={filters.leadType.buyer}
                    disabled={filters.leadType.all}
                    onCheckedChange={() => handleCheckboxChange('leadType', 'buyer')}
                  />
                  <Label htmlFor="type-buyer">Buyer</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox
                    id="type-seller"
                    checked={filters.leadType.seller}
                    disabled={filters.leadType.all}
                    onCheckedChange={() => handleCheckboxChange('leadType', 'seller')}
                  />
                  <Label htmlFor="type-seller">Seller</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Date Created</h3>
              <RadioGroup 
                value={filters.dateCreated}
                onValueChange={(value) => setFilters(prev => ({ ...prev, dateCreated: value }))}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any">Any (default)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24h" id="24h" />
                  <Label htmlFor="24h">Last 24 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="7d" id="7d" />
                  <Label htmlFor="7d">Last 7 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30d" id="30d" />
                  <Label htmlFor="30d">Last 30 days</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setFilters({
                leadStatus: 'open',
                source: {
                  all: true,
                  web: true,
                  referral: true,
                },
                leadType: {
                  all: true,
                  buyer: true,
                  seller: true,
                },
                dateCreated: 'any',
              })}
            >
              Reset
            </Button>
            <SheetClose asChild>
              <Button className="flex-1 bg-[#3B82F6]">Apply</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
