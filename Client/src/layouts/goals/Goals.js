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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import MyTable from "MyTable"
import { Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import GoalsTable from "./GoalsTable";
import GoalsData from "./GoalsData";

// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

const _goals = [
  {
    id: 1,
    goalId: "a",
    goalName:"קורס אקסל"
  },
  {
    id: 2,
    goalId: "b",
    goalName:"קורס פריוריטי"
  }
];
function Goals() {
  const [goals, setGoals] = useState(_goals);
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
    <GoalsTable />
  </Container>
  </DashboardLayout>

  );
}

export default Goals;