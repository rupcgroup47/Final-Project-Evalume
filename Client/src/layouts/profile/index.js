import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import ProfileInfoCard from "./components/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import { useEffect, useState, useContext } from "react";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";
import { useMaterialUIController, setDirection } from "context";
import ApiFetcher from "components/ApiFetcher";

// Data
import ProfileAlerts from "./components/ProfileAlerts";
import ProfileGrid from "./components/ProfileGrid";

function Overview() {
  const [, dispatch] = useMaterialUIController();
  const { mainState, setMainState } = useContext(MainStateContext);
  const { API, setDepState } = useContext(EvalueContext);
  const [evalus, setEvalus] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tmpResult, setTmpResult] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [questionnairesData, setQuestionnairesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //all API calls
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

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
          setError(error);
          console.log(error);
        }
      }
    }
    getDepartment();

    // bring all the user eveluations using GET api
    if (evalus.length === 0 && mainState.userNum) {
      const getEveluations = async () => {
        try {
          const fetchedData = await ApiFetcher(API.apiGetEvaluations + "/" + mainState.userNum, "GET", null);
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
            setError(error);
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
            setError(error);
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
            setError(error);
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
            setMeeting(fetchedData);
          }
        }
        catch (error) {
          if (isMounted) {
            setError(error);
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
            setError(error);
            console.log(error);
          }
        }
      }
      getQuestionnaires();
    }


    return () => {
      isMounted = false;
      setLoading(false);
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
        <Grid container spacing={1} style={{ marginTop: "" }}>
          {/* //Profile card */}
          <Grid
            item
            s={12}
            xl={5}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            style={{ paddingTop: "0px" }}
          >
            <Grid container spacing={5} direction="column" style={{ maxWidth: "450px", alignContent: "center", margin: "auto" }}>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit" }}>
                <ProfileGrid
                  title="הערכות שלי"
                  description="צפייה והורדת כלל ההערכות שלי לאורך השנים"
                  type="evalues"
                  evalus={evalus}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4} style={{ margin: "8px", maxWidth: "inherit", paddingRight: "inherit" }}>
                <ProfileGrid title="יעדים שלי" description="צפייה ועדכון היעדים האישיים שלי" type="goals" goals={goals} />
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
            <ProfileAlerts title="conversations" tmpResult={tmpResult} meeting={meeting} />
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

              // const [state, setState] = useState({
  //   fetch: {
  //     api: "",
  //     method: "",
  //     body: undefined,
  //   },
  //   // evalus: [],
  //   // goals: [],
  //   // tmpResult: [],
  // });

  // // bring all the user eveluations using GET api
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   if (evalus.length === 0 && mainState.userNum) {
  //     fetch(
  //       API.apiGetEvaluations + "/" + mainState.userNum,
  //       {
  //         method: "GET",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Accept: "application/json; charset=UTF-8",
  //         }),
  //         body: state.fetch.body,
  //         signal: abortController.signal
  //       })
  //       .then(async response => {
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
  //           if (result[0].text !== undefined) {
  //             console.log(result[0].text);
  //           }
  //           else {
  //             setEvalus(result);
  //             // setState({ evalus: result });
  //           }
  //         },
  //         (error) => {
  //           if (error.name === 'AbortError') return
  //           console.log("err get=", error);
  //           throw error;
  //         }
  //       );
  //     return () => {
  //       abortController.abort()
  //       // stop the query by aborting on the AbortController on unmount
  //     }
  //   }
  // }, []);

  // GET the employee goals
  // useEffect(() => {
  //   const abortController = new AbortController()
  //   if (goals.length === 0 && mainState.userNum) {
  //     fetch(
  //       API.apiGetGoalsByUserNum + mainState.userNum,
  //       {
  //         method: "GET",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Accept: "application/json; charset=UTF-8",
  //         }),
  //         body: state.fetch.body,
  //         signal: abortController.signal
  //       })
  //       .then(async response => {
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
  //           setGoals(result);
  //           // setState({ goals: result });
  //         },
  //         (error) => {
  //           if (error.name === 'AbortError') return
  //           console.log("err get=", error);
  //           throw error;
  //         }
  //       );
  //     return () => {
  //       abortController.abort()
  //       // stop the query by aborting on the AbortController on unmount
  //     }
  //   }
  // }, []);

  // GET the employee status under a manager
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   if (tmpResult.length === 0 && mainState.userNum) {
  //     fetch(
  //       API.apiGetEmployeeStatus + mainState.userNum,
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
  //           setTmpResult(result);
  //           // setState({ tmpResult: result });
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
  // }, []);

  // GET all the Questionnaires to the button
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   if (evalus.length === 0) {
  //     fetch(
  //       API.apiGetEvaluations,
  //       {
  //         method: "GET",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Accept: "application/json; charset=UTF-8",
  //         }),
  //         body: state.fetch.body,
  //         signal: abortController.signal
  //       })
  //       .then(async response => {
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
  //           if (result[0].text !== undefined) {
  //             console.log(result[0].text);
  //           }
  //           else {
  //             setQuestionnairesData(result);
  //             // setState({ evalus: result });
  //           }
  //         },
  //         (error) => {
  //           if (error.name === 'AbortError') return
  //           console.log("err get=", error);
  //           throw error;
  //         }
  //       );
  //     return () => {
  //       abortController.abort()
  //       // stop the query by aborting on the AbortController on unmount
  //     }
  //   }
  // }, []);