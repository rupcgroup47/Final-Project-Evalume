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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Subject from "@mui/icons-material/Subject";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function ProfileAlerts(props) {
  const { alerts } = props;

  return (
    <>
      <MDBox p={2}>
        {alerts.map((item, index) => (
          <MDTypography variant="h2" color="secondary" key={index}>
            {index === 0 ? <AccessAlarmIcon fontSize="large" /> : index === 1 ? <CalendarToday  fontSize="large" /> : <Subject  fontSize="large"/>}
            &nbsp;
            {item.alertNum} &nbsp;
            {item.alertSub}  
            <Divider />

          </MDTypography>
        ))}
      </MDBox>
    </>
  );
}

// // Setting default props for the ProfileInfoCard
// ProfileInfoCard.defaultProps = {
//   shadow: true,
// };

// // Typechecking props for the ProfileInfoCard
// ProfileInfoCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   info: PropTypes.objectOf(PropTypes.string).isRequired,
//   action: PropTypes.shape({
//     route: PropTypes.string.isRequired,
//     tooltip: PropTypes.string.isRequired,
//   }).isRequired,
//   shadow: PropTypes.bool,
// };
