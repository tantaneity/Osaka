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
  title?: string;
  bodyText?: string;
  cancelText?: string;
  deleteText?: string;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  open,
  setOpen,
  onDeleteProduct,
  title = "Delete Confirmation",
  bodyText = "Are you sure you want to delete this product?",
  cancelText = "Cancel",
  deleteText = "Delete",
}) => {
  const handleDeleteProduct = () => {
    onDeleteProduct();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} handler={setOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        {bodyText}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>{cancelText}</span>
        </Button>
        <Button variant="gradient" color="black" onClick={handleDeleteProduct}>
          <span>{deleteText}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteProductDialog;
