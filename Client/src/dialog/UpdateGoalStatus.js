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
  const goalStatusArr = ["בוצע", "בתהליך", "עוד לא התחיל"];

  export default function UpdateGoalStatus({ open, setOpen, setGoals, setItems, goal }) {
    const [newGoalName, setNewGoalName] = useState("")
    const [status, setStatus] = useState("");

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: {
        goalName: "",
      },
    });
  
    useEffect(() => {
      if (open === true) {
        setValue("goalName",newGoalName);
      }
    }, [goal, open]);
    const changeHandler = (e) => {
      // Catch the values from input
      setNewGoalName(e.target.value);
    };
    const onSubmit = () => {
      const newGoal = {
        id: Math.random().toString(36).substr(2, 9),
        goalName: newGoalName,
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
        <DialogTitle sx={{ fontWeight: 600 }}>עדכן סטטוס</DialogTitle>
  
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
            <Select
              labelId="status-label"
              id="status"
              label="סטטוס"
              {...register("status", { required: true })}
              style={{ height: "2.6375em", alignContent: "center" }}
              // Handle the change event
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {goalStatusArr.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            </div>
            <button id="submitButton" type="submit" style={{ display: "none" }}>
              עדכן
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
עדכן          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  