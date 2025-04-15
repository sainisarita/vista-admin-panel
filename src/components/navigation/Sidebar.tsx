
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  ListFilter, 
  MessageSquareQuote, 
  BarChart3,
  LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/users", icon: Users },
    { name: "Services", href: "/services", icon: ShoppingBag },
    { name: "Categories", href: "/categories", icon: ListFilter },
    { name: "Testimonials", href: "/testimonials", icon: MessageSquareQuote },
    { name: "Sales Reports", href: "/sales-reports", icon: BarChart3 },
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 h-screen flex flex-col",
        open ? "w-64" : "w-20"
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-center h-16">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjEyOCIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzEyNF8xMikiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xMjRfMTIiIHgxPSIyOS41IiB5MT0iMjguNSIgeDI9IjEyOCIgeTI9IjIxMi41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM3ODc1RkYiLz4KPHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiM5ODVBRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjREE3MUZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==" 
              alt="Logo" 
              className="h-8 w-8"
            />
          </div>
          {open && (
            <span className="text-xl font-bold text-primary">Kuber</span>
          )}
        </Link>
      </div>

      {/* User Profile */}
      <div className={cn(
        "px-4 py-5 border-t border-b border-gray-200 flex items-center",
        open ? "justify-start" : "justify-center"
      )}>
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user?.avatar || "https://via.placeholder.com/40"}
            alt={user?.name || "User Profile"}
          />
        </div>
        {open && (
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs font-medium text-gray-500">Admin</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.name}>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                          isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-100",
                          !open && "justify-center"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", !open && "mx-auto")} />
                        {open && <span className="ml-3">{item.name}</span>}
                      </Link>
                    </TooltipTrigger>
                    {!open && (
                      <TooltipContent side="right">
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-gray-200">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={logout}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors w-full",
                  !open && "justify-center"
                )}
              >
                <LogOut className={cn("h-5 w-5", !open && "mx-auto")} />
                {open && <span className="ml-3">Logout</span>}
              </button>
            </TooltipTrigger>
            {!open && (
              <TooltipContent side="right">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
