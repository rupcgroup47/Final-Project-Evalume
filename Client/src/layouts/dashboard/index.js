/* eslint-disable */

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { useEffect, useState, useContext } from "react";
import { useMaterialUIController, setDirection } from "context";
import { EvalueContext } from "context/evalueVariables";
import ApiFetcher from "components/ApiFetcher";


const yearsChart =
  [
    {
      "year": 2023,
      "avgAnswer": 4
    },
    {
      "year": 2022,
      "avgAnswer": 4
    },
    {
      "year": 2021,
      "avgAnswer": 2
    }
  ]


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "ציון ממוצע",
        data: [],
      },
    ],
  });
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);
  const [selectedValueGraph1, setselectedValueGraph1] = useState("שירותיות"); // Initialize the selected value state
  const { API } = useContext(EvalueContext);
  const [year, setYear] = useState(new Date().getFullYear());
  const [dataTable, setDataTable] = useState([]);// bottom table
  const [goals, setGoals] = useState([]);// goals
  const [totalAvg, setTotalAvg] = useState([]);// years - to be add once we add data to our database
  const [avgQuestions, setAvgQuestions] = useState([]);// dep table
  const [yearsChartData, setYearsChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "ציון ממוצע",
        data: [],
      },
    ],
  })

  //  all API calls
  useEffect(() => {
    let isMounted = true;

    // Get the total questions avg answer for the last 5/6 years from the current year
    const getTotalAvg = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiAvgAnsByYears, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getTotalAvg", fetchedData);
          setTotalAvg(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }
    getTotalAvg();

    // Get how many employees are in each part of the evaluation process for the current year soted by departments
    const getDataTable = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiEmployeeInEachPart, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getDataTable", fetchedData);
          setDataTable(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }
    getDataTable();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Get goals and their status details
    const getGolas = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiGoalsStatusBI + year, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getGolas", fetchedData);
          setGoals(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }
    getGolas();

    // Get the questions avg answer according to the question group type
    const getAvgQuestions = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiQuesGroupDep + year, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getAvgQuestions", fetchedData);
          setAvgQuestions(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }
    getAvgQuestions();

    return () => {
      isMounted = false;
    }
  }, [year]);


  const [goalchartData, setgoalChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handleSelectChange1 = (event) => {
    setselectedValueGraph1(event.target.value);
  }

  const getBackgroundColor = (index) => {
    const colors = [
      "rgba(255, 99, 132, 0.5)",
      "rgba(54, 162, 235, 0.5)",
      "rgba(255, 206, 86, 0.5)",
    ];
    return colors[index % colors.length];
  };


  useEffect(() => {
    // Find the selected item in the JSON array
    const selectedOption = avgQuestions?.find((option) => option.quesGroup_Desc === selectedValueGraph1);

    // Generate the chart data based on the selected option
    const newChartData = {
      labels: selectedOption?.parts.map((part) => part.depName) || [],
      datasets:
      {
        label: "ציון ממוצע",
        data: selectedOption?.parts.map((part) => part.avg_Answers) || [],
      }

    };

    setChartData(newChartData);
  }, [selectedValueGraph1, avgQuestions]);


  useEffect(() => {//  Arranging the data of the goals and inserting them into the chart table
    const processedData = goals?.reduce((acc, curr, index) => {
      const { goalName, goalStatus, num_of_statuses_byGoal } = curr;

      if (!acc?.labels?.includes(goalName)) {
        acc.labels.push(goalName);
      }

      let dataset = acc?.datasets?.find((d) => d.label === goalStatus);

      if (!dataset) {
        dataset = {
          label: goalStatus,
          data: [],
          backgroundColor: getBackgroundColor(index),
        };
        acc.datasets.push(dataset);
      }

      dataset?.data?.push(num_of_statuses_byGoal);

      return acc;
    }, { labels: [], datasets: [] });

    setgoalChartData({
      labels: processedData?.labels,
      datasets: processedData?.datasets,
    });


    // Extract the years and avgAnswer values from the objects
    let labels = yearsChart.map(item => item.year);
    let data = yearsChart.map(item => item.avgAnswer);

    // Sort the labels and data arrays based on the years
    const sortedIndices = labels.map((_, index) => index).sort((a, b) => labels[a] - labels[b]);
    labels = sortedIndices.map(index => labels[index]);
    data = sortedIndices.map(index => data[index]);


    const yearsTempChartData = {
      labels: labels || [],
      datasets:
      {
        label: "ציון ממוצע",
        data: data || [],
      }

    };

    setYearsChartData(yearsTempChartData);

  }, [goals]);



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
                chart={chartData}
              />
              <select
                value={selectedValueGraph1}
                onChange={handleSelectChange1}
                style={{
                  fontFamily: "Rubik",
                  fontSize: "large",
                  margin: "5px auto",
                  display: "flex",
                  borderRadius: "5px",
                  border: "none",
                  minWidth: "-webkit-fill-available"
                }}
              >
                <option value="" disabled>בחר מדד</option>
                {avgQuestions?.map((option, index) => (
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
                title="שביעות רצון"
                description="קצב השינוי לאורך השנים"
                chart={yearsChartData}
              />
            </MDBox>

          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <VerticalBarChart
                color="dark"
                title="סטטוס יעדים"
                description="כמות העובדים המשויכים ליעד וקצת התקדמות"
                chart={goalchartData}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Projects dataTable={dataTable} />
          </Grid>
        </Grid>
      </MDBox>
    </header>
  );
}

export default Dashboard;
