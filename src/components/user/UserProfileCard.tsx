
import { Link } from "react-router-dom";
import { User, Mentee } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface UserProfileCardProps {
  user: User;
  showActions?: boolean;
}

const UserProfileCard = ({ user, showActions = true }: UserProfileCardProps) => {
  // Type guard to check if user is a mentee
  const isMentee = (user: User): user is Mentee => user.role === "mentee";

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.profilePic || "https://via.placeholder.com/100"}
              alt={`${user.name}'s profile`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <span 
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-green-400"
              title="Online"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <Badge variant={user.role === "mentor" ? "default" : "secondary"}>
                {user.role === "mentor" ? "Mentor" : "Mentee"}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {user.title || (isMentee(user) ? user.educationLevel : '')}{user.organization ? `, ${user.organization}` : ''}
            </p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {user.subjectField && (
                <Badge variant="outline">{user.subjectField}</Badge>
              )}
              {user.country && (
                <Badge variant="outline">{user.country}</Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm line-clamp-2">{user.bio}</p>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="bg-muted/30 px-6 py-3 flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Active {user.lastActive ? formatDistanceToNow(new Date(user.lastActive), { addSuffix: true }) : 'recently'}
          </div>
          
          <div className="flex space-x-2">
            <Link to={`/profile/${user.id}`}>
              <Button variant="outline" size="sm">View Profile</Button>
            </Link>
            <Link to={`/message/${user.id}`}>
              <Button size="sm">Message</Button>
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default UserProfileCard;
