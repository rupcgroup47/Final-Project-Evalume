import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import { MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box} from '@mui/material';
import MDBox from "components/MDBox";
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
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  iconButton: {
    color: "red",
  },
});
function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);


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
     The event listener that's calling the handleTransparentNavbar function when 
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
  const storedUserInformation = JSON.parse(localStorage.getItem('Current User'));
  const [userInformation, setUserInformation] = useState(storedUserInformation || {});

  const handleUpdateUser = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('Current User');
    window.location.href = '/authentication/sign-in';
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
       <MenuItem onClick={handleUpdateUser}>עדכון פרטי משתמש</MenuItem>
       <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
          
    
    </Menu>
  );

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

<Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>עדכון פרטי משתמש</DialogTitle>
        <DialogContent>
          <br/>
        <Box mb={6}>
        <TextField label="שם פרטי" fullWidth value={userInformation.userFName || ''} />
        </Box>
        <Box mb={6}>
        <TextField label="שם משפחה" fullWidth value={userInformation.userLName || ''} />
        </Box>
        <Box mb={6}>
        <TextField label="תעודת זהות" fullWidth value={userInformation.userId || ''} />
        </Box>
        <Box mb={6}>
          <TextField label="אימייל" fullWidth value={userInformation.userEmail || ''}/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>ביטול</Button>
          {/* <Button onClick={handleSaveChanges}>Save Changes</Button> */}
        </DialogActions>
      </Dialog>
    </div>

  );
}
// localStorage.getItem("Department list")
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
