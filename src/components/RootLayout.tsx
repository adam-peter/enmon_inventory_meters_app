import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "./ui/toaster";

const RootLayout = () => {
  return (
    <div className="mx-2 flex h-screen flex-col sm:mx-10">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default RootLayout;
