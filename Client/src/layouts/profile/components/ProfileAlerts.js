import { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Subject from "@mui/icons-material/Subject";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from '@mui/icons-material/People';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Dialog, DialogContent, Button } from "@mui/material";
import WaitingEvalues from "./ProfileTables/WaitingEvalues";
import Card from "@mui/material/Card";
import { MainStateContext } from "App";

export default function ProfileAlerts({ tmpResult, meeting }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [calenderOpen, setcalenderOpen] = useState(false);
  const mainState = useContext(MainStateContext);
  const [tempResualt, setTempResualt] = useState([]);
  const [meetingState, setMeetingState] = useState([]);
  const [state, setState] = useState({
    selfEvalu: mainState.mainState.self_Evalu,
    employeeEvalu: 0,
    employeeMeet: 0,
    employeeCalender: 0,
  });

  useEffect(() => {
    setTempResualt(tmpResult);
  }, [tmpResult])

  useEffect(() => {
    setMeetingState(meeting);
  }, [meeting])

  useEffect(() => {
    if (tempResualt?.length !== 0) {
      setState((prevState) => {
        return {
          ...prevState,
          employeeEvalu: tempResualt?.filter((item) => item.evalu_Part_Type === 0).length,
          employeeMeet: tempResualt?.filter((item) => item.evalu_Part_Type === 1).length
        };
      });
    };
    if (meetingState?.length !== 0) {
      setState((prevState) => {
        return {
          ...prevState,
          employeeCalender: meetingState?.length
        };
      });
    };
  }, [tempResualt, meetingState])

  const [arrAlerts, setArrAlerts] = useState(
    [
      {
        id: "selfEvalu",
        alertNum: state?.selfEvalu,
        alertSub: "הערכה עצמית ממתינה לביצוע",
        route: "/evaluation",
      },
      {
        id: "employeeEvalu",
        alertNum: state?.employeeEvalu,
        alertSub: "הערכות ממתינות למישוב שלך",
        forManager: true,
        route: "/managerEvalues",
      },
      {
        id: "employeeMeet",
        alertNum: state?.employeeMeet,
        alertSub: "פגישות הערכה ממתינות",
        forManager: true,
        route: "/managerEvalues",
      },
      {
        id: "employeeCalender",
        alertNum: state?.employeeCalender,
        alertSub: "פגישות ממתינות לקביעה",
        forManager: true,
        route: "/evaluation",
      },
    ]
  );

  useEffect(() => {
    const updateArr = arrAlerts.map((item) => {
      const keyValue = state[item.id];
      const updateValue = keyValue;
      return { ...item, alertNum: updateValue }
    })
    setArrAlerts(updateArr);
  }, [state]);

  useEffect(() => {
    setAlerts(arrAlerts);
  }, [arrAlerts]);

  const [alerts, setAlerts] = useState([]);

  const [filteredAlerts, setFilteredAlerts] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => { //filtered the alerts by type
    if (!mainState.mainState.userType) {
      setFilteredAlerts(alerts.filter(({ forManager }) => !forManager));
    }
    else {
      setFilteredAlerts(alerts);
    }
  }, [alerts])

  const handleAlarmClick = () => {
    let tmp = tempResualt?.filter((item) => item.evalu_Part_Type === 0);
    setData(tmp);
    if (tmp.length !== 0) {
      setIsPopupOpen(true);
      setcalenderOpen(false);
    }
  };

  const handleMeetingClick = () => {
    let tmp = tempResualt?.filter((item) => item.evalu_Part_Type === 1);
    setData(tmp);
    if (tmp.length !== 0) {
      setIsPopupOpen(true);
      setcalenderOpen(false);
    }
  };

  const handleCalendarClick = () => {
    let tmp = meetingState;
    setData(tmp);
    if (tmp.length !== 0) {
      setIsPopupOpen(true);
      setcalenderOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Card sx={{ backgroundColor: "#effafb82", Width: "100%" }}>
        <MDBox p={2}>
          {filteredAlerts?.map((item, index) => (
            <MDTypography variant="h3" color="secondary" key={index}>
              {index === 0 ? (
                <AssignmentIndIcon fontSize="large" />
              ) : index === 1 ? (
                <AccessAlarmIcon onClick={handleAlarmClick} fontSize="large" style={{ cursor: "pointer" }} />
              ) : index === 2 ? (
                <PeopleIcon onClick={handleMeetingClick} fontSize="large" style={{ cursor: "pointer" }} />
              ) : index === 3 ? (
                <CalendarToday onClick={handleCalendarClick} fontSize="large" style={{ cursor: "pointer" }} />
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
      </Card>
      <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
        <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
        <DialogContent>
          <WaitingEvalues data={data} calender={calenderOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
