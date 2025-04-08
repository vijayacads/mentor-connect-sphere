
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserProfileDetail from "@/components/user/UserProfileDetail";
import { User } from "@/types";
import { mentors, mentees } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>(false);

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUser = async () => {
      setIsLoading(true);
      
      try {
        // If no ID is provided, show the current user's profile
        if (!id && currentUser) {
          setUser(currentUser);
          setIsCurrentUserProfile(true);
          return;
        }
        
        // Look for user in mentors and mentees
        const profileId = id || (currentUser?.id ?? "");
        const allUsers = [...mentors, ...mentees];
        const foundUser = allUsers.find(u => u.id === profileId);
        
        if (foundUser) {
          setUser(foundUser);
          // Check if this is the current user's profile
          setIsCurrentUserProfile(currentUser?.id === foundUser.id);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, currentUser]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-10 w-2/3 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p>The profile you're looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {isCurrentUserProfile && (
          <Tabs defaultValue="profile" className="mb-8">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <UserProfileDetail user={user} />
            </TabsContent>
            
            <TabsContent value="edit">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                  <p className="text-muted-foreground">
                    This feature will be implemented soon. Here you'll be able to edit your profile information, update your bio, and manage your expertise or goals.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <p className="text-muted-foreground">
                    This feature will be implemented soon. Here you'll be able to change your account settings, notification preferences, and privacy options.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
        
        {!isCurrentUserProfile && (
          <UserProfileDetail user={user} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
