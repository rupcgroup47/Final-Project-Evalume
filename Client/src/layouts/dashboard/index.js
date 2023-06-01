
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { useEffect , useState} from "react";
import { useMaterialUIController, setDirection } from "context";
import reportsGoalsData from "./data/reportsGoalsData";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [selectedValueGraph1, setselectedValueGraph1] = useState(''); // Initialize the selected value state
  const [selectedValueGraph2, setselectedValueGraph2] = useState(''); // Initialize the selected value state
  const measurs = [
    {
      quesGroup: 1,
      quesGroup_Desc: "שירותיות",
    },
    {
      quesGroup: 2,
      quesGroup_Desc: "מקצועיות ואיכות בעבודה",
    }
    ]
  const handleSelectChange1 = (event) => {
    setselectedValueGraph1(event.target.value); }

    const handleSelectChange2 = (event) => {
      setselectedValueGraph2(event.target.value); }


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
                title={selectedValueGraph1}
                description="התפלגות לפי מחלקות"
                date="עודכן לאחרונה בתאריך 2.2.2023"
                chart={reportsBarChartData}

              />

<select value={selectedValueGraph1} onChange={handleSelectChange1}>
        <option value="">בחר מדד</option>
        {measurs.map((option, index) => (
          <option key={option.quesGroup} value={option.quesGroup_Desc}>
            {option.quesGroup_Desc}
          </option>
        ))}
      </select>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                title={selectedValueGraph2}
                description="קצב השינוי לאורך השנים"
                date="עודכן לאחרונה בתאריך 2.2.2023"
                chart={sales}
              />

<select value={selectedValueGraph2} onChange={handleSelectChange2}>
        <option value="">בחר מדד</option>
        {measurs.map((option) => (
          <option key={option.quesGroup} value={option.quesGroup_Desc}>
          {option.quesGroup_Desc}
        </option>
        ))}
      </select>
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
