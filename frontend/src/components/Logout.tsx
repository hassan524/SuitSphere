import axios from 'axios';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useContext } from 'react';
import AppContext from '@/context/context';

export const logout = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

const LogOut = () => {
  const { IsLogOutOpen, SetIsLogOutOpen } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      const resData = await logout();
      toast.success(resData.message || "Logged out successfully");
      SetIsLogOutOpen(false); // Close the modal after logout
      window.location.reload(); // Refresh the page after logout
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <AlertDialog open={IsLogOutOpen} onOpenChange={SetIsLogOutOpen}>
      <AlertDialogContent className="sm:max-w-[425px] flex flex-col gap-10 w-[90vw] sm:rounded-sm rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Log Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2">
          <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogOut;
