import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface DeleteProductDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteProduct: () => void;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({ open, setOpen, onDeleteProduct }) => {
  const handleDeleteProduct = () => {
    onDeleteProduct();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <Dialog open={open} handler={setOpen}>
      <DialogHeader>Delete Confirmation</DialogHeader>
      <DialogBody>
        Are you sure you want to delete this product?
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
        <Button variant="gradient" color="black" onClick={handleDeleteProduct}>
          <span>Delete</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteProductDialog;
