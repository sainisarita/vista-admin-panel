
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";
import TopBar from "../navigation/TopBar";
import { useState } from "react";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname.split("/")[1];
    if (!path || path === "dashboard") return "Dashboard";
    
    // Convert route to title case (e.g., 'sales-reports' -> 'Sales Reports')
    return path
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar 
          title={getPageTitle()} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
