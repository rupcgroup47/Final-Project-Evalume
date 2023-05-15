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
import { useEffect, useState, useContext } from "react";
import { EvalueContext } from "context/evalueVariables";
// import { MainStateContext } from "App";

export default function CreateOrUpdateGoalDialog({ open, setOpen, setGoals, setItems, goal, initGoalName, condition, fromFeedback }) {
  const [newGoalName, setNewGoalName] = useState(initGoalName);
  const [update, setUpdate] = useState(false);
  const [post, setPost] = useState(false);
  const goalStatusArr = [{ is_Active: 1, name: "פעיל" }, { is_Active: 0, name: "לא פעיל" }];
  const [selectedStatus, setSelectedStatus] = useState(1);
  const { API } = useContext(EvalueContext);
  // const { mainState, setMainState } = useContext(MainStateContext);
  const [newGoal, setNewGoal] = useState();

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
      setValue("goalName", initGoalName);
      setNewGoalName(initGoalName)
    }
  }, [goal, open]);

  const changeHandler = (e) => {
    // Catch the values from input
    setNewGoalName(e.target.value);
  };

  const onSubmit = () => {
    console.log("name");
    console.log(newGoalName);

    if (goal) {
      if (newGoalName !== null) {
        console.log(newGoal);
        setNewGoal({
          goalNum: goal.goalNum,
          goalName: newGoalName,
          is_Active: selectedStatus
        });
      }
      else {
        console.log(newGoal);
        setNewGoal({
          goalNum: goal.goalNum,
          goalName: goal.goalName,
          is_Active: selectedStatus
        });
      }
      setUpdate(true);
    } else {
      setNewGoal({
        goalNum: 0,
        goalName: newGoalName,
        is_Active: selectedStatus
      });
      setPost(true);
    }

    // setOpen((e) => !e);
    // reset();
    console.log(newGoal);
  };


  //update Goal using PUT api
  useEffect(() => {
    const abortController = new AbortController();
    if (update !== false) {
      console.log("here");
      fetch(
        API.apiUpdateGoal + newGoal.goalNum + "/goalActive/" + newGoal.is_Active, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(newGoal.goalName),
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
            console.log("success" + result);
            if (result == -1) {
              swal({
                title: "פעולה בוטלה!",
                text: "נראה כי שם היעד כבר קיים במערכת",
                icon: "error",
                button: "סגור"
              });
            }
            else {
              setGoals((array) =>
                array.map((item) => (item.goalName === goal.goalName ? { ...item, ...newGoal } : item))
              );
              setItems((array) =>
                array.map((item) => (item.goalName === goal.goalName ? { ...item, ...newGoal } : item))
              );
              swal({
                title: "הצלחנו!",
                text: "היעד עודכן בהצלחה",
                icon: "success",
                button: "סגור"
              });
            }
            setNewGoal({});
            setUpdate(false);
            setOpen((e) => !e);
            reset();
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err put=", error);
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
    }
  }, [update]);

  // Post new Goal
  useEffect(() => {
    const abortController = new AbortController();
    if (post !== false) {
      console.log("here2");
      fetch(
        API.apiInsertNewGoal + newGoal.is_Active, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(newGoal.goalName),
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
            console.log("success" + result);
            if (result == -1) {
              swal({
                title: "פעולה בוטלה!",
                text: "נראה כי שם היעד כבר קיים במערכת",
                icon: "error",
                button: "סגור"
              });
            }
            else {
              const NewGoalRes = {
                goalNum: result,
                goalName: newGoalName,
                is_Active: 1
              };
              //Add new goal at the end of the array
              if(fromFeedback){
                setGoals((oldArray) => [...oldArray, NewGoalRes]);
              }
              else{
                setGoals((oldArray) => [...oldArray, NewGoalRes]);
                setItems((oldArray) => [...oldArray, NewGoalRes]);
              }
              swal({
                title: "הצלחנו!",
                text: "היעד נוסף בהצלחה",
                icon: "success",
                button: "סגור"
              });
            }
            setNewGoal({});
            setPost(false);
            setOpen((e) => !e);
            reset();
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err put=", error);
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
    }
  }, [post]);

  console.log(newGoal);

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
                sx={{ m: 0, width: "100%" }} />
                <Select
                  labelId="status-label"
                  id="status"
                  label="סטטוס"
                  style={{ height: "2.6375em", alignContent: "center" }}
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  {goalStatusArr.map((status, index) => (
                    <MenuItem key={index} value={status.is_Active}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </> : <TextField
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
                  <MenuItem key={index} value={status.is_Active}>
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
