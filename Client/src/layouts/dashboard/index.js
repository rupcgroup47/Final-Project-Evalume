
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import PieChart from "examples/Charts/PieChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { useEffect } from "react";
import { useMaterialUIController, setDirection } from "context";
import reportsGoalsData from "./data/reportsGoalsData";

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
              <VerticalBarChart
                color="dark"
                title="סטטוס יעדים"
                description="כמות העובדים המשויכים ליעד וקצת התקדמות"
                chart={reportsGoalsData}
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
