import React, { useState, useEffect } from "react";


import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  Bars2Icon,
  HeartIcon,
  NewspaperIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import useUserStore from "@/store/UserStore";
import { LoginDialog } from "../dialog/LoginDialog";
import { useGetPages } from "@/hooks/usePages";


function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: pages, isLoading, isError } = useGetPages();
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const isAuth = useUserStore((state) => state.isAuth);
  const closeMenu = () => setIsMenuOpen(false);
  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(!openLoginDialog);
  };
  const renderItems = pages?.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <LoginDialog open={openLoginDialog} handleOpen={handleOpenLoginDialog} />
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-normal"
          >
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="transparent"
            shadow={true}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img
              alt="osaka-with-cola"
              className="h-60 w-60"
              src="https://i.pinimg.com/564x/e0/5a/90/e05a90a5ab1b10585ef9a1f6912d4e30.jpg"
            />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
      {!isAuth &&
        <Button 
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded"
          onClick={handleOpenLoginDialog}
        >
          Login
        </Button>
      }
      
    </React.Fragment>
  );
}
const navListItems = [
  {
    label: "Account",
    icon: UserCircleIcon,
    href: '/user/my-orders'
  },
  {
    label: "Wish",
    icon: HeartIcon,
    href: '/wishlist'
  },
  {
    label: "News",
    icon: NewspaperIcon,
    href: '/news'
  },
];

function NavList() {
  const isAuth = useUserStore((state) => state.isAuth);
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const [loading] = useState(true);

  console.log(isAuth)

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(!openLoginDialog);
  };
  
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {loading ? (
        <> </>
      ) : (
        <>
          {!isAuth && (
              <>
                <Button size="sm" variant="text" onClick={handleOpenLoginDialog}>
                  Log In
                </Button>
                {openLoginDialog && (
                  <LoginDialog open={openLoginDialog} handleOpen={handleOpenLoginDialog} />
                )}
              </>
            )}

        </>
      )}

      
      {isAuth && (
        <>
          {navListItems.map(({ label, icon, href }) => (
            <Typography
              key={label}
              as="a"
              href={href}
              variant="small"
              color="gray"
              className="font-medium text-blue-gray-500"
            >
              <MenuItem className="flex items-center gap-2 lg:rounded-full">
                {React.createElement(icon, {
                  className: "h-[18px] w-[18px]",
                })}{" "}
                <span className="text-gray-900"> {label}</span>
              </MenuItem>
              
            </Typography>
          ))}
            <Typography 
                href="/admin"
                variant="small"
                color="gray"
                className="font-medium text-blue-gray-500">
              <MenuItem
              className="flex items-center gap-2 lg:rounded-full">
                {React.createElement(UserIcon, {
                  className: "h-[18px] w-[18px]",
                })}{" "}
                <span className="text-gray-900"> Admin panel</span>
              </MenuItem>
            </Typography>
            {/* TODO: Adapt to the users role */}
        </>
      )}
    </ul>
  );
}

export function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Osaka
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
