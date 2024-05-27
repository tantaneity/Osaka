import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
  Rating,
  Typography,
} from "@material-tailwind/react";

interface ReviewFormDialogProps {
  open: boolean;
  handleOpen: () => void;
  onSubmit: (review: { user: string; rating: number; comment: string }) => void;
}

const ReviewFormDialog: React.FC<ReviewFormDialogProps> = ({ open, handleOpen, onSubmit }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit({ user, rating, comment });
    setUser('');
    setRating(0);
    setComment('');
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Add Review</DialogHeader>
      <DialogBody divider>
        <div className="mb-4">
          <Input
            label="User Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Typography>Rating</Typography>
          <Rating value={rating} onChange={(value) => setRating(value)} />
        </div>
        <div className="mb-4">
          <Textarea
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen}>
          Cancel
        </Button>
        <Button variant="gradient" color="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReviewFormDialog;
