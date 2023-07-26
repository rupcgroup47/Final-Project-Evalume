/* eslint-disable */

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Header from "layouts/profile/components/Header";
import { useEffect, useState, useContext } from "react";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";
import { useMaterialUIController, setDirection } from "context";
import ApiFetcher from "components/ApiFetcher";

// Data
import ProfileAlerts from "./components/ProfileAlerts";
import ProfileGrid from "./components/ProfileGrid";
import KPIRating from "./components/KPI";

function Overview() {
  const [, dispatch] = useMaterialUIController();
  const { mainState } = useContext(MainStateContext);
  const { API, setDepState, setMeetings } = useContext(EvalueContext);
  const [evalus, setEvalus] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tmpResult, setTmpResult] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [questionnairesData, setQuestionnairesData] = useState([]);
  const [selfKPI, setSelfKPI] = useState([]);

  //  all API calls
  useEffect(() => {
    let isMounted = true;

    // Get importent details and set the main context
    const getDepartment = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiDeprUrl, "GET", null);
        if (isMounted) {
          console.log("success");
          if (!localStorage.getItem("Department list")) {
            localStorage.setItem("Department list", JSON.stringify(fetchedData));
          }
          setDepState(fetchedData.map((index) => (index.depName)));
        }
      }
      catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }
    getDepartment();

    // bring all the user eveluations using GET api
    if (evalus.length === 0 && mainState.userNum) {
      const getEveluations = async () => {
        try {
          const fetchedData = await ApiFetcher(`${API.apiGetEvaluations}/${mainState.userNum}`, "GET", null);
          if (isMounted) {
            console.log("success");
            if (fetchedData[0].text !== undefined) {
              console.log(fetchedData[0].text);
            }
            else {
              setEvalus(fetchedData);
            }
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
          }
        }
      }
      getEveluations();
    }

    // GET the employee goals
    if (goals.length === 0 && mainState.userNum) {
      const getGoals = async () => {
        try {
          const fetchedData = await ApiFetcher(API.apiGetGoalsByUserNum + mainState.userNum, "GET", null);
          if (isMounted) {
            console.log("success");
            setGoals(fetchedData);
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
          }
        }
      }
      getGoals();
    }

    // GET the employee status under a manager
    if (evalus.length === 0 && mainState.userNum) {
      const getEmployeeStatus = async () => {
        try {
          const fetchedData = await ApiFetcher(API.apiGetEmployeeStatus + mainState.userNum, "GET", null);
          if (isMounted) {
            console.log("success");
            setTmpResult(fetchedData);
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
          }
        }
      }
      getEmployeeStatus();
    }

    // GET the employee status that needs a meeting to be set up
    if (evalus.length === 0 && mainState.userNum) {
      const getEmployeeStatusMeeting = async () => {
        try {
          const fetchedData = await ApiFetcher(API.apiStatusMeeting + mainState.userNum, "GET", null);
          if (isMounted) {
            console.log("success");
            console.log("meeting",fetchedData)
            setMeeting(fetchedData);
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
          }
        }
      }
      getEmployeeStatusMeeting();
    }

    // GET all the Questionnaires to the button
    if (evalus.length === 0) {
      const getQuestionnaires = async () => {
        try {
          const fetchedData = await ApiFetcher(API.apiGetEvaluations, "GET", null);
          if (isMounted) {
            console.log("success");
            if (fetchedData[0].text !== undefined) {
              console.log(fetchedData[0].text);
            }
            else {
              setQuestionnairesData(fetchedData);
              // setState({ evalus: result });
            }
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
          }
        }
      }
      getQuestionnaires();
    }

    // GET the avg score of the employee VS to the avg score of the manager by current year
    if (mainState.userNum) {
      const getEmployeeVSManager = async () => {
        try {
          const fetchedData = await ApiFetcher(API.apiSelfKPI + mainState.userNum, "GET", null);
          if (isMounted) {
            console.log("success");
            setSelfKPI(fetchedData);
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
          }
        }
      }
      getEmployeeVSManager();
    }

    // GET the meetings details
    if (mainState.userNum) {
      const getMeeting = async () => {
        try {
          const fetchedData = await ApiFetcher(API.apiMeetings + mainState.userNum, "GET", null);
          if (isMounted) {
            console.log("success");
            console.log("meet", fetchedData);
            setMeetings(fetchedData);
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
          }
        }
      }
      getMeeting();
    }


    return () => {
      isMounted = false;
    }
  }, []);


  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <Header questionnairesData={questionnairesData}>
      <MDBox mt={3} mb={3}>
        <Grid container spacing={1} style={{ marginRight: "0px", width: "auto" }}>
          {/* //Profile card */}
          <Grid
            item
            s={12}
            xl={5}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "100%" }}
            style={{ paddingTop: "0px", paddingRight: "0px" }}
          >
            <Grid container spacing={5} direction="column"
              style={
                {
                  maxWidth: "100%",
                  alignContent: "space-around",
                  margin: "auto",
                  justifyContent: "space-evenly",
                  display: "flex",
                  alignItems: "stretch",
                  flexWrap: "wrap",
                  minHeight: "-webkit-fill-available"
                }
              }>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit", paddingTop: "0px" }}>
                <ProfileGrid
                  title="הערכות שלי"
                  description="צפייה והורדת כלל ההערכות שלי לאורך השנים"
                  type="evalues"
                  evalus={evalus}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit", paddingTop: "0px" }}>
                <ProfileGrid title="יעדים שלי" description="צפייה ועדכון היעדים האישיים שלי" type="goals" goals={goals} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit", paddingTop: "0px" }}>
                <ProfileGrid title="יומן פגישות" description="צפייה בפגישות שלי" />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            s={12}
            xl={7}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "100%" }}
            style={{ paddingTop: "0px", paddingRight: "0px" }}
          >
            <Grid container spacing={5} direction="column" style={{ maxWidth: "100%", alignContent: "center", margin: "auto" }}>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit", paddingTop: "inherit" }}>
                <ProfileAlerts title="conversations" tmpResult={tmpResult} meeting={meeting} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit", paddingTop: "inherit" }}>
                <KPIRating selfKPI={selfKPI} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Header>
  );
}

export default Overview;
