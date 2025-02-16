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

const LogOut = () => {
  const { IsLogOutOpen, SetIsLogOutOpen } = useContext(AppContext);

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
          <AlertDialogAction>Log Out</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogOut;
