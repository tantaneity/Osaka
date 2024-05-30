import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface LogoutDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ open, setOpen, onLogout }) => {
  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <Dialog open={open} handler={setOpen}>
      <DialogHeader>Logout Confirmation</DialogHeader>
      <DialogBody>
        Are you sure you want to logout?
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="black" onClick={handleLogout}>
          <span>Logout</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LogoutDialog;
