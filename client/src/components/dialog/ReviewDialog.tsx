import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Button,
  Typography,
  Rating,
  Select,
  Option,
} from "@material-tailwind/react";
import Review from '@/types/review/Review';

interface ReviewDialogProps {
  open: boolean;
  handleOpen: () => void;
  reviews: Review[];
}

export function ReviewDialog({ open, handleOpen, reviews }: ReviewDialogProps) {
  const [sortOption, setSortOption] = useState<string>('newest');

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
    } else if (sortOption === 'oldest') {
      return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
    } else if (sortOption === 'highest') {
      return b.rating - a.rating;
    } else if (sortOption === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Reviews</DialogHeader>
      <DialogBody divider>
        <div className="mb-4">
          <Select
            label="Sort by"
            value={sortOption}
            onChange={(e) => setSortOption(e || 'newest')}
          >
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="highest">Highest Rating</Option>
            <Option value="lowest">Lowest Rating</Option>
          </Select>
        </div>
        <List>
          {sortedReviews.map((review) => (
            <ListItem key={review.id}>
              <ListItemPrefix>
                <Avatar variant="circular" alt={review.user.username} src="https://i.pinimg.com/564x/52/c0/e0/52c0e0645cb20c53e8f9bff06ad9d5ab.jpg" />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {review.user.username}
                </Typography>
                <Rating value={review.rating} readonly />
                <Typography variant="small" color="gray" className="font-normal">
                  {review.comment}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {`Posted on: ${new Date(review.datePosted).toLocaleDateString()} at ${new Date(review.datePosted).toLocaleTimeString()}`}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
