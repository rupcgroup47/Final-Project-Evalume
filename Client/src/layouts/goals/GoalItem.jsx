import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CloseDialog from "dialog/CloseDialog";
import CreateOrUpdateGoalDialog from "dialog/CreateOrUpdateGoalDialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { EvalueContext } from "context/evalueVariables";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select
} from "@mui/material";


export default function GoalItem({
  goals,
  setGoals,
  setItems,
  goal,
  tableHead,
  onChangeButtonClick,
}) {
  const [showUpdateGoalDialog, setShowUpdateGoalDialog] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogParticipantIndex, setDialogParticipantIndex] = useState(null);
  const { API } = useContext(EvalueContext);
  const [updatedGoal, setUpdatedGoal] = useState(goal);
  const goalStatusArr = ["בוצע", "בתהליך", "חדש"];
  const [selectedStatus, setSelectedStatus] = useState('');
  const [tmpStatusIndex, setTmpStatusIndex] = useState(-1);
  const [goalName, setGoalName] = useState(null);

  const handleOpenDialog = (participantIndex) => {
    setDialogParticipantIndex(participantIndex);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Function to handle status change in the dialog
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };


  // Function to save the updated status in the dialog
  const handleSaveStatus = (participantIndex) => {
    setTmpStatusIndex(participantIndex);
    // handleUpdateStatus(participantIndex, selectedStatus);
    // setSelectedStatus('');
  };


  // POST all the new selected status for the employee
  useEffect(() => {
    const abortController = new AbortController();
    if (tmpStatusIndex > -1) {
      console.log("here")
      console.log(goal.employees[tmpStatusIndex]?.userNum);
      console.log(goal.goalNum);
      console.log(selectedStatus);
      fetch(
        API.apiUpdateGoalStatus + goal.employees[tmpStatusIndex].userNum + "/goalNum/" + goal.goalNum,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(selectedStatus),
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
            swal({
              title: "הצלחנו!",
              text: "הסטטוס עודכן בהצלחה",
              icon: "success",
              button: "סגור"
            });
            handleUpdateStatus(tmpStatusIndex, selectedStatus);
          },
          (error) => {
            if (error.name === 'AbortError') return
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
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
    }
  }, [tmpStatusIndex]);


  // Function to update the updated status in employee
  const handleUpdateStatus = (participantIndex, newStatus) => {
    const updatedParticipants = [...goal.employees];
    console.log(...goal.employees)
    console.log(dialogParticipantIndex)
    updatedParticipants[participantIndex].goalStatus = newStatus;

    const newGoal = { ...updatedGoal, employees: updatedParticipants };
    setUpdatedGoal(newGoal);
    setSelectedStatus('');
    setTmpStatusIndex(-1);
    handleCloseDialog();
  };

  const handleEdit = (goalName) => {
    setShowUpdateGoalDialog(true);
    setGoalName(goalName);
  }


  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1}>
        {tableHead.find((i) => i.id === "goalName").show && (
          <>
            <TableCell component="th" scope="row" padding="none">
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              {/* // receive the goal name from the goals array */}
              {goal.goalName}
            </TableCell>
          </>
        )}

        <TableCell align="right">
          <IconButton color="primary" onClick={() => handleEdit(goal.goalName)}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setShowCloseDialog((e) => !e)}>
            {/* <DeleteRoundedIcon /> */}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                משתתפים
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">תאריך</TableCell>
                    <TableCell align="left">שם משתמש</TableCell>
                    <TableCell align="left">סטטוס</TableCell>
                  </TableRow>
                  {goal.employees?.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{employee.date.slice(0, 10).replace(/-/g, "/")}</TableCell>
                      <TableCell align="left">{employee.userLName} {employee.userFName}</TableCell>
                      <TableCell align="left">{employee.goalStatus}</TableCell>
                      <TableCell align="right">
                        <IconButton color="info" onClick={() => handleOpenDialog(index)}>
                          <EditRoundedIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => setShowCloseDialog((e) => !e)}>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>



      {isDialogOpen && (
        <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
          <DialogTitle>עריכת סטטוס</DialogTitle>
          <DialogContent>
            <Select
              labelId="status-label"
              id="status"
              label="סטטוס"
              style={{ height: "2.6375em", margin: "auto", display: "flex", maxWidth: "80%" }}
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              {goalStatusArr.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>ביטול</Button>
            <Button onClick={() => handleSaveStatus(dialogParticipantIndex)}>
              שמירה
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <CreateOrUpdateGoalDialog
        open={showUpdateGoalDialog}
        setOpen={setShowUpdateGoalDialog}
        goal={goal}
        initGoalName={goalName}
        goals={goals}
        setGoals={setGoals}
        setItems={setItems}
      />

      <CloseDialog
        open={showCloseDialog}
        setOpen={setShowCloseDialog}
        onClick={() => {
          onChangeButtonClick();
          setShowCloseDialog((e) => !e);
        }}
      />
    </>
  );
}
