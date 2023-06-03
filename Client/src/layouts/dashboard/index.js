
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { useEffect , useState} from "react";
import { useMaterialUIController, setDirection } from "context";
import reportsGoalsData from "./data/reportsGoalsData";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";
// import BarChartData from "./data/reportsBarChartData";
const jsonArray = [
  {
"quesGroup": 1,
    "quesGroup_Desc": "שירותיות",
    "parts": [
      {
    "depNum": 1,
    "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
    "depNum": 2,
    "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
    "depNum": 102,
    "depName": "תפעול",
        "avg_Answers": 5
     }
    ]
 },
  {
 "quesGroup": 2,
  "quesGroup_Desc": "מקצועיות ואיכות בעבודה",
    "parts": [
      {
    "depNum": 1,
    "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
    "depNum": 2,
    "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
    "depNum": 102,
    "depName": "תפעול",
        "avg_Answers": 5
     }
    ]
 },{
 
 "quesGroup": 3,
  "quesGroup_Desc": "יחסי עבודה , תקשורת ועבודת צוות",
    "parts": [
      {
    "depNum": 1,
    "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
    "depNum": 2,
    "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
    "depNum": 102,
    "depName": "תפעול",
        "avg_Answers": 5
     }
    ]
 },{

 "quesGroup": 4,
  "quesGroup_Desc": "יוזמה ואחריות",
    "parts": [
      {
    "depNum": 1,
    "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
    "depNum": 102,
    "depName": "תפעול",
        "avg_Answers": 5
     }
    ]
 },{

 "quesGroup": 5,
  "quesGroup_Desc": "משמעת",
    "parts": [
      {
    "depNum": 1,
    "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
    "depNum": 2,
    "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
    "depNum": 102,
    "depName": "תפעול",
        "avg_Answers": 5
     }
    ]
 },{

 "quesGroup": 6,
  "quesGroup_Desc": "מיומנויות ניהול",
    "parts": [
      {
    "depNum": 1,
    "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
    "depNum": 2,
    "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
    "depNum": 102,
    "depName": "תפעול",
        "avg_Answers": 5
           }
    ]
  }
]

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'ציון ממוצע',
        data: [],
      },
    ],
  });

  const [selectedValueGraph1, setselectedValueGraph1] = useState("שירותיות"); // Initialize the selected value state
  const [selectedValueGraph2, setselectedValueGraph2] = useState(''); // Initialize the selected value state
  const handleSelectChange1 = (event) => {
    setselectedValueGraph1(event.target.value); }

    useEffect(() => {
      // Find the selected item in the JSON array
      const selectedOption = jsonArray.find((option) => option.quesGroup_Desc === selectedValueGraph1);
      console.log(selectedOption)
  
      // Generate the chart data based on the selected option
      const newChartData = {
        labels: selectedOption?.parts.map((part) => part.depName) || [],
        datasets: [
          {
            label: selectedOption.quesGroup_Desc,
            data: selectedOption?.parts.map((part) => part.avg_Answers) || [],
          },
        ],
      };
  
      setChartData(newChartData);
      console.log(newChartData)
    }, [selectedValueGraph1]);

   
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
                chart={chartData}
              />

<select value={selectedValueGraph1} onChange={handleSelectChange1}>
        <option value="שירותיות">שירותיות</option>
        {jsonArray.map((option, index) => (
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
        {jsonArray.map((option) => (
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
