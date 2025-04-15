
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember = false): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation for demo purposes
        if (email === "admin@example.com" && password === "admin123") {
          const user = {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            avatar: "/lovable-uploads/2d4389a7-f6ba-4812-920b-16ac59c9c907.png", 
          };
          
          setUser(user);
          
          if (remember) {
            localStorage.setItem("admin_user", JSON.stringify(user));
          }
          
          toast.success("Login successful");
          setIsLoading(false);
          resolve(true);
        } else {
          toast.error("Invalid email or password");
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
