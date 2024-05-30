import Review from "@/types/review/Review";
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
  
  interface ReviewListProps {
    reviews: Review[];
  }
  
  export function ReviewList({ reviews }: ReviewListProps) {
    return (
      <Card className="w-96">
        <List>
          {reviews.map((review) => (
            <ListItem key={review.id}>
              <ListItemPrefix>
                <Avatar variant="circular" alt={review.user.username} src="https://i.sstatic.net/l60Hf.png" />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {review.user.username}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {review.comment}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {`Rating: ${review.rating} / 5`}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                {`Posted on: ${new Date(review.datePosted).toLocaleDateString()} at ${new Date(review.datePosted).toLocaleTimeString()}`}

                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    );
  }
  