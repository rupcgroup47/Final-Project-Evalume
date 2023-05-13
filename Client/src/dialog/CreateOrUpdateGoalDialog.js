/*
This is a React component that creates a dialog box for creating a new user. The component uses Material UI library for its UI components.

The component accepts several props including open, setOpen, setUsers, and setItems. These props are used to control the state of the dialog box and update the list of users and items when a new user is created.

The component also uses the useForm hook from the react-hook-form library to manage form state and validation. The useState hook is also used to manage the state of the gender, department, job, and avatar fields.

The handleSubmit function is called when the form is submitted, and a new user object is created from the form data. The new user object is then added to the list of users and items using the setUsers and setItems functions passed as props.

The component also has several form fields for collecting user data, including a file input for the user's profile picture, text inputs for the user's first and last name, email, and select fields for gender, department, and job.

The handleAvatarChange function is called when a new file is selected for the profile picture input. This function reads the file data and sets the avatar state to the file data.

The isImage function checks if the selected file is an image file.

Overall, this component provides a simple and easy-to-use form for creating new users.
*/

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function CreateOrUpdateGoalDialog({ open, setOpen, setGoals, setItems, goal,initGoalName, condition }) {
  const [newGoalName, setNewGoalName] = useState(initGoalName);
  const goalStatusArr = [{isActive:1,name:"פעיל"},{isActive:0, name:"לא פעיל"}];
  const [selectedStatus, setSelectedStatus] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      goalName: initGoalName,
    },
  });

  // Function to handle status change in the dialog
  const handleStatusChange = (event) => {
   setSelectedStatus(event.target.value);
  };


  useEffect(() => {
    if (open === true) {
      setValue("goalName",initGoalName);
      setNewGoalName(initGoalName)
    }
  }, [goal, open]);
  const changeHandler = (e) => {
    // Catch the values from input
    setNewGoalName(e.target.value);
  };
  const onSubmit = () => {
    const newGoal = {
      goalName: newGoalName,
      isActive: selectedStatus
    };

    if (goal) {
      setGoals((array) =>
        array.map((item) => (item.goalName === goal.goalName ? { ...item, ...newGoal } : item))
      );
      setItems((array) =>
        array.map((item) => (item.goalName === goal.goalName ? { ...item, ...newGoal } : item))
      );
    } else {
      // Add new goal at the end of the array
      setGoals((oldArray) => [...oldArray, newGoal]);
      setItems((oldArray) => [...oldArray, newGoal]);
    }

    setOpen((e) => !e);
    reset();
    console.log(newGoal);
  };

  return (
    <Dialog onClose={() => setOpen((e) => !e)} open={open}>
      <DialogTitle sx={{ fontWeight: 600 }}>{goal ? "ערוך" : "צור"} יעד</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            flex: 1,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            {!goal ? 
            <><TextField
                size="small"
                id="goalName"
                label="שם היעד"
                error={errors.goalName}

                helperText={errors.goalName && "שם יעד הוא שדה חובה"}
                {...register("goalName", { required: true, maxLength: 20 })}
                onChange={changeHandler}
                sx={{ m: 0, width: "100%" }} /><Select
                  labelId="status-label"
                  id="status"
                  label="סטטוס"
                  style={{ height: "2.6375em", alignContent: "center" }}
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  {goalStatusArr.map((status, index) => (
                    <MenuItem key={index} value={status.isActive}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select></> :
          <TextField
          size="small"
          id="goalName"
          value={newGoalName}
          onChange={changeHandler}
          sx={{ m: 0, width: "100%" }}
        />
            }
            

            {goal && condition ?
            <Select
            labelId="status-label"
            id="status"
            label="סטטוס"
            style={{ height: "2.6375em", alignContent: "center" }}
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            {goalStatusArr.map((status, index) => (
              <MenuItem key={index} value={status.isActive}>
                {status.name}
              </MenuItem>
            ))}
          </Select>
           : ""}
          </div>
          <button id="submitButton" type="submit" style={{ display: "none" }}>
            יצירה
          </button>
        </form>
      </DialogContent>

      <DialogActions sx={{ mr: 2, mb: 2, p: 1, display: "flex", gap: 1 }}>
        <Button
          sx={{
            fontWeight: 500,
            textTransform: "none",
            bgcolor: "#d32f2f26",
            pl: 2,
            pr: 2,
            "&:hover": {
              bgcolor: "#d32f2f40",
            },
          }}
          color="error"
          onClick={() => setOpen(false)}
        >
          ביטול
        </Button>
        <Button
          sx={{
            fontWeight: 600,
            textTransform: "none",
            bgcolor: "#1976d226",
            pl: 4,
            pr: 4,
            "&:hover": {
              bgcolor: "#1976d240",
            },
          }}
          color="primary"
          onClick={() => document.getElementById("submitButton").click()}
          autoFocus
        >
          {goal ? "עריכה" : "יצירה"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
