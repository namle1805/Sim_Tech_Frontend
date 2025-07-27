import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;