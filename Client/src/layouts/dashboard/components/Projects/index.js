/* eslint-disable */

import { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormDepData from "./data";

function Projects({dataTable}) {
  const [menu, setMenu] = useState(null);
  const year = new Date().getFullYear();
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);


  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            קצב מילוי השאלון לפי מחלקות לשנת {year}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <FormDepData dataTable={dataTable}/>
      </MDBox>
    </Card>
  );
}

export default Projects;
