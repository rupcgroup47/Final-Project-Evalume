import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import ProfileInfoCard from "./components/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import { useEffect, useState, useContext } from "react";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";
import { useMaterialUIController, setDirection } from "context";

// import swal from 'sweetalert';

// import OpenEvaluation from "./components/Header/openEvaluation";
// Data
import ProfileAlerts from "./components/ProfileAlerts";
import ProfileGrid from "./components/ProfileGrid";

function Overview() {
  const [, dispatch] = useMaterialUIController();
  const { mainState, setMainState } = useContext(MainStateContext);
  const { API } = useContext(EvalueContext);
  const [evalus, setEvalus] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tmpResult, setTmpResult] = useState([]);
  const [questionnairesData, setQuestionnairesData] = useState([]);
  const [state, setState] = useState({
    fetch: {
      api: "",
      method: "",
      body: undefined,
    },
    // evalus: [],
    // goals: [],
    // tmpResult: [],
  });

  // bring all the user eveluations using GET api
  useEffect(() => {
    const abortController = new AbortController();
    if (evalus.length === 0 && mainState.userNum) {
      fetch(
        API.apiGetEvaluations + "/" + mainState.userNum,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: state.fetch.body,
          signal: abortController.signal
        })
        .then(async response => {
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
            if (result[0].text !== undefined) {
              console.log(result[0].text);
            }
            else {
              setEvalus(result);
              // setState({ evalus: result });
            }
          },
          (error) => {
            if (error.name === 'AbortError') return
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
    }
  }, []);

  // GET the employee goals
  useEffect(() => {
    const abortController = new AbortController()
    if (goals.length === 0 && mainState.userNum) {
      fetch(
        API.apiGetGoalsByUserNum + mainState.userNum,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: state.fetch.body,
          signal: abortController.signal
        })
        .then(async response => {
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
            console.log(result);
            setGoals(result);
            // setState({ goals: result });
          },
          (error) => {
            if (error.name === 'AbortError') return
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
    }
  }, []);

  // GET the employee status under a manager
  useEffect(() => {
    const abortController = new AbortController();
    if (tmpResult.length === 0 && mainState.userNum) {
      fetch(
        API.apiGetEmployeeStatus + mainState.userNum,
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
            setTmpResult(result);
            // setState({ tmpResult: result });
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

  // GET all the Questionnaires to the button
  useEffect(() => {
    const abortController = new AbortController();
    if (evalus.length === 0) {
      fetch(
        API.apiGetEvaluations,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: state.fetch.body,
          signal: abortController.signal
        })
        .then(async response => {
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
            if (result[0].text !== undefined) {
              console.log(result[0].text);
            }
            else {
              setQuestionnairesData(result);
              // setState({ evalus: result });
            }
          },
          (error) => {
            if (error.name === 'AbortError') return
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
    }
  }, []);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  // console.log(questionnairesData);

  return (
    <Header questionnairesData={questionnairesData}>
      <MDBox mt={3} mb={3}>
        <Grid container spacing={1} style={{marginTop: ""}}>
          {/* //Profile card */}
          <Grid
            item
            s={12}
            xl={5}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            style={{paddingTop:"0px"}}
          >
            <Grid container spacing={5} direction="column" style={{ maxWidth: "450px", alignContent: "center", margin: "auto" }}>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit" }}>
                <ProfileGrid
                  title="הערכות"
                  description="צפייה והורדת כלל ההערכות שלי לאורך השנים"
                  type="evalues"
                  evalus={evalus}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit" }}>
                <ProfileGrid title="יעדים" description="צפייה ועדכון היעדים האישיים שלי" type="goals" goals={goals} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit" }}>
                <ProfileGrid title="יומן פגישות" description="צפייה בפגישות שלי" />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            s={12}
            xl={7}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <ProfileAlerts title="conversations" tmpResult={tmpResult} />
            {/* alerts={alerts} */}
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox p={2}>

      </MDBox> */}
    </Header>
  );
}

export default Overview;

{/* <ProfileInfoCard
              title="פרטים אישיים"
              info={{
                שם: `${mainState.userFName} ${mainState.userLName}`,
                טלפון: `${mainState.userPhoneNum}`,
                אימייל: `${mainState.userEmail}`,
                תז: `${mainState.userId}`,
                מחלקה: `${mainState.userDepartment}`,
                תפקיד: `${mainState.userRole}`,
                מנהל: `${mainState.managerFname} ${mainState.managerLName}`,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} /> */}