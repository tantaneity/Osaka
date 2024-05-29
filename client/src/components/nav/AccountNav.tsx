import React from 'react';
import { Card, List, ListItem } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

type AccountNavProps = {
  navigate: string;
};

const AccountNav: React.FC<AccountNavProps> = ({ navigate }) => {
  const [selected, setSelected] = React.useState<string>(navigate || 'my-orders');

  const handleNavigation = (value: string) => {
    setSelected(value);
  };

  return (
    <Card className='text-center'>
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
      </List>
    </Card>
  );
}

export default AccountNav;
