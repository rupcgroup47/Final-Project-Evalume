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


// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Button, Typography } from "@mui/material";
// import MyTable from "MyTable"
import { Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import GoalsTable from "./GoalsTable";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";


function Goals() {
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <Typography>
        <Button>היעדים שלי כעובד</Button>
        <Button>היעדים שלי כמנהל</Button>
      </Typography>
      <GoalsTable />
    </Container>
  );
}

export default Goals;