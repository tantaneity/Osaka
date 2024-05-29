import React from 'react';
import AccountLayout from '@/components/layout/AccountLayout';

const UpdateProfile: React.FC = () => {
  return (
    <AccountLayout>
      <h2 className='text-2xl mb-4'>Update Profile</h2>
      <p>Form to update profile details.</p>
    </AccountLayout>
  );
};

export default UpdateProfile;
