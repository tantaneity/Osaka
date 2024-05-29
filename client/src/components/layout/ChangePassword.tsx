import React from 'react';
import AccountLayout from '@/components/layout/AccountLayout';

const ChangePassword: React.FC = () => {
  return (
    <AccountLayout>
      <h2 className='text-2xl mb-4'>Change Password</h2>
      <p>Form to change the password.</p>
    </AccountLayout>
  );
};

export default ChangePassword;
