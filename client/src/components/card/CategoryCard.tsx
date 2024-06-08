import React, { useState } from 'react';
import { Card, Typography, CardHeader, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Category } from '@/types/category/Category';
import { Link } from 'react-router-dom';
import { convertToBase64 } from '@/lib/utils';
import SubcategoryLinks from '../links/SubcategoryLinks';
import MoreButton from '../button/MoreButton';

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

  const imageUrl =
    category.image && category.image?.data
    ? convertToBase64(category.image?.data)
    : (category.base64Url || 'https://i.pinimg.com/736x/8d/62/26/8d6226d7ea86222727a6f09519a0042d.jpg');
  
  return (
    <Card className="flex flex-col items-center p-4 mb-5 mt-5 w-full bg-blue-gray-100" onClick={onClick}>
      <Link to={`/search/?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
        <CardHeader className="h-48">
          <img
            src={imageUrl}
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

      <SubcategoryLinks subcategories={displayedSubcategories} />

      {subcategories.length > 3 && (
        <MoreButton onClick={handleToggleSubcategories} showAllSubcategories={showAllSubcategories} />
      )}
    </Card>
  );
};

export default CategoryCard;
