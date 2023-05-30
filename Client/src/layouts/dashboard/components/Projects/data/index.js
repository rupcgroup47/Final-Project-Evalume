
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

const array = [ { name: "משאבי אנוש", depCount: 100, level0:30, level1:40, level2:30, progress: 60 },
{ name: "לוגיסטיקה", depCount: 300, level0:200, level1:40, level2:60, progress: 10 }]


export default function data() {


  return {
    columns: [
      { Header: "מחלקות", accessor: "departments", width: "45%", align: "left" },
      { Header: "כמות עובדים במחלקה", accessor: "depCount", align: "center" },
      { Header: "הערכה עצמית", accessor: "level0", align: "center" },
      { Header: "הערכת מנהל", accessor: "level1", align: "center" },
      { Header: "הערכה משותפת", accessor: "level2", align: "center" },
      { Header: " התקדמות", accessor: "completion", align: "center" },
    ],

    rows: array.map((item) => ({
      departments:  <MDTypography variant="caption" color="text" fontWeight="medium">
      {item.name}
    </MDTypography>,
      depCount: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.depCount}
        </MDTypography>
      ),
      level0: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.level0}
        </MDTypography>
      ),
      level1: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.level1}
        </MDTypography>
      ),
       level2: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.level2}
        </MDTypography>
      ),
      completion: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={item.progress} color="info" variant="gradient" label={false} />
        </MDBox>
      ),
    })),
  };
}
