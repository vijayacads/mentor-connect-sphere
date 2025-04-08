
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Mentor, Mentee, Admin } from "../types";
import { adminUser, mentors, mentees } from "../data/mockData";

type AuthUser = User | null;

interface AuthContextType {
  currentUser: AuthUser;
  isLoading: boolean;
  isAdmin: boolean;
  isMentor: boolean;
  isMentee: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if there's a saved user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("mentor-connect-user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock Google Sign-In - in a real app, this would use actual Google OAuth
  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, randomly select a user type or use admin credentials
      const email = prompt("Enter your email for simulation (or use VigyanShaala@gmail.com for admin):");
      const password = prompt("Enter password (use 12345678 for admin):");
      
      if (!email) {
        throw new Error("Email is required");
      }
      
      // Check for admin login
      if (email.toLowerCase() === "vigyanshaala@gmail.com" && password === "12345678") {
        setCurrentUser(adminUser);
        localStorage.setItem("mentor-connect-user", JSON.stringify(adminUser));
        return;
      }
      
      // Simulate different user types for demo
      // In a real app, this would validate against real user data
      const userTypes = ["mentor", "mentee"];
      const randomType = userTypes[Math.floor(Math.random() * userTypes.length)];
      
      let user: User | null = null;
      
      if (randomType === "mentor") {
        user = mentors[Math.floor(Math.random() * mentors.length)];
      } else {
        user = mentees[Math.floor(Math.random() * mentees.length)];
      }
      
      // Update the email to match what the user entered
      user = { ...user, email: email };
      
      setCurrentUser(user);
      localStorage.setItem("mentor-connect-user", JSON.stringify(user));
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentUser(null);
      localStorage.removeItem("mentor-connect-user");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = !!currentUser && currentUser.role === "admin";
  const isMentor = !!currentUser && currentUser.role === "mentor";
  const isMentee = !!currentUser && currentUser.role === "mentee";

  const value = {
    currentUser,
    isLoading,
    isAdmin,
    isMentor,
    isMentee,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
