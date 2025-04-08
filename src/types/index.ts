
export type UserRole = "mentor" | "mentee" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePic?: string;
  bio?: string;
  subjectField?: string;
  country?: string;
  lastActive?: Date;
  skills?: string[];
  interests?: string[];
  linkedInUrl?: string;
  title?: string;
  organization?: string;
  yearsOfExperience?: number;
  createdAt: Date;
}

export interface Mentor extends User {
  role: "mentor";
  expertise: string[];
  availabilityHours?: string;
  rating?: number;
  reviewCount?: number;
}

export interface Mentee extends User {
  role: "mentee";
  goals?: string[];
  lookingFor?: string[];
  educationLevel?: string;
}

export interface Admin extends User {
  role: "admin";
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: string[]; // User IDs
  mentors: string[]; // Mentor IDs
  mentees: string[]; // Mentee IDs
  createdAt: Date;
  createdBy: string; // Admin ID
  isPublic: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  members?: string[]; // User IDs
  groupId?: string; // If part of a group
  createdAt: Date;
  createdBy: string; // User ID
}

export interface Message {
  id: string;
  content: string;
  channelId: string;
  authorId: string;
  authorName: string;
  authorProfilePic?: string;
  createdAt: Date;
  updatedAt?: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: "image" | "file" | "link";
  url: string;
  name: string;
  size?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  channelId?: string;
  groupId?: string;
  createdBy: string;
  attendees: string[];
  zoomLink?: string;
}

export interface FilterOptions {
  subjectField?: string;
  country?: string;
  lastActive?: "today" | "this_week" | "this_month" | "all";
}
