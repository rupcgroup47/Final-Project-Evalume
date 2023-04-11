import Divider from "@mui/material/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Subject from "@mui/icons-material/Subject";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import WaitingEvalues from "components/ProfileTables/WaitingEvalues";

export default function ProfileAlerts(props) {
  const { alerts } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      name: 'שיר זיו',
      date: '2022-03-01',
      status:"ממתין למישוב מנהל",
      link: '/managerEvalues'
    },
    {
      id: 2,
      name: 'נועה פרקש',
      date: '2022-04-15',
      status:"ממתין למישוב מנהל",
      link: '/managerEvalues'
    },
    {
      id: 3,
      name: 'יהל שבח',
      date: '2022-05-20',
      status:"ממתין למישוב משותף",
      link: '/managerEvalues'
    }
  ]);
  const handleTypographyClick = () => {
    setIsPopupOpen(true);
  };
  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <MDBox p={2}>
        {alerts.map((item, index) => (
          // <MDTypography variant="h2" color="secondary" key={index} component={Link} to={item.route}>
          <MDTypography variant="h2" color="secondary" key={index} onClick={handleTypographyClick}>
            {index === 0 ? (
              <AssignmentIndIcon fontSize="large" />
            ) : index === 1 ? (
              <AccessAlarmIcon fontSize="large" />
            ) : index === 2 ? (
              <CalendarToday fontSize="large" />
            ) : (
              <Subject fontSize="large" />
            )}
            &nbsp;
            {item.alertNum} &nbsp;
            {item.alertSub}
            <Divider />
          </MDTypography>
        ))}
      </MDBox>

      <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
      <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
        <DialogContent>
          <WaitingEvalues data={data}/>
        </DialogContent>
      </Dialog>
    </>
  );
}
