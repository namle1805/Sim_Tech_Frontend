import { useLocation } from "react-router-dom";
import {
  FileCog,
  FilePen,
  FileText,
  OctagonAlert,
  UsersRound,
  Warehouse,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
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
    <div className="h-screen w-[15%] text-[#65676b] flex flex-col border-r-2 border-gray-200 shadow-lg">
      <nav className="flex-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            className={`flex items-center gap-x-5 p-5 rounded 
              hover:bg-gray-300
              ${currentPath === href ? "bg-gray-300" : ""}`}
          >
            <Icon className="w-10 h-10 stroke-[1.5] w-[20%]" />
            <span className="text-lg font-bold w-[80%]">{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
