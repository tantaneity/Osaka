import React, { useState } from "react";
import { Drawer, Card, Typography, Input, List } from "@material-tailwind/react";
import MenuItem from "./MenuItem";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface DrawerContentProps {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ isDrawerOpen, closeDrawer }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <Drawer open={isDrawerOpen} onClose={closeDrawer}>
      <Card
        color="transparent"
        shadow={false}
        className="h-[calc(100vh-2rem)] w-full p-4"
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          <Typography variant="h5" color="blue-gray">
            Osaka Dashboard
          </Typography>
        </div>
        <div className="p-2">
          <Input
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
            crossOrigin={undefined}
          />
        </div>
        <List>
          <MenuItem searchTerm={searchTerm} />
        </List>
      </Card>
    </Drawer>
  );
};

export default DrawerContent;
