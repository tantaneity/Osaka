import React, { ReactNode } from 'react';
import { Card } from '@material-tailwind/react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Card className='h-screen mx-auto grid text-center px-8'>
      {children}
    </Card>
  );
};

export default DashboardLayout;
