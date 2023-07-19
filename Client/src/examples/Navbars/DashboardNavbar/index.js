/* eslint-disable */

import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import { MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import CreateOrUpdateUserDialog from "dialog/CreateOrUpdateUserDialog";
import { MainStateContext } from "App";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";


function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const { mainState, setMainState } = useContext(MainStateContext);
  const isUserUpdate = true;

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /**
     The event listener that"s calling the handleTransparentNavbar function when
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false);

  const handleUpdateUser = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("Current User");
    window.location.href = "/authentication/sign-in";
  };
  const renderProfileMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <MenuItem onClick={() => setShowUpdateUserDialog((e) => !e)}>עדכון פרטי משתמש</MenuItem>
      <MenuItem onClick={handleLogout}>התנתקות</MenuItem>


    </Menu>
  );

  const handleSaveChanges = () => {
    setOpenDialog(false);
    console.log("Updated details:");
  };


  return (
    <div>

      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
              <MDBox color={light ? "white" : "inherit"}>
                <IconButton
                  size="medium"
                  disableRipple
                  color="inherit"
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Icon>account_circle</Icon>
                </IconButton>
                {renderProfileMenu()}

                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon fontSize="medium">{miniSidenav ? "menu_open" : "menu"}</Icon>
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon>settings</Icon>
                </IconButton>
              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </AppBar>

      <CreateOrUpdateUserDialog
        open={showUpdateUserDialog}
        setOpen={setShowUpdateUserDialog}
        user={mainState}
        setUser={setMainState}
        isUserUpdate={isUserUpdate}
      // users={users}
      // setUsers={setUsers}
      // setItems={setItems}
      />
    </div>

  );
}
// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
