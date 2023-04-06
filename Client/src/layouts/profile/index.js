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
import MDTypography from "components/MDTypography";

// import MDTypography from "components/MDTypography";

// import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfileGrid from "./components/ProfileGrid";// Overview page components
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
      route: "/evaluation",

    },
    {
      alertNum: 1,
      alertSub: "הערכות עובד שיש למלא",
      route: "/evaluation",

    },
    {
      alertNum: 4,
      alertSub: "פגישות ממתינות לקביעה",
      route: "/evaluation",

    },
    {
      alertNum: 0,
      alertSub: "הערכות ממתינות למישוב",
      route: "/managerEvalues",
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
                טלפון: `${mainState.userPhoneNum}`,
                אימייל: `${mainState.userEmail}`,
                תז: `${mainState.userId}`,
                מחלקה: `${mainState.userDepartment}`,
                תפקיד: `${mainState.userRole}`,
                מנהל: `${mainState.managerFname} ${mainState.managerLName}`
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
      {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox> */}
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileGrid
                title="הערכות"
                description="צפייה והורדת כלל ההערכות שלי לאורך השנים"
                action={{
                  type: "internal",
                  route: "/myEvalues",
                  color: "info",
                  label: "מעבר להערכות שלי",
                }}

              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileGrid
                title="יעדים"
                description="צפייה ועדכון היעדים האישיים שלי"
                action={{
                  type: "evalues",
                  route: "/myEvalues",
                  color: "info",
                  label: "מעבר ליעדים שלי",
                }}

              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileGrid
                title="יומן פגישות"
                description="צפייה בפגישות שלי"
                action={{
                  type: "goals",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
              
              />
            </Grid>
           
          </Grid>
        </MDBox>
    </Header>
  );
}

export default Overview;


