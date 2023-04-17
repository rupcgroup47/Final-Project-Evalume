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

export default function ProfileAlerts(props) {
  const { alerts } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { API } = useContext(EvalueContext);
  const mainState = useContext(MainStateContext);
  const [tempResualt, setTempResualt] = useState([]);
    // {
    //   userNum: 2,//user id
    //   userFName: "נועה ",
    //   userLName: "פרקש",
    //   answerInsertDate: "2022-04-15 00:00",
    //   evalu_Part_Type: 0,
    //   questionnaireNum: 15,
    // },
    // {
    //   userNum: 14,//user id
    //   userFName: "דורית ",
    //   userLName: "שבח",
    //   answerInsertDate: "2022-04-15 00:00",
    //   evalu_Part_Type: 1,
    //   questionnaireNum: 15,
    // }
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => { //filtered the alerts by type
    if (!mainState.mainState.userType) {
      setFilteredAlerts(alerts.filter(({ forManager }) => !forManager));
    }
    else {
      setFilteredAlerts(alerts);
    }
  }, [])

  // // GET the employee status under a manager
  useEffect(() => {
    const abortController = new AbortController();
    if (mainState.mainState.userNum) {
      fetch(
        API.apiGetEmployeeStatus + mainState.mainState.userNum,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          signal: abortController.signal,
        })
        .then(async (response) => {
          const data = await response.json();
          console.log(response);

          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          return data;
        })
        .then(
          (result) => {
            console.log("success");
            setTempResualt(result);
          },
          (error) => {
            console.log(error);
            if (error.name === "AbortError") return;
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    }
  }, []);

  const handleAlarmClick = () => {
    setData(tempResualt.filter((item) => item.evalu_Part_Type === 0));
    setIsPopupOpen(true);
  };

  const handleMeetingClick = () => {
    setData(tempResualt.filter((item) => item.evalu_Part_Type === 1));
    setIsPopupOpen(true);
  };

  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Card sx={{ height: "100%", backgroundColor: "#e6f2ff", paddingTop: "80px", width: "fit-content" }}>
        <MDBox p={2}>
          {filteredAlerts?.map((item, index) => (
            <MDTypography variant="h2" color="secondary" key={index}>
              {index === 0 ? (
                <AssignmentIndIcon fontSize="large" />
              ) : index === 1 ? (
                <AccessAlarmIcon onClick={handleAlarmClick} fontSize="large" />
              ) : index === 2 ? (
                <PeopleIcon onClick={handleMeetingClick} fontSize="large" />
              ) : index === 3 ? (
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
