
import { useAuth } from "../../context/AuthContext";
import { Menu, Search, BellIcon, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side: Menu toggle and page title */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center space-x-1 text-gray-500">
            <Link to="/dashboard" className="hover:text-primary">
              <Home className="h-4 w-4" />
            </Link>
            <span>&gt;</span>
            <h1 className="text-lg font-medium text-gray-800">{title}</h1>
          </div>
          
          <div className="md:hidden">
            <h1 className="text-lg font-medium text-gray-800">{title}</h1>
          </div>
        </div>

        {/* Center: Search bar (hidden on mobile) */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 text-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right side: User profile */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center">
            <img
              src={user?.avatar || "https://via.placeholder.com/40"}
              alt={user?.name || "User Profile"}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline-block">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
