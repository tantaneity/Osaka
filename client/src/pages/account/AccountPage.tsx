import React from 'react';
import { useParams } from 'react-router-dom';
import AccountNav from '@/components/nav/AccountNav';
import MyOrders from '@/components/layout/account/MyOrders';
import UpdateProfile from '@/components/layout/account/UpdateProfile';
import ChangePassword from '@/components/layout/account/ChangePassword';
import AuthOnly from '@/access/AuthOnly';
import useUserStore from '@/store/UserStore';
import { Spinner } from '@material-tailwind/react';

const AccountPage: React.FC = () => {
  const { navigate } = useParams<{ navigate: string }>();
  const {isLoading} = useUserStore()
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }
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
    <AuthOnly>
      <div className='m-10 flex space-x-4'>
        {navigate && <AccountNav navigate={navigate} />}
        {renderLayout()}
      </div>
    </AuthOnly>
    
  );
};

export default AccountPage;
