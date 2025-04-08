
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserProfileCard from "@/components/user/UserProfileCard";
import { useAuth } from "@/context/AuthContext";
import { Mentor, Mentee } from "@/types";
import { mentors as allMentors, mentees as allMentees, channels as allChannels } from "@/data/mockData";
import { ArrowRight, Sparkles, Users, MessageCircle, Calendar } from "lucide-react";

const Index = () => {
  const { currentUser } = useAuth();
  const [topMentors, setTopMentors] = useState<Mentor[]>([]);
  const [topMentees, setTopMentees] = useState<Mentee[]>([]);

  useEffect(() => {
    // Simulate fetching top mentors and mentees
    // In a real app this would come from an API
    setTopMentors(
      allMentors
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10)
    );
    
    setTopMentees(
      allMentees
        .sort((a, b) => {
          // Sort by most recent activity
          if (!a.lastActive || !b.lastActive) return 0;
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        })
        .slice(0, 10)
    );
  }, []);

  // Calculate featured public channels
  const featuredChannels = allChannels
    .filter(channel => channel.isPublic)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-mentorBlue to-mentorPurple">
              Connect. Learn. Grow.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              MentorConnect brings mentors and mentees together in a collaborative environment designed for knowledge sharing and professional development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!currentUser ? (
                <Link to="/signin">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                </Link>
              ) : (
                <Link to={currentUser.role === "mentor" ? "/mentees" : "/mentors"}>
                  <Button size="lg" className="px-8">
                    Find {currentUser.role === "mentor" ? "Mentees" : "Mentors"}
                  </Button>
                </Link>
              )}
              <Link to="/channels">
                <Button variant="outline" size="lg" className="px-8">
                  Join Discussions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for effective mentoring
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-mentorBlue/10 text-mentorBlue">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Expert Mentors</h3>
                  <p className="text-gray-600">
                    Connect with experienced professionals who are passionate about sharing their knowledge.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-mentorPurple/10 text-mentorPurple">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Private Groups</h3>
                  <p className="text-gray-600">
                    Join specialized groups tailored to specific fields or interests for focused learning.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-mentorGreen/10 text-mentorGreen">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Discussion Channels</h3>
                  <p className="text-gray-600">
                    Participate in open channels to share ideas, ask questions, and learn from the community.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-mentorBlue/10 text-mentorBlue">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Scheduling</h3>
                  <p className="text-gray-600">
                    Easily schedule meetings and sessions with integrated Google Calendar and Zoom.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Mentors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Top Mentors</h2>
            <Link to="/mentors">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {topMentors.slice(0, 5).map((mentor) => (
              <UserProfileCard key={mentor.id} user={mentor} showActions={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Mentees Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Mentees</h2>
            <Link to="/mentees">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {topMentees.slice(0, 5).map((mentee) => (
              <UserProfileCard key={mentee.id} user={mentee} showActions={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Join the Conversation</h2>
            <Link to="/channels">
              <Button variant="ghost" className="group">
                Browse Channels
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredChannels.map((channel) => (
              <Link key={channel.id} to={`/channels/${channel.id}`}>
                <Card className="hover:shadow-md transition-shadow duration-300 h-full">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">#{channel.name}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{channel.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-auto">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>Public channel · Join conversation</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-mentorBlue to-mentorPurple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your mentoring journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to share your expertise or seeking guidance, MentorConnect provides the platform you need.
          </p>
          {!currentUser ? (
            <Link to="/signin">
              <Button size="lg" variant="secondary" className="px-8">
                Sign Up Now
              </Button>
            </Link>
          ) : (
            <Link to={currentUser.role === "admin" ? "/admin" : "/profile"}>
              <Button size="lg" variant="secondary" className="px-8">
                Go to {currentUser.role === "admin" ? "Admin Dashboard" : "Your Profile"}
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
