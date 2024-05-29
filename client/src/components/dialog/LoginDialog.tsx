import React, { useState, useEffect } from 'react';
import { Dialog, Card, CardBody, CardFooter, Typography, Checkbox, Button, IconButton } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import useUserStore from '@/store/UserStore';
import toast, { Toaster } from 'react-hot-toast';
import InputField from '../input/InputField ';
import { useGetUserByUsername } from '@/hooks/useGetUsers';

interface LoginDialogProps {
  open: boolean;
  handleOpen: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, handleOpen }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  
  // Registration fields
  const [regFirstName, setRegFirstName] = useState<string>('');
  const [regLastName, setRegLastName] = useState<string>('');
  const [regUsername, setRegUsername] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  
  // Login fields
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  
  const { registrate, login, isLoading } = useUserStore();
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
    if (!isLoading) {
      setIsButtonLoading(false);
    }
  }, [isLoading]);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setRegFirstName('');
    setRegLastName('');
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
    setLoginUsername('');
    setLoginPassword('');
    setErrors({});
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};
  
    if (isSignUp) {
      if (!regFirstName.trim()) {
        newErrors.regFirstName = 'First name is required';
        valid = false;
      }
      if (!regLastName.trim()) {
        newErrors.regLastName = 'Last name is required';
        valid = false;
      }
      if (!regUsername.trim()) {
        newErrors.regUsername = 'Username is required';
        valid = false;
      } else if (regUsername.length < 3) { // Example: Minimum 3 characters for username
        newErrors.regUsername = 'Username must be at least 3 characters long';
        valid = false;
      }
      if (!regEmail.trim()) {
        newErrors.regEmail = 'Email is required';
        valid = false;
      } else if (!validateEmail(regEmail)) {
        newErrors.regEmail = 'Email is not valid';
        valid = false;
      }
      if (!regPassword.trim()) {
        newErrors.regPassword = 'Password is required';
        valid = false;
      } else if (regPassword.length < 8) { // Example: Minimum 8 characters for password
        newErrors.regPassword = 'Password must be at least 8 characters long';
        valid = false;
      }
    } else {
      if (!loginUsername.trim()) {
        newErrors.loginUsername = 'Username is required';
        valid = false;
      } else if (loginUsername.length < 3) { // Example: Minimum 3 characters for username
        newErrors.loginUsername = 'Username must be at least 3 characters long';
        valid = false;
      }
      if (!loginPassword.trim()) {
        newErrors.loginPassword = 'Password is required';
        valid = false;
      } else if (loginPassword.length < 8) { // Example: Minimum 8 characters for password
        newErrors.loginPassword = 'Password must be at least 8 characters long';
        valid = false;
      }
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  const { data: existingUser } = useGetUserByUsername(isSignUp ? regUsername : loginUsername);

  const handleSignInSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsButtonLoading(true);
      if (isSignUp) {
        if (existingUser) {
          toast.error("Username already exists.");
          setIsButtonLoading(false);
          return;
        }
        await registrate({ first_name: regFirstName, last_name: regLastName, username: regUsername, email: regEmail, password: regPassword });
        toast.success("Successful registration!");
        toggleForm(); // Switch to login form after successful registration
      } else {
        if (!existingUser) {
          toast.error("User not found!");
          setIsButtonLoading(false);
          return;
        }
        await login({ username: loginUsername, password: loginPassword });
        
        if (useUserStore.getState().isAuth) {
          handleOpen();
        } else {
          toast.error("Username or password is wrong! Try again!");
        }
      }
      
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Error message:", error.response.data.message);
      } else {
        console.log("An error occurred:", error.message);
      }
    } finally {
      setIsButtonLoading(false);
    }
  };

  const isFormComplete = isSignUp
    ? regFirstName && regLastName && regUsername && regEmail && regPassword
    : loginUsername && loginPassword;

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Toaster/>
      <Card className="mx-auto w-full max-w-[24rem]">
        <IconButton variant="text" onClick={handleOpen} className="m-2">
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
            {isSignUp ? 'Enter your details to Sign Up.' : 'Enter your username and password to Sign In.'}
          </Typography>
          {isSignUp && (
            <>
              <InputField label="First Name" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)} error={errors.regFirstName} />
              <InputField label="Last Name" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} error={errors.regLastName} />
              <InputField label="Username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} error={errors.regUsername} />
              <InputField label="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} error={errors.regEmail} />
              <InputField label="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} type="password" error={errors.regPassword} />
            </>
          )}
          {!isSignUp && (
            <>
              <InputField label="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} error={errors.loginUsername} />
              <InputField label="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" error={errors.loginPassword} />
              <div className="-ml-2.5 -mt-3">
                <Checkbox
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </div>
            </>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            onClick={handleSignInSignUp}
            fullWidth
            disabled={isButtonLoading || !isFormComplete}
            loading={isButtonLoading}
          >
            {isButtonLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
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

export default LoginDialog;
