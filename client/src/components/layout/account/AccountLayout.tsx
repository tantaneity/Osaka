import React, { ReactNode } from 'react';
import { Card } from '@material-tailwind/react';

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <Card className='flex-1 p-2 sm:p-4 min-h-screen'>
      {children}
    </Card>
  );
};

export default AccountLayout;
