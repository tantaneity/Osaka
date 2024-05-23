import React, { useState } from 'react';
import { Dialog, Card, CardBody, CardFooter, Typography, Input, Checkbox, Button, IconButton } from '@material-tailwind/react'; // Adjust the import based on your library setup
import { XMarkIcon } from '@heroicons/react/24/solid'

interface LoginDialogProps {
  open: boolean;
  handleOpen: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, handleOpen }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <IconButton variant="text" onClick={handleOpen} className='m-2'>
            <XMarkIcon className='h-6 w-6'/>
        </IconButton>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            {isSignUp ? 'Enter your details to Sign Up.' : 'Enter your email and password to Sign In.'}
          </Typography>
          {isSignUp && (
            <>
              <Typography className="-mb-2" variant="h6">
                Your Name
              </Typography>
              <Input label="Name" size="lg" />
            </>
          )}
          <Typography className="-mb-2" variant="h6">
            Your Email
          </Typography>
          <Input label="Email" size="lg" />
          <Typography className="-mb-2" variant="h6">
            Your Password
          </Typography>
          <Input label="Password" size="lg" />
          {!isSignUp && (
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleOpen} fullWidth>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <Typography
              as="a"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold cursor-pointer"
              onClick={toggleForm}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </Dialog>
  );
};