/*
This is a React functional component that renders a table row with user information. The component takes in several props:

user: an object containing user information (such as first name, last name, email, gender, department, and job).
tableHead: an array of objects that define the table header, including which columns to show.
onRemoveButtonClick: a function to be called when the "Delete" button is clicked.

The component uses the useState hook to manage the state of the showCloseDialog variable, which controls whether or not the "Delete" confirmation dialog is shown.

The component then renders a TableRow component with several TableCell components containing user information. The IconButton components with the "Edit" and "Delete" icons allow the user to edit or delete the user information. Clicking the "Delete" button sets the showCloseDialog state to true, which shows the "Delete" confirmation dialog.

The CloseDialog component is rendered outside of the TableRow component, and is conditionally shown when showCloseDialog is true. The CloseDialog component shows a confirmation dialog asking the user if they are sure they want to delete the user, and provides two buttons: "Cancel" and "Delete". If the user clicks the "Delete" button, the onRemoveButtonClick function is called (which presumably removes the user from the table), and showCloseDialog is set to false, hiding the dialog.
*/
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CloseDialog from "dialog/CloseDialog";
import CreateOrUpdateGoalDialog from "dialog/CreateOrUpdateGoalDialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function GoalItem({
  goals,
  setGoals,
  setItems,
  goal,
  tableHead,
  onRemoveButtonClick,
}) {
  const [showUpdateGoalDialog, setShowUpdateGoalDialog] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1}>
        {tableHead.find((i) => i.id === "goalName").show && (
          <>           
            <TableCell component="th" scope="row" padding="none">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              {goal.goalName}
            </TableCell>
          </>
        )}

        <TableCell align="right">
          <IconButton color="primary" onClick={() => setShowUpdateGoalDialog((e) => !e)}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setShowCloseDialog((e) => !e)}>
            <DeleteRoundedIcon />
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
                      <TableCell align="right">תאריך</TableCell>
                      <TableCell align="right">שם משתמש</TableCell>
                      <TableCell align="right">הושלם?</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {rowGoals.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row" align="right" style={{display: "-webkit-inline-box"}}>
                          {historyRow.date}
                        </TableCell>
                        <TableCell align="right" style={{display: "-webkit-inline-box"}}>{historyRow.customerId}</TableCell>
                        <TableCell align="right" style={{display: "-webkit-inline-box"}}>{historyRow.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

      <CreateOrUpdateGoalDialog
        open={showUpdateGoalDialog}
        setOpen={setShowUpdateGoalDialog}
        goal={goal}
        goals={goals}
        setGoals={setGoals}
        setItems={setItems}
      />

      <CloseDialog
        open={showCloseDialog}
        setOpen={setShowCloseDialog}
        onClick={() => {
          onRemoveButtonClick();
          setShowCloseDialog((e) => !e);
        }}
      />
    </>
  );
}
