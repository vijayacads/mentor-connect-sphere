
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { FilterOptions } from "@/types";
import { subjectFields, countries, lastActiveOptions } from "@/data/mockData";

interface UserFilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  role: "mentor" | "mentee";
}

const UserFilterBar = ({ onFilterChange, role }: UserFilterBarProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    subjectField: undefined,
    country: undefined,
    lastActive: undefined,
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value === "all" ? undefined : value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      subjectField: undefined,
      country: undefined,
      lastActive: undefined,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <FilterX className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="subject-filter" className="text-sm font-medium block mb-2">
            Subject Field
          </label>
          <Select 
            value={filters.subjectField || "all"}
            onValueChange={(value) => handleFilterChange("subjectField", value)}
          >
            <SelectTrigger id="subject-filter" className="w-full">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              {subjectFields.filter(field => field !== "All Fields").map((field) => (
                <SelectItem key={field} value={field}>{field}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="country-filter" className="text-sm font-medium block mb-2">
            Country
          </label>
          <Select 
            value={filters.country || "all"}
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger id="country-filter" className="w-full">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.filter(country => country !== "All Countries").map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="activity-filter" className="text-sm font-medium block mb-2">
            Last Active
          </label>
          <Select 
            value={filters.lastActive || "all"}
            onValueChange={(value) => handleFilterChange("lastActive", value as any)}
          >
            <SelectTrigger id="activity-filter" className="w-full">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              {lastActiveOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        Showing {role === "mentor" ? "mentors" : "mentees"} 
        {filters.subjectField ? ` in ${filters.subjectField}` : ""}
        {filters.country ? ` from ${filters.country}` : ""}
        {filters.lastActive ? ` active ${lastActiveOptions.find(o => o.value === filters.lastActive)?.label.toLowerCase() || ""}` : ""}
      </div>
    </div>
  );
};

export default UserFilterBar;
