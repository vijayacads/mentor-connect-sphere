
import { User, Mentor, Mentee } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Award, Briefcase, Book, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface UserProfileDetailProps {
  user: User;
}

const UserProfileDetail = ({ user }: UserProfileDetailProps) => {
  // Type guards
  const isMentor = (user: User): user is Mentor => user.role === "mentor";
  const isMentee = (user: User): user is Mentee => user.role === "mentee";

  return (
    <div className="space-y-8">
      {/* Header Section with Profile Image */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={user.profilePic || "https://via.placeholder.com/200"}
          alt={`${user.name}'s profile`}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <Badge 
              className="self-center md:self-auto"
              variant={user.role === "mentor" ? "default" : "secondary"}
            >
              {user.role === "mentor" ? "Mentor" : "Mentee"}
            </Badge>
          </div>
          
          <p className="text-lg text-muted-foreground mt-1">
            {user.title || user.educationLevel}{user.organization ? ` at ${user.organization}` : ''}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {user.subjectField && (
              <div className="flex items-center gap-1">
                <Book className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.subjectField}</span>
              </div>
            )}
            
            {user.country && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.country}</span>
              </div>
            )}
            
            {user.lastActive && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Active {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
                </span>
              </div>
            )}
            
            {isMentor(user) && user.yearsOfExperience && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.yearsOfExperience} years of experience</span>
              </div>
            )}
            
            {isMentor(user) && user.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{user.rating} ({user.reviewCount} reviews)</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            <Button>Message</Button>
            <Button variant="outline">Schedule Meeting</Button>
            {isMentee(user) && (
              <Button variant="outline">Offer Mentorship</Button>
            )}
            {isMentor(user) && (
              <Button variant="outline">Request Mentorship</Button>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 whitespace-pre-line">{user.bio}</p>
        </CardContent>
      </Card>

      {/* Expertise/Goals Section */}
      <Card>
        <CardContent className="pt-6">
          {isMentor(user) && (
            <>
              <h2 className="text-xl font-semibold mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {user.expertise?.map((item, index) => (
                  <Badge key={index} variant="secondary">{item}</Badge>
                ))}
              </div>
            </>
          )}
          
          {isMentee(user) && (
            <>
              <h2 className="text-xl font-semibold mb-4">Learning Goals</h2>
              <div className="space-y-3">
                {user.goals?.map((goal, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-mentorBlue mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Skills & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests?.map((interest, index) => (
                <Badge key={index} variant="outline">{interest}</Badge>
              ))}
              {!user.interests?.length && <span className="text-muted-foreground">No interests listed</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional sections for mentor/mentee specific info */}
      {isMentor(user) && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-mentorBlue" />
              <span>{user.availabilityHours || "Not specified"}</span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {isMentee(user) && user.lookingFor && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Looking For</h2>
            <div className="space-y-3">
              {user.lookingFor?.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-mentorPurple mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfileDetail;
