import { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Subject from "@mui/icons-material/Subject";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from '@mui/icons-material/People';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, Button } from "@mui/material";
import WaitingEvalues from "./ProfileTables/WaitingEvalues";
import Card from "@mui/material/Card";
import { EvalueContext } from "context/evalueVariables";
import { MainStateContext } from "App";

export default function ProfileAlerts({ tmpResult }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { API } = useContext(EvalueContext);
  const mainState = useContext(MainStateContext);
  const [tempResualt, setTempResualt] = useState([]);
  // const [waitingToEvalue, setWaitingToEvalue] = useState(3);
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
    if (tempResualt?.length !== 0) {
      console.log("here");
      setState({
        selfEvalu: mainState.mainState.self_Evalu,
        employeeEvalu: tempResualt?.filter((item) => item.evalu_Part_Type === 0).length,
        employeeMeet: tempResualt?.filter((item) => item.evalu_Part_Type === 1).length,
        employeeCalender: 0,
      })
    }

  }, [tempResualt])
  console.log(mainState);

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

  // // GET the employee status under a manager
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   if (mainState.mainState.userNum) {
  //     fetch(
  //       API.apiGetEmployeeStatus + mainState.mainState.userNum,
  //       {
  //         method: "GET",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Accept: "application/json; charset=UTF-8",
  //         }),
  //         signal: abortController.signal,
  //       })
  //       .then(async (response) => {
  //         const data = await response.json();
  //         console.log(response);

  //         if (!response.ok) {
  //           // get error message from body or default to response statusText
  //           const error = (data && data.message) || response.statusText;
  //           return Promise.reject(error);
  //         }

  //         return data;
  //       })
  //       .then(
  //         (result) => {
  //           console.log("success");
  //           console.log(result);
  //           setTempResualt(result);
  //         },
  //         (error) => {
  //           console.log(error);
  //           if (error.name === "AbortError") return;
  //           console.log("err get=", error);
  //           throw error;
  //         }
  //       );
  //     return () => {
  //       abortController.abort();
  //       // stop the query by aborting on the AbortController on unmount
  //     };
  //   }
  // }, [mainState.mainState.userNum]);

  const handleAlarmClick = () => {
    let tmp = tempResualt?.filter((item) => item.evalu_Part_Type === 0);
    setData(tmp);
    if (tmp.length !== 0) {
      setIsPopupOpen(true);
    }
  };

  const handleMeetingClick = () => {
    let tmp = tempResualt?.filter((item) => item.evalu_Part_Type === 1);
    setData(tmp);
    if (tmp.length !== 0) {
      setIsPopupOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Card sx={{ backgroundColor: "#effafb82", minWidth: "600px" }}>
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
                <CalendarToday fontSize="large" style={{ cursor: "pointer" }} />
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
          <WaitingEvalues data={data} />
        </DialogContent>
      </Dialog>
    </>
  );
}
