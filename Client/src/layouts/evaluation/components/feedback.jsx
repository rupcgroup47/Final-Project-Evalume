import React, { useState, useEffect, useContext } from "react";
import { useMaterialUIController, setDirection } from "context";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Paper, Box, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from "date-fns/locale/he";
registerLocale("he", he);

export default function Feedback({ employeeId, managerId }) {
  const [, dispatch] = useMaterialUIController();
  const classes = useStyles();
  const goalNames = [
    { id: 1, name: "קורס אקסל" },
    { id: 2, name: "קורס נגרות" },
  ];

  const [rows, setRows] = useState([]); //Format to display table
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [notFormattedDate, setNotFormattedData] = useState();
  const [feedbackManager, setFeedbackManager] = useState("");
  const [feedbackEmployee, setfeedbackEmployee] = useState("");
  const [finalFeedbackForm, setFinalfeedbackForm] = useState(null);
  const [allGoals, setAllGoals] = useState([]); //Format to send to the server
  const [surveyId, setSurveyId] = useState(1);
  const step =2;
  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (newValue) => {
    const formattedDate = newValue.toISOString().slice(0, 10).replace(/-/g, "/");
    setDate(formattedDate);
    // setNotFormattedData(newValue)
  };

  const handleAddRow = () => {
    ///adding new goal to employee
    const selectedId = goalNames.find((option) => option.name === name)?.id; //checking the  id of the chosen goal
    setRows([...rows, { name: name, date: date }]); //Format to display table
    setAllGoals([...allGoals, { id: selectedId, date: date }]); //Format to send to the server
    setName("");
    setDate("");
    console.log(allGoals);
  };

  function sendFeedbackToServer() {
    return { surveyId, managerId, employeeId,step, feedbackEmployee, feedbackManager, allGoals };
  }

  function handleSubmit() {
    //create feedback obj form
    const newObj = sendFeedbackToServer();
    setFinalfeedbackForm({ ...newObj });
    console.log(newObj)
  }

  return (
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
                style: { fontSize: 20, height: "150px", width: "550px" },
              }}
              multiline
              maxRows={3}
              value={feedbackManager}
              onChange={(event) => setFeedbackManager(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign="center">חוות דעת עובד</Typography>
          <Box textAlign="center">
            <TextField
              label="הוסף מלל"
              InputProps={{
                style: { fontSize: 20, height: "150px", width: "550px" },
              }}
              multiline
              maxRows={3}
              value={feedbackEmployee}
              onChange={(event) => setfeedbackEmployee(event.target.value)}
            />
          </Box>
        </Grid>{" "}
        <Grid item xs={12}>
          <Typography textAlign="center">הצבת יעדים</Typography>
          <Box textAlign="center">
            <div>
              <select value={name} onChange={handleNameChange}>
                <option value="">---בחירת יעד---</option>
                {goalNames.map((goal) => (
                  <option key={goal.id} value={goal.name}>
                    {goal.name}
                  </option>
                ))}
              </select>

              <DatePicker label="תאריך יעד" value={date} locale="he" onChange={handleDateChange} />
              <Button
                variant="contained"
                color="white"
                className={classes.button}
                onClick={handleAddRow}
              >
                יצירת יעד לעובד{" "}
              </Button>
            </div>
            <TableContainer sx={{ width: "50%", display: "inline-table" }}>
              <Table>
                <TableHead sx={{ display: "table-header-group" }}>
                  <TableRow>
                    <TableCell>שם היעד</TableCell>
                    <TableCell>תאריך</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(
                    (
                      row,
                      index //render all the added goals
                    ) => (
                      <TableRow key={index}>
                        <TableCell style={{ width: "50%" }}>{row.name}</TableCell>
                        <TableCell style={{ width: "50%" }}>{row.date}</TableCell>
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
    </Paper>
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
