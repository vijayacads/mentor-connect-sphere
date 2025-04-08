
import { useState, useEffect } from "react";
import UserProfileCard from "@/components/user/UserProfileCard";
import UserFilterBar from "@/components/filters/UserFilterBar";
import { Button } from "@/components/ui/button";
import { FilterOptions, Mentor } from "@/types";
import { mentors as allMentors } from "@/data/mockData";
import { Search } from "lucide-react";

const MentorsPage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 10;

  useEffect(() => {
    // Simulate API call to fetch mentors
    setMentors(allMentors);
    setFilteredMentors(allMentors);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...mentors];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(mentor => 
        mentor.name.toLowerCase().includes(query) ||
        mentor.bio?.toLowerCase().includes(query) ||
        mentor.subjectField?.toLowerCase().includes(query) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(query))
      );
    }
    
    setFilteredMentors(result);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchQuery, mentors]);

  const handleFilterChange = (filters: FilterOptions) => {
    let result = [...mentors];
    
    if (filters.subjectField) {
      result = result.filter(mentor => mentor.subjectField === filters.subjectField);
    }
    
    if (filters.country) {
      result = result.filter(mentor => mentor.country === filters.country);
    }
    
    if (filters.lastActive) {
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = 7 * oneDay;
      const oneMonth = 30 * oneDay;
      
      result = result.filter(mentor => {
        if (!mentor.lastActive) return false;
        
        const lastActive = new Date(mentor.lastActive);
        const diffTime = now.getTime() - lastActive.getTime();
        
        switch (filters.lastActive) {
          case "today":
            return diffTime < oneDay;
          case "this_week":
            return diffTime < oneWeek;
          case "this_month":
            return diffTime < oneMonth;
          default:
            return true;
        }
      });
    }
    
    setFilteredMentors(result);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Get current page mentors
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find a Mentor</h1>
        <p className="text-gray-600">
          Connect with experienced professionals who can guide your learning journey.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentors by name, expertise, or subject field..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 py-2.5 pr-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mentorBlue focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <UserFilterBar onFilterChange={handleFilterChange} role="mentor" />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstMentor + 1}-{Math.min(indexOfLastMentor, filteredMentors.length)} of {filteredMentors.length} mentors
        </p>
      </div>

      {/* Mentors Grid */}
      {filteredMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {currentMentors.map((mentor) => (
            <UserProfileCard key={mentor.id} user={mentor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              handleFilterChange({});
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default MentorsPage;
