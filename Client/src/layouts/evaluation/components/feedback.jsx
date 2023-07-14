import React, { useState, useEffect, useContext } from "react";
import { useMaterialUIController, setDirection } from "context";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Paper,
  Box,
  Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import he from "date-fns/locale/he";
import DialogSurvey from "./DialogSurvey";
import { EvalueContext } from "context/evalueVariables";
import CreateOrUpdateGoalDialog from "dialog/CreateOrUpdateGoalDialog";

registerLocale("he", he);

export default function Feedback({ userNum, evalu_Part_Type, questionnaireNum }) {
  const [, dispatch] = useMaterialUIController();
  const classes = useStyles();
  const { API } = useContext(EvalueContext);
  const [goalNames, setGoalNames] = useState([]);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [statusMsg, setMsg] = useState("");
  const [finishRouteMsg, setRouteMsg] = useState("");
  const [rows, setRows] = useState([]); //Format to display table
  const [goalName, setGoalName] = useState("");
  const [managerOpinion, setManagerOpinion] = useState("");
  const [employeeOpinion, setEmployeeOpinion] = useState("");
  const [finalFeedbackForm, setFinalfeedbackForm] = useState(null);
  const [allGoals, setAllGoals] = useState([]); //Format to send to the server
  const [showCreateGoalDialog, setShowCreateGoalDialog] = useState(false);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  // GET the all avaliable goals
  useEffect(() => {
    const abortController = new AbortController();
    if (evalu_Part_Type === 2) {
      fetch(
        API.apiGetAllGoals,
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
            if (result.exption === "user has already filled his survey") {
              console.log("not supposed to happand once the list come from the database");
            }
            else {
              setGoalNames(result);
            }
          },
          (error) => {
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

  // Post a new finished Evaluation process using Post api
  useEffect(() => {
    const abortController = new AbortController();
    if (finalFeedbackForm !== null) {
      fetch(
        API.apiPostFinishAll,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(finalFeedbackForm),
          signal: abortController.signal,
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
            console.log("success", result);
            setMsg("תהליך הערכה הסתיים בהצלחה!");
            setRouteMsg("חזרה לדף הבית");
            setShowCloseDialog((e) => !e); // Error dialog message

          },
          (error) => {
            if (error.name === 'AbortError') return;
            console.log("err get=", error);
            swal({
              title: "קרתה תקלה!",
              text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
              icon: "error",
              button: "סגור"
            });
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    };
  }, [finalFeedbackForm]);

  const handleNameChange = (event) => {
    setGoalName(event.target.value);
  };


  const handleAddRow = () => {
    ///adding new goal to employee
    const selectedId = goalNames.find((option) => option.goalName === goalName)?.goalNum; //checking the  id of the chosen goal
    setRows([...rows, { goalName: goalName }]); //Format to display table , date: date
    setAllGoals([...allGoals, { goalNum: selectedId }]); //Format to send to the server , date: date
    setGoalName("");
  };

  function sendFeedbackToServer() {
    return { questionnaireNum, userNum, evalu_Part_Type, employeeOpinion, managerOpinion, allGoals };
  }

  function handleSubmit() {
    //create feedback obj form
    const newObj = sendFeedbackToServer();
    setFinalfeedbackForm({ ...newObj });
  }



  return (
    <>
      <Paper
        sx={{ boxShadow: "none", minWidth: 300, maxWidth: 1200, margin: "auto", marginTop: "50px" }}
      >
        <Grid container direction="row" spacing={3} marginTop="-10px">
          <Grid item xs={12}>
            <Typography textAlign="center">חוות דעת מנהל</Typography>
            <Box textAlign="center">
              <TextField
                label="הוסף מלל"
                InputProps={{
                  style: { fontSize: 20, height: "150px", width: "550px", alignItems: "baseline" },
                }}
                multiline
                maxRows={3}
                value={managerOpinion}
                onChange={(event) => setManagerOpinion(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="center">חוות דעת עובד</Typography>
            <Box textAlign="center">
              <TextField
                label="הוסף מלל"
                InputProps={{
                  style: { fontSize: 20, height: "150px", width: "550px", alignItems: "baseline" },
                }}
                multiline
                maxRows={3}
                value={employeeOpinion}
                onChange={(event) => setEmployeeOpinion(event.target.value)}
              />
            </Box>
          </Grid>{" "}
          <Grid item xs={12}>
            <Typography textAlign="center">הצבת יעדים</Typography>
            <Box textAlign="center">
              <div style={{ display: "grid", rowGap: "20px", maxWidth: "fit-content", margin: "5px auto" }}>
                <div style={{ display: "flex"}}>
                  <select value={goalName} onChange={handleNameChange}>
                    <option value="">---בחירת יעד קיים---</option>
                    {goalNames.map((goal) => (
                      <option key={goal.goalNum} value={goal.goalName}>
                        {goal.goalName}
                      </option>
                    ))}
                  </select>
                  <Box style={{ display: "flex" }}>
                    <Tooltip title="הוספה">
                      <IconButton
                        color="primary"
                        onClick={() => setShowCreateGoalDialog(true)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </div>
                <Button
                  variant="contained"
                  color="white"
                  className={classes.button}
                  onClick={handleAddRow}
                >
                  יצירת יעד לעובד{" "}
                </Button>
              </div>
              <TableContainer sx={{ width: "30%", display: "inline-table" }}>
                <Table>
                  <TableHead sx={{ display: "table-header-group" }}>
                    <TableRow>
                      <TableCell style={{ display: "contents" }}>שם היעד</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(
                      (
                        row,
                        index //render all the added goals
                      ) => (
                        <TableRow key={index}>
                          <TableCell style={{ display: "contents" }}>{row.goalName}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
        <br />
        <Box textAlign="center">
          <Button variant="contained" color="white" onClick={handleSubmit}>
            סיום הערכה שנתית
          </Button>
        </Box>
        <br />
        <DialogSurvey
          open={showCloseDialog}
          setOpen={setShowCloseDialog}
          msg={statusMsg}
          finishRouteMsg={finishRouteMsg}
          onClick={() => {
            setShowCloseDialog((e) => !e);
          }}
        />
      </Paper>
      <CreateOrUpdateGoalDialog
        open={showCreateGoalDialog}
        setOpen={setShowCreateGoalDialog}
        setGoals={setGoalNames}
        fromFeedback={true}
      />
    </>
  );
}
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  input: {
    marginRight: "10px",
  },
  button: {
    marginTop: "10px",
  },
});
