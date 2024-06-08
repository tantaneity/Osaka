import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types/category/Category';
import { List, ListItem } from '@material-tailwind/react';

interface SubcategoryLinksProps {
  subcategories: Category[];
}

const SubcategoryLinks: React.FC<SubcategoryLinksProps> = ({ subcategories }) => {
  return (
    <List className="mb-4 w-full bg-blue-gray-50 rounded-lg">
      {subcategories.map((subcategory) => (
        <Link
          key={subcategory.id}
          to={`/search/?category=${subcategory.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="block p-4 text-sm text-black-200"
        >
          <ListItem className='bg-blue-gray-200'>
            {subcategory.name}
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default SubcategoryLinks;
