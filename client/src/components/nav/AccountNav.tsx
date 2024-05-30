import React from 'react';
import { Card, List, ListItem } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/UserStore';
import LogoutDialog from '../dialog/LogoutDialog';

type AccountNavProps = {
  navigate: string;
};

const AccountNav: React.FC<AccountNavProps> = ({ navigate }) => {
  const [selected, setSelected] = React.useState<string>(navigate || 'my-orders');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const {logout} = useUserStore()
  const navigateDom = useNavigate()
  const handleNavigation = (value: string) => {
    setSelected(value);
  };
  const handleLogout = () => {
    logout()
    navigateDom('/')
  };
  return (
    <Card className='text-center'>
      <LogoutDialog open={open} setOpen={setOpen} onLogout={handleLogout}/>
      <List>
        <Link to="/user/my-orders" onClick={() => handleNavigation('my-orders')}>
          <ListItem selected={selected === 'my-orders'}>
            My orders
          </ListItem>
        </Link>
        
        <Link to="/user/update-profile" onClick={() => handleNavigation('update-profile')}>
          <ListItem selected={selected === 'update-profile'}>
            Update Profile
          </ListItem>
        </Link>

        <Link to="/user/change-password" onClick={() => handleNavigation('change-password')}>
          <ListItem selected={selected === 'change-password'}>
            Change Password
          </ListItem>
        </Link>

        <ListItem
          selected={selected === 'logout'}
          color='red'
          onClick={handleOpen}
        >
          Logout
        </ListItem>
      </List>
    </Card>
  );
}

export default AccountNav;
