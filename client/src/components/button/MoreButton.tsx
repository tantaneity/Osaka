import React from 'react';
import { Button } from '@material-tailwind/react';

interface MoreButtonProps {
  onClick: () => void;
  showAllSubcategories: boolean;
}

const MoreButton: React.FC<MoreButtonProps> = ({ onClick, showAllSubcategories }) => {
  return (
    <Button color="blue-gray" size="sm" variant='text' onClick={onClick}>
      {showAllSubcategories ? 'Show Less' : 'More'}
    </Button>
  );
};

export default MoreButton;
