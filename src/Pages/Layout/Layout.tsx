import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  return (
    <div className="h-screen flex flex-col">
      <div>
        <Navbar toggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)} />
      </div>
      <div className="flex">
        <Sidebar collapsed={isSidebarCollapsed} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
