import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex flex-col relative sm:top-[18vh] top-[8vh]">
        <Outlet />
        <Toaster position="bottom-right" />
        <Footer />
      </div>

    </>
  );
};

export default MainLayout;
