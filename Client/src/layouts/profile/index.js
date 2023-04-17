import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import ProfileInfoCard from "./components/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import { useEffect, useState, useContext } from "react";
import { MainStateContext } from "App";
import { useMaterialUIController, setDirection } from "context";
import OpenEvaluation from "./components/Header/openEvaluation";
// Data
import ProfileAlerts from "./components/ProfileAlerts";
import ProfileGrid from "./components/ProfileGrid";
function Overview() {
  const [, dispatch] = useMaterialUIController();
  const { mainState, setMainState } = useContext(MainStateContext);
  const [waitingToEvalue, setWaitingToEvalue] = useState(3);

  const arrAlerts = [
    {
      alertNum: 0,
      alertSub: "הערכה עצמית ממתינה לביצוע",
      route: "/evaluation",
    },
    {
      alertNum: 1,
      alertSub: "הערכות ממתינות למישוב שלך",
      forManager: true,
      route: "/managerEvalues",
    },
    {
      alertNum: 1,
      alertSub: "פגישות הערכה ממתינות",
      forManager: true,
      route: "/managerEvalues",
    },
    {
      alertNum: waitingToEvalue,
      alertSub: "פגישות ממתינות לקביעה",
      forManager: true,
      route: "/evaluation",
    },
  ];
  const [alerts, setAlerts] = useState(arrAlerts);

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
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <ProfileInfoCard
              title="פרטים אישיים"
              info={{
                שם: `${mainState.userFName} ${mainState.userLName}`,
                טלפון: `${mainState.userPhoneNum}`,
                אימייל: `${mainState.userEmail}`,
                תז: `${mainState.userId}`,
                מחלקה: `${mainState.userDepartment}`,
                תפקיד: `${mainState.userRole}`,
                מנהל: `${mainState.managerFname} ${mainState.managerLName}`,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
          <Grid
            item
            xs={12}
            xl={8}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <ProfileAlerts title="conversations" alerts={alerts} />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileGrid
              title="הערכות"
              description="צפייה והורדת כלל ההערכות שלי לאורך השנים"
              type="evalues"
            />
          </Grid> 
          <Grid item xs={12} md={6} xl={4}>
            <ProfileGrid title="יעדים" description="צפייה ועדכון היעדים האישיים שלי" type="goals" />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileGrid title="יומן פגישות" description="צפייה בפגישות שלי" />
          </Grid>
        </Grid>
      </MDBox>
    </Header>
  );
}

export default Overview;
