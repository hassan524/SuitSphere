import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import LogOut from "@/components/Logout";

const MainLayout = () => {

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex flex-col relative sm:top-[18vh] top-[8vh]">
        <Outlet />
        <Toaster position="bottom-right" />
        <LogOut />
        <Footer />
      </div>

    </>
  );
};

export default MainLayout;
