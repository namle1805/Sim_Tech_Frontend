import logo from "./logo.svg";
import { useLocation } from "react-router-dom";
import {
  Grip,
  BellDot,
  CircleUserRound,
  FileCog,
  FilePen,
  FileText,
  OctagonAlert,
  UsersRound,
  Warehouse,
  PanelRight,
} from "lucide-react";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
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

  const currentItem = navItems.find((item) => currentPath === item.href);

  return (
    <nav
      className="relative w-full p-6 shadow-lg bg-white"
      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            onClick={toggleSidebar}
            className="p-3 rounded-full shadow-lg bg-white flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #ffffff 40%, #d4d4d4 100%)",
              width: "50px",
              height: "50px",
            }}
          >
            <PanelRight className="text-black w-6 h-6 transition-opacity duration-300 hover:opacity-40 cursor-pointer" />
          </div>
          <img
            src={logo}
            alt="Company Logo"
            className="h-8 transition-opacity duration-300 hover:opacity-50 cursor-pointer"
          />
        </div>
        <div className="flex flex-1 justify-center items-center">
          {currentItem && (
            <a
              href={currentItem.href}
              className="flex items-center font-bold text-lg space-x-4 text-[#FF3A31]"
            >
              <currentItem.icon color="#FF3A31" />
              <span>{currentItem.label}</span>
            </a>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-200 transition duration-200">
            <BellDot />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 transition duration-200">
            <Grip />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 transition duration-200">
            <CircleUserRound />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
