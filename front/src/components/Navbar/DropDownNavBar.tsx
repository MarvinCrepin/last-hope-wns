import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FaLaptopCode } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoIosLogIn } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import Logo from "../../assets/img/logo_LastHope_inline.png";
import {MdMenuBook} from "react-icons/md";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="nav-font"
    >
      <MenuItem onClick={handleMenuClose}>
        <VscAccount className="mr-2 mb-1" color="var(--primary-color)" />
        <span className="text-lh-dark">Profil</span>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IoIosLogIn className="mr-2 mb-1" color="var(--primary-color)" />
        <span className="text-lh-dark">Log in</span>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <RiLogoutBoxLine className="mr-2 mb-1" color="var(--primary-color)" />
        <span className="text-lh-dark">Log out</span>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{fontFamily:"var(--title-font"}}
    >
      <MenuItem>
        <Badge
          badgeContent={17}
          color="error"
          className="text-lh-dark mr-2 text-2xl"
        >
          <IoIosNotifications />
        </Badge>

        <p className="text-lh-dark">Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <VscAccount className="mr-2 mb-1" color="var(--primary-color)" />

        <span className="text-lh-dark">Profile</span>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IoIosLogIn className="mr-2 mb-1" color="var(--primary-color)" />
        <span className="text-lh-dark">Log in</span>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <RiLogoutBoxLine className="mr-2 mb-1" color="var(--primary-color)" />
        <span className="text-lh-dark">Log out</span>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "var(--light-color)" }} className = "mb-10">
        <Toolbar className="nav-font">
          <img src={Logo} alt="logo" className="logo-Navbar" />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <FaLaptopCode className="mr-3" color="var(--primary-color)" />
              <span className="text-lh-dark">John Doe</span>
            </IconButton>
            <IconButton size="medium" aria-label="show 17 new notifications">
              <Badge badgeContent={17} color="error">
                <IoIosNotifications color="text-lh-dark" />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MdMenuBook color="var(--dark-color)" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
