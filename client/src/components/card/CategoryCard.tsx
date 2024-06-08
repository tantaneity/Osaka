import React, { useState } from 'react';
import { Card, Typography, Button, CardHeader, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Category } from '@/types/category/Category';
import { Link } from 'react-router-dom';
import { convertToBase64 } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  subcategories: Category[];
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, subcategories, onClick }) => {
  const [showAllSubcategories, setShowAllSubcategories] = useState(false);
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);

  const handleToggleSubcategories = () => {
    setShowAllSubcategories(!showAllSubcategories);
  };

  const handleToggleDescription = () => {
    setDescriptionOpen(!isDescriptionOpen);
  };

  const displayedSubcategories = showAllSubcategories ? subcategories : subcategories.slice(0, 3);

  return (
    <Card className="flex flex-col items-center p-4 mb-5 mt-5 w-full" onClick={onClick}>
      <Link to={`/search/?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
        <CardHeader className="h-48">
          <img
            src={convertToBase64(category.image.data)}
            alt={category.name}
            className="w-full h-full object-cover object-center"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </CardHeader>
      </Link>
      
      <Typography variant="h5" className="mb-2">
        {category.name}
      </Typography>

      <Accordion open={isDescriptionOpen}>
        <AccordionHeader onClick={handleToggleDescription}>
          <Typography variant='lead' color='blue-gray'>
            Description
          </Typography>
        </AccordionHeader>
        <AccordionBody>
          <Typography className="mb-4">{category.description}</Typography>
        </AccordionBody>
      </Accordion>

      <div className="mb-4 w-full">
        <Card className='h-12 bg-indigo-50'>
          {displayedSubcategories.map((subcategory) => (
            <Link key={subcategory.id} to={`/search/?category=${subcategory.name.toLowerCase().replace(/\s+/g, "-")}`} className="block p-4 text-sm text-black-200">
              {subcategory.name}
            </Link>
          ))}
        </Card>
      </div>

      {subcategories.length > 3 && (
        <Button color="blue-gray" size="sm" variant='text' onClick={handleToggleSubcategories}>
          {showAllSubcategories ? 'Show Less' : 'More'}
        </Button>
      )}
    </Card>
  );
};

export default CategoryCard;
