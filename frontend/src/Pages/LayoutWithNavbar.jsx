import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* renders the child route */}
    </>
  );
}

export default LayoutWithNavbar;
