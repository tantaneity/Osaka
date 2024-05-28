import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Rating, Textarea } from "@material-tailwind/react";
import { UserShort } from '@/types/users/UserShort';
import useUserStore from '@/store/UserStore';

interface ReviewFormDialogProps {
    open: boolean;
    handleOpen: () => void;
    onSubmit: (review: { user: UserShort; rating: number; comment: string }) => void;
}

const ReviewFormDialog: React.FC<ReviewFormDialogProps> = ({ open, handleOpen, onSubmit }) => {
    const { user } = useUserStore();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        if (user && rating > 0 && comment.trim() !== '') {
            onSubmit({ user, rating, comment });
            setRating(0);
            setComment('');
            handleOpen();
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="md">
            <DialogHeader>Submit a Review</DialogHeader>
            <DialogBody>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Rating value={rating} onChange={(value) => setRating(value)} />
                        <span>{rating}/5</span>
                    </div>
                    <Textarea
                        label="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-2">
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
