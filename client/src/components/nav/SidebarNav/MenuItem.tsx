import React, { useState } from "react";
import { Accordion, ListItem, AccordionHeader, AccordionBody, ListItemPrefix, Chip, List, ListItemSuffix, Typography } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, InboxIcon, PowerIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface MenuItemProps {
  searchTerm: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ searchTerm }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <PresentationChartBarIcon className="h-5 w-5" />,
      children: ["Analytics"],
    },
    {
      title: "E-Commerce",
      icon: <ShoppingBagIcon className="h-5 w-5" />,
      children: ["Orders", "Products", "Category", "News"],
    },
    { title: "Inbox", icon: <InboxIcon className="h-5 w-5" />, children: [] },
    { title: "Log Out", icon: <PowerIcon className="h-5 w-5" />, children: [] },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.title.toLowerCase().includes(searchTerm)) return true;
    if (item.children.some((child) => child.toLowerCase().includes(searchTerm)))
      return true;
    return false;
  });

  return (
    <>
      {filteredMenuItems.map((item, index) => (
        item.children.length > 0 ? (
          <Accordion
            key={index}
            open={open === index + 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === index + 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === index + 1}>
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>{item.icon}</ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  {item.title}
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                {item.children.map((child, childIndex) => (
                  <a href={`${child.toLowerCase().replace(" ", "-")}`} className="text-indigo-200">
                    <ListItem key={childIndex}>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    
                      {child}
                    
                  </ListItem>
                  </a>
                  
                ))}
              </List>
            </AccordionBody>
          </Accordion>
        ) : (
          <a href={`${item.title.toLowerCase().replace(" ", "-")}`} className="text-black-500">
            <ListItem key={index}>
            <ListItemPrefix>{item.icon}</ListItemPrefix>
            
              {item.title}
            
            {item.title === "Inbox" && (
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            )}
          </ListItem>
          </a>
          
        )
      ))}
      <hr className="my-2 border-blue-gray-50" />
    </>
  );
};

export default MenuItem;
