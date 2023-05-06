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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import PieChart from "examples/Charts/PieChart";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import reportPieChartData from "./data/reportPieChartData";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect } from "react";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
  return (
    <header>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="שביעות רצון"
                description="המחלקות בעלות שביעות הרצון הגבוהה ביותר"
                date="עודכן לאחרונה בתאריך 2.2.2023"
                chart={reportsBarChartData} 

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                title="משמעת"
                description="קצב השינוי במשמעת העובדים"
                date="עודכן לאחרונה בתאריך 2.2.2023"
                chart={sales}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
            <ComplexStatisticsCard
                color="dark"
                title="מספר יעדים ממוצע לעובד"
                count={2}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "עלייה משנה שעברה",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Projects />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrdersOverview />
          </Grid> */}
        </Grid>
      </MDBox>
    </header>
  );
}

export default Dashboard;
