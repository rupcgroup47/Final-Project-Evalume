/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { useEffect, useState, useContext } from "react";
import { MainStateContext } from "App";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

// Data
import ProfileAlerts from "./data/ProfileAlerts";

function Overview() {
  const arrAlerts = [
    {
      alertNum: 0,
      alertSub: "הערכה עצמית ממתינה לביצוע",
    },
    {
      alertNum: 1,
      alertSub: "הערכות עובד שיש למלא",
    },
    {
      alertNum: 4,
      alertSub: "פגישות ממתינות לקביעה",
    },
    {
      alertNum: 0,
      alertSub: "הערכות ממתינות למישוב",
    },
  ];

  const [alerts, setAlerts] = useState(arrAlerts);
  const [, dispatch] = useMaterialUIController();
  const { mainState, setMainState } = useContext(MainStateContext);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
  return (
    <Header>
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          {/* //Profile card */}
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <ProfileInfoCard
              title="פרטים אישיים"
              info={{
                שם: `${mainState.userFName} ${mainState.userLName}`,
                טלפון: "(44) 123 1234 123",
                אימייל: `${mainState.userEmail}`,
                מחלקה: "מחסן",
                תפקיד: "מנכל",
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <ProfileAlerts title="conversations" alerts={alerts} />
          </Grid>
        </Grid>
      </MDBox>
    </Header>
  );
}

export default Overview;


