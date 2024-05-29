import React from 'react';
import { useParams } from 'react-router-dom';
import AccountNav from '@/components/nav/AccountNav';
import MyOrders from '@/components/layout/MyOrders';
import UpdateProfile from '@/components/layout/UpdateProfile';
import ChangePassword from '@/components/layout/ChangePassword';

const AccountPage: React.FC = () => {
  const { navigate } = useParams<{ navigate: string }>();

  const renderLayout = () => {
    switch (navigate) {
      case 'my-orders':
        return <MyOrders />;
      case 'update-profile':
        return <UpdateProfile />;
      case 'change-password':
        return <ChangePassword />;
      default:
        return <MyOrders />; 
    }
  };

  return (
    <>
    <div className='m-10 flex space-x-4'>
      {navigate && <AccountNav navigate={navigate} />}
      {renderLayout()}
    </div>
    </>
    
  );
};

export default AccountPage;
