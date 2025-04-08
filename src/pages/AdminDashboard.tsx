
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  UsersRound, 
  Users, 
  UserPlus, 
  Settings, 
  MessageSquare, 
  Trash2, 
  EditIcon,
  UserCheck,
  UserX
} from "lucide-react";
import { mentors, mentees, groups } from "@/data/mockData";
import { User as UserType, Mentor, Mentee, Group } from "@/types";

const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  
  // If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  const [mentorsList, setMentorsList] = useState<Mentor[]>(mentors);
  const [menteesList, setMenteesList] = useState<Mentee[]>(mentees);
  const [groupsList, setGroupsList] = useState<Group[]>(groups);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Stats for dashboard
  const totalMentors = mentorsList.length;
  const totalMentees = menteesList.length;
  const totalGroups = groupsList.length;
  const totalUsers = totalMentors + totalMentees;

  const filterItems = (items: UserType[], term: string) => {
    if (!term) return items;
    
    const lowerTerm = term.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(lowerTerm) || 
      item.email.toLowerCase().includes(lowerTerm) ||
      item.subjectField?.toLowerCase().includes(lowerTerm) ||
      item.country?.toLowerCase().includes(lowerTerm)
    );
  };

  const handleDeleteUser = (id: string, role: "mentor" | "mentee") => {
    if (role === "mentor") {
      setMentorsList(mentorsList.filter(mentor => mentor.id !== id));
    } else {
      setMenteesList(menteesList.filter(mentee => mentee.id !== id));
    }
  };

  const handleDeleteGroup = (id: string) => {
    setGroupsList(groupsList.filter(group => group.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-mentorBlue/10">
                <UsersRound className="h-6 w-6 text-mentorBlue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{totalUsers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-mentorPurple/10">
                <User className="h-6 w-6 text-mentorPurple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mentors</p>
                <h3 className="text-2xl font-bold">{totalMentors}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-mentorGreen/10">
                <Users className="h-6 w-6 text-mentorGreen" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mentees</p>
                <h3 className="text-2xl font-bold">{totalMentees}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-blue-400/10">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Groups</p>
                <h3 className="text-2xl font-bold">{totalGroups}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="mentors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="mentees">Mentees</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Mentors Tab */}
        <TabsContent value="mentors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Manage Mentors</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Mentor
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Mentor</DialogTitle>
                      <DialogDescription>
                        Create a new mentor profile. They will receive an email invitation to complete their profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Name
                        </label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <Input id="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="subject" className="text-right">
                          Subject
                        </label>
                        <Input id="subject" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Mentor</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                View and manage all mentor profiles. You can add, edit, or remove mentors.
              </CardDescription>
              <div className="mt-4">
                <Input
                  placeholder="Search mentors by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead>Subject Field</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterItems(mentorsList, searchTerm).map((mentor) => (
                      <TableRow key={mentor.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {mentor.profilePic ? (
                              <img 
                                src={mentor.profilePic} 
                                alt={mentor.name} 
                                className="w-8 h-8 rounded-full mr-2"
                              />
                            ) : (
                              <User className="h-8 w-8 rounded-full mr-2 p-1 border" />
                            )}
                            <div>
                              <p>{mentor.name}</p>
                              <p className="text-sm text-muted-foreground">{mentor.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{mentor.subjectField || "Not specified"}</TableCell>
                        <TableCell>{mentor.country || "Not specified"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <EditIcon className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteUser(mentor.id, "mentor")}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filterItems(mentorsList, searchTerm).length} of {mentorsList.length} mentors
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Mentees Tab */}
        <TabsContent value="mentees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Manage Mentees</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Mentee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Mentee</DialogTitle>
                      <DialogDescription>
                        Create a new mentee profile. They will receive an email invitation to complete their profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="mentee-name" className="text-right">
                          Name
                        </label>
                        <Input id="mentee-name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="mentee-email" className="text-right">
                          Email
                        </label>
                        <Input id="mentee-email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="mentee-subject" className="text-right">
                          Subject
                        </label>
                        <Input id="mentee-subject" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Mentee</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                View and manage all mentee profiles. You can add, edit, or remove mentees.
              </CardDescription>
              <div className="mt-4">
                <Input
                  placeholder="Search mentees by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead>Subject Field</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterItems(menteesList, searchTerm).map((mentee) => (
                      <TableRow key={mentee.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {mentee.profilePic ? (
                              <img 
                                src={mentee.profilePic} 
                                alt={mentee.name} 
                                className="w-8 h-8 rounded-full mr-2"
                              />
                            ) : (
                              <User className="h-8 w-8 rounded-full mr-2 p-1 border" />
                            )}
                            <div>
                              <p>{mentee.name}</p>
                              <p className="text-sm text-muted-foreground">{mentee.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{mentee.subjectField || "Not specified"}</TableCell>
                        <TableCell>{mentee.country || "Not specified"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <EditIcon className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteUser(mentee.id, "mentee")}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filterItems(menteesList, searchTerm).length} of {menteesList.length} mentees
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Manage Groups</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UsersRound className="h-4 w-4 mr-2" />
                      Create Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Create New Group</DialogTitle>
                      <DialogDescription>
                        Create a closed group for mentors and mentees. Group members will have access to a private channel.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="group-name" className="text-right">
                          Group Name
                        </label>
                        <Input id="group-name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="group-description" className="text-right">
                          Description
                        </label>
                        <Input id="group-description" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="mentors" className="text-right">
                          Mentors
                        </label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select mentors" />
                          </SelectTrigger>
                          <SelectContent>
                            {mentorsList.map((mentor) => (
                              <SelectItem key={mentor.id} value={mentor.id}>
                                {mentor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="mentees" className="text-right">
                          Mentees
                        </label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select mentees" />
                          </SelectTrigger>
                          <SelectContent>
                            {menteesList.map((mentee) => (
                              <SelectItem key={mentee.id} value={mentee.id}>
                                {mentee.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Group</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Create and manage closed mentoring groups. Each group gets its own private channel.
              </CardDescription>
              <div className="mt-4">
                <Input
                  placeholder="Search groups by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Group Name</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupsList
                      .filter(group => 
                        !searchTerm || 
                        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        group.description?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((group) => (
                        <TableRow key={group.id}>
                          <TableCell className="font-medium">
                            {group.name}
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {group.description}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <UserCheck className="h-3 w-3" />
                                {group.mentors.length}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <UserX className="h-3 w-3" />
                                {group.mentees.length}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(group.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <EditIcon className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteGroup(group.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Configure global settings for the MentorConnect platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Account Settings</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="admin-email" className="text-right text-sm">
                      Admin Email
                    </label>
                    <Input 
                      id="admin-email" 
                      value="VigyanShaala@gmail.com" 
                      className="col-span-3" 
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="admin-password" className="text-right text-sm">
                      Admin Password
                    </label>
                    <Input 
                      id="admin-password" 
                      type="password"
                      value="12345678" 
                      className="col-span-3" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Calendar & Meetings</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="zoom-email" className="text-right text-sm">
                      Zoom Email
                    </label>
                    <Input 
                      id="zoom-email" 
                      placeholder="Enter Zoom account email"
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="zoom-key" className="text-right text-sm">
                      Zoom API Key
                    </label>
                    <Input 
                      id="zoom-key" 
                      placeholder="Enter Zoom API key" 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="zoom-secret" className="text-right text-sm">
                      Zoom API Secret
                    </label>
                    <Input 
                      id="zoom-secret" 
                      placeholder="Enter Zoom API secret"
                      className="col-span-3" 
                      type="password"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Google Calendar Integration</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="google-client-id" className="text-right text-sm">
                      Client ID
                    </label>
                    <Input 
                      id="google-client-id" 
                      placeholder="Enter Google client ID"
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="google-client-secret" className="text-right text-sm">
                      Client Secret
                    </label>
                    <Input 
                      id="google-client-secret" 
                      placeholder="Enter Google client secret" 
                      className="col-span-3" 
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Settings className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
