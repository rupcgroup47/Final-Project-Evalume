import { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/bruce-mars.jpg";
import avatar from "assets/images/avatar.png"
import backgroundImage from "assets/images/packages.jpg";
import OpenEvaluation from "./openEvaluation";

function Header({ children,questionnairesData}) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const { mainState, setMainState } = useContext(MainStateContext);

  return (
    <MDBox position="relative">
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="15.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card sx={{ position: "relative", mt: -20, mx: 3, py: 1, px: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={avatar} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item xs={6}>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h3" fontWeight="medium">
                {"ברוך הבא "}
                {mainState.userFName}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item>
            <div>
              {
                mainState.is_Admin ? (
                  <MDBox height="100%" mt={0.5} lineHeight={1}>
                    <MDTypography variant="h5" fontWeight="medium">
                      <OpenEvaluation questionnairesData={questionnairesData}/>
                    </MDTypography>
                  </MDBox>
                ) : null
              }
            </div>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
