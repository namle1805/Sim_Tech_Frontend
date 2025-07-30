import { useLocation } from "react-router-dom";
import {
  FileCog,
  FilePen,
  FileText,
  OctagonAlert,
  UsersRound,
  Warehouse,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    { href: "/", icon: FileCog, label: "Item" },
    { href: "/template", icon: FileText, label: "Template" },
    { href: "/techlog-management", icon: FilePen, label: "Techlog Management" },
    { href: "/user", icon: UsersRound, label: "User" },
    {
      href: "/warehouse-management",
      icon: Warehouse,
      label: "Warehouse Management",
    },
    {
      href: "/report-management",
      icon: OctagonAlert,
      label: "Report Management",
    },
  ];

  return (
    <>
      {!collapsed ? (
        <div className="min-h-[1300] w-[200px] text-[#65676b] flex flex-col border-r-2 border-gray-200">
          {navItems.map(({ href, icon: Icon, label }) => (
            <NavLink
              key={href}
              to={href}
              className={`flex items-center gap-x-5 p-5 rounded
              hover:bg-gray-200
              ${currentPath === href ? "bg-gray-300" : ""}`}
            >
              <div className="w-[15%] flex justify-center">
                <Icon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-lg font-bold">{label}</span>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="min-h-[1300]  w-[70px] text-[#65676b] flex flex-col border-r-2 border-gray-200 ">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Tooltip
              key={href}
              title={label}
              placement="right"
              arrow
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: "white",
                    color: "#65676b",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    boxShadow: 3,
                  },
                },
                arrow: {
                  sx: {
                    color: "white",
                  },
                },
              }}
            >
              <NavLink
                to={href}
                className={`flex items-center justify-center p-5 rounded
        hover:bg-gray-200
        ${currentPath === href ? "bg-gray-300" : ""}`}
              >
                <Icon className="w-6 h-6 stroke-[1.5]" />
              </NavLink>
            </Tooltip>
          ))}
        </div>
      )}
    </>
  );
};

export default Sidebar;
