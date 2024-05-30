import React, { useState } from 'react';
import AccountLayout from '@/components/layout/AccountLayout';
import { Button, Input } from '@material-tailwind/react';
import useUserStore from '@/store/UserStore';
import { useGetUserById, useUpdateUser } from '@/hooks/useGetUsers';

const UpdateProfile: React.FC = () => {
  const { user } = useUserStore();
  const { data: userData } = useGetUserById(user?.id);
  const updateUserMutation = useUpdateUser();

  const [formData, setFormData] = useState({
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: user?.email,
    username: user?.username,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateUserMutation.mutateAsync({ id: user?.id || '', userData: formData });
      console.log('User updated successfully!');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <AccountLayout>
      <h2 className='text-2xl mb-4'>Update Profile</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md mx-auto'>
        <Input
          type='text'
          name='first_name'
          label='First Name'
          value={formData.first_name}
          onChange={handleChange}
          className='w-full'
        />
        <Input
          type='text'
          name='last_name'
          label='Last Name'
          value={formData.last_name}
          onChange={handleChange}
          className='w-full'
        />
        <Input
          type='text'
          name='email'
          label='Email'
          value={formData.email}
          onChange={handleChange}
          className='w-full'
        />
        <Input
          type='text'
          name='username'
          label='Username'
          value={formData.username}
          onChange={handleChange}
          className='w-full'
        />
        <Button type='submit' fullWidth>
          Update Profile
        </Button>
      </form>
    </AccountLayout>
  );
};

export default UpdateProfile;
