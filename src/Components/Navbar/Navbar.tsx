import logo from "./logo.svg";
import { Grip, BellDot, CircleUserRound, FileCog } from 'lucide-react';

interface Props {}

const  Navbar = (props: Props) => {
  return (
    <nav className="relative w-full p-6 shadow-lg" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <img src={logo} alt="Company Logo" className="h-8" />
        </div>
        <div className="flex flex-1 justify-center items-center space-x-6">
          <a href="" className="text-[#FF3A31] hover:text-darkBlue flex items-center">
            <FileCog color="#FF3A31" /> ITEMS
            </a>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-black-500"><BellDot /></span>
          <span className="text-black-500"><Grip/></span>
          <span className="text-black-500"><CircleUserRound/></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;