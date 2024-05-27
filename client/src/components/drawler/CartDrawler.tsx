import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  MenuItem,
} from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
 
export function CartDrawlerButton() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
 
  return (
    <React.Fragment>
      <Typography
              as="a"
              href="#"
              variant="small"
              color="gray"
              className="font-medium text-blue-gray-500"
            >
              <MenuItem onClick={openDrawer} className="flex items-center gap-2 lg:rounded-full">
                {React.createElement(ShoppingCartIcon, {
                  className: "h-[18px] w-[18px]",
                })}
                <span className="text-gray-900"> Cart </span>
              </MenuItem>
            </Typography>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-end p-4">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
        </div>
      </Drawer>
    </React.Fragment>
  );
}