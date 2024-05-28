import React, { useState } from 'react';
import { HomePageCarousel } from '@/components/carousel/HomePageCarousel';
import ProductList from '@/components/lists/ProductList';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import CartButton from '@/components/button/CartButton';
import CartDrawer from '@/components/drawler/CartDrawler';

const HomePage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCartButtonClick = () => {
      setDrawerOpen(true);
  };

  const closeDrawer = () => {
      setDrawerOpen(false);
  };

  return (
      <div className="flex flex-col w-full">
          <div className="bg-blue-gray-100 border-b-2 p-4 w-full flex justify-center">
              <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-screen-xl">
                  <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/5 p-4"> 
                      <HomePageCarousel />
                  </div>
                  <div className="relative p-4"> 
                      <Card className="w-full md:w-72 md:h-72 lg:w-96 xl:w-100 mt-8 md:mt-0 md:ml-20">
                          <CardBody>
                              <Typography variant="h5" color="blue-gray" className="mb-2">
                                  Welcome to Osaka Store!
                              </Typography>
                              <Typography>
                                  Discover a refreshing array of beverages to delight your senses. From soft drinks to creamy milk beverages and natural fruit juices, we cater to every taste preference.
                              </Typography>
                          </CardBody>
                          <CardFooter className="pt-0 flex justify-center">
                              <Button>Shop Now</Button>
                          </CardFooter>
                      </Card>
                      <Card className="w-full md:w-72 md:h-72 lg:w-96 xl:w-100 mt-8 md:mt-5 md:ml-20">
                          <CardBody>
                              <Typography variant="h5" color="blue-gray" className="mb-2">
                                  Discover Our New Arrivals!
                              </Typography>
                              <Typography>
                                  Check out the latest additions to our store. From exotic flavors to the latest trends in beverages, our new arrivals are sure to impress.
                              </Typography>
                          </CardBody>
                          <CardFooter className="pt-0 flex justify-center">
                              <Button>Explore Now</Button>
                          </CardFooter>
                      </Card>
                  </div>
              </div>
          </div>
          <div className="relative bg-gray-100 border-b-2 p-4 w-full">
              <ProductList />
          </div>
          <CartButton onClick={handleCartButtonClick} />
          <CartDrawer open={drawerOpen} onClose={closeDrawer} />
      </div>
  );
};

export default HomePage;
