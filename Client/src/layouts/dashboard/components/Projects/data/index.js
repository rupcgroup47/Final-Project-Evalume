
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";


export default function data() {
  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "מחלקות", accessor: "companies", width: "45%", align: "left" },
      // { Header: "סיימו לענות", accessor: "members", width: "10%", align: "left" },
      { Header: "כמות עובדים במחלקה", accessor: "depCount", align: "center" },
      { Header: "הערכה עצמית", accessor: "level1", align: "center" },
      { Header: "הערכת מנהל", accessor: "level2", align: "center" },
      { Header: "הערכה משותפת", accessor: "level3", align: "center" },
      { Header: " התקדמות", accessor: "completion", align: "center" },
    ],

    rows: [
      {
        companies: <Company name="משאבי אנוש" />,
        depCount: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            100
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={60} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="לוגיסטיקה" />,
        depCount: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            300
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={10} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="כספים" />,
        depCount: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            100
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company  name="מערכות מידע" />,
        depCount: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
           35
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      }
    ],
  };
}
