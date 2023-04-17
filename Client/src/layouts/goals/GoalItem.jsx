import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
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
      {console.log(tableHead+"lll")}

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
          <IconButton color="primary" onClick={() => setShowUpdateGoalDialog((e) => !e)}>
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
                      {goal.employees?.map((employee) => (
                        <TableRow key={employee.userNum}>
                        
                          <TableCell align="left">{employee.date}</TableCell>
                          <TableCell align="left">{employee.userLName} {employee.userFName}</TableCell>
                          <TableCell align="left">{employee.goalStatus}</TableCell>
                        </TableRow>
                      ))}   
                  </TableHead>
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
