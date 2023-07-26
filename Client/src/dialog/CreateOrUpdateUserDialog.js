/* eslint-disable */

/*
This is a React component that creates a dialog box for creating a new user. The component uses Material UI library for its UI components.

The component accepts several props including open, setOpen, setUsers, and setItems. These props are used to control the state of the dialog box and update the list of users and items when a new user is created.

The component also uses the useForm hook from the react-hook-form library to manage form state and validation. The useState hook is also used to manage the state of the gender, department, and job fields.

The handleSubmit function is called when the form is submitted, and a new user object is created from the form data. The new user object is then added to the list of users and items using the setUsers and setItems functions passed as props.

The component also has several form fields for collecting user data, including a file input for the user"s profile picture, text inputs for the user"s first and last name, email, and select fields for gender, department, and job.

The isImage function checks if the selected file is an image file.

Overall, this component provides a simple and easy-to-use form for creating new users.
*/

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { EvalueContext } from "context/evalueVariables";
import swal from "sweetalert";
import { position } from "stylis";
import { Directions } from "@material-ui/icons";

export default function CreateOrUpdateUserDialog({ open, setOpen, setUsers, setItems, user, setUser, isUserUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    // default setup values for the form
    defaultValues: {
      firstName: "",
      lastName: "",
      id: "",
      phone: "",
      email: "",
      gender: "",
      department: "",
      job: "",
      roleType: "",
      managerFname: "",
      managerLName: "",
      managerEmail: "",
      isActive: "",
      isAdmin: "",
      roleGroup: "",
    },
  });


  // setup variables
  const genders = ["זכר", "נקבה", "אחר"];
  const roleTypes = ["מנהל", "עובד"];
  const roleGroups = ["כללי", "תפעולי", "משרדי"];
  const { API, depState } = useContext(EvalueContext);

  // Use state to store the selected value
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [roleType, setroleType] = useState("");
  const [roleGroup, setroleGroup] = useState("");
  const [isActiveState, setisActiveState] = useState(user ? user?.is_Active : false);
  const [isAdminState, setisAdminState] = useState(user ? user?.is_Admin : false);
  const [putUser, setPutUser] = useState("");
  const [postUser, setPostUser] = useState("");

  //  set the values of the form inputs and the states to be of the selected user if it exist
  useEffect(() => {
    if (open === true) {
      setValue("firstName", user?.userFName);
      setValue("lastName", user?.userLName);
      setValue("id", user?.userId);
      setValue("phone", user?.userPhoneNum);
      setValue("email", user?.userEmail);
      setValue("gender", user?.userGender);
      setValue("department", user?.userDepartment);
      setValue("job", user?.userRole);
      setValue("managerFname", user?.managerFname);
      setValue("managerLName", user?.managerLName);
      setValue("managerEmail", user?.managerEmail);
      setValue("roleType", (user?.userType ? "מנהל" : "עובד"));
      setValue("roleGroup", user?.userRoleGroupDesc);
      setValue("isActive", user?.is_Active);
      setValue("isAdmin", user?.is_Admin);
      setGender(user?.userGender ? user?.userGender : "");
      setDepartment(user?.userDepartment ? user?.userDepartment : "");
      setroleType(user ? (user?.userType ? "מנהל" : "עובד") : "");
      setroleGroup(user?.userRoleGroupDesc ? user?.userRoleGroupDesc : "");
      setisActiveState(user?.is_Active ? true : false);
      setisAdminState(user?.is_Admin ? true : false);
    }
  }, [user, open]);

  //  update user datails using PUT api
  useEffect(() => {
    // Update details
    const abortController = new AbortController();
    if (putUser !== "") {
      fetch(
        API.apiUserUrl + "/" + user?.userNum, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(putUser),
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
            if (isUserUpdate) {
              const put = { userNum: user.userNum, ...putUser }
              console.log(put);
              setUser(put);
            }
            else {
              setUsers((array) =>
                array.map((item) =>
                  item.userNum === user?.userNum ? { ...item, ...putUser } : item
                )
              );
              setItems((array) =>
                array.map((item) =>
                  item.userNum === user?.userNum ? { ...item, ...putUser } : item
                )
              );
            }
            swal({
              title: "הצלחנו!",
              text: "המשתמש עודכן בהצלחה",
              icon: "success",
              button: "סגור"
            });
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
    return () => {
      abortController.abort();
      // stop the query by aborting on the AbortController on unmount
    };
  }, [putUser]);

  //  insert a new user datails using POST api
  useEffect(() => {
    // Update details
    const abortController = new AbortController();
    console.log(postUser);
    if (postUser !== "") {
      fetch(
        API.apiUserUrl,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(postUser),
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
            setUsers((oldArray) => [...oldArray, postUser]);
            setItems((oldArray) => [...oldArray, postUser]);
            swal({
              title: "הצלחנו!",
              text: "המשתמש נוסף בהצלחה",
              icon: "success",
              button: "סגור"
            });
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err get=", error.value);
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
    return () => {
      abortController.abort();
      // stop the query by aborting on the AbortController on unmount
    };
  }, [postUser]);

  //  creating a new user when submiting the form at the targeted varibles type and set the relevant state
  const onSubmit = (data) => {
    const newUser = {
      userEmail: data?.email,
      userId: parseInt(data?.id),
      userFName: data?.firstName,
      userLName: data?.lastName,
      userGender: data?.gender,
      is_Active: ((data?.isActive === "true" || data?.isActive) ? true : false),
      is_Admin: ((data?.isAdmin === "true" || data?.isAdmin) ? true : false),
      userType: (data?.roleType === "מנהל" ? true : false),
      userRole: data?.job,
      userDepartment: data?.department,
      userPhoneNum: parseInt(data?.phone),
      managerFname: data?.managerFname,
      managerLName: data?.managerLName,
      managerEmail: data?.managerEmail,
      userRoleGroupDesc: data?.roleGroup,
    };
    console.log(newUser);

    if (user) {
      // Update a user
      setPutUser(newUser);
    } else {
      // Add new user at the end of the array
      setPostUser(newUser);
    }

    setOpen((e) => !e);
    reset();
  };

  //in case of an error on the validations of the form sending the error to te console
  const onError = (errors, e) => console.log(errors, e);

  return (
    <Dialog onClose={() => setOpen((e) => !e)} open={open}>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {user ? "ערוך" : "צור"} משתמש
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
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
            <TextField
              size="small"
              id="firstName"
              label="שם פרטי"
              error={errors.firstName}
              helperText={errors.firstName && "שם פרטי הוא שדה חובה"}
              {...register("firstName", { required: true, maxLength: 20 })}
              sx={{ m: 0, width: "100%" }}
            />
            <TextField
              size="small"
              id="lastName"
              label="שם משפחה"
              error={errors.lastName}
              helperText={errors.lastName && "שם משפחה הוא שדה חובה"}
              {...register("lastName", { required: true, maxLength: 20 })}
              sx={{ m: 0, width: "100%" }}
            />
          </div>
          <TextField
            size="small"
            id="email"
            label="אימייל"
            type="email"
            error={errors.email}
            helperText={errors.email && "אימייל הוא שדה חובה"}
            {...register("email", {
              required: true,
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "האימייל אינו תקין",
              },
            })}
            sx={{ m: 0, width: "100%" }}
          />
          <TextField
            size="small"
            id="id"
            label="תעודת זהות"
            type="id"
            error={errors.id}
            helperText={errors.id && "תעודת זהות הוא שדה חובה"}
            {...register("id", {
              required: true,
              pattern: {
                value: /^[0-9]{9,9}$/,
                message: "תעודת זהות אינה תקינה",
              },
            })}
            sx={{ m: 0, width: "100%" }}
          />
          <div style={{ display: "inline-flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
            <TextField
              size="small"
              id="kidomet"
              label="קידומת טלפון"
              type="phone"
              value={"+972"}
              sx={{ ml: "15px", width: "fit-content" }}
              style={{ direction: "ltr" }}
              disabled
            />
            <TextField
              size="small"
              id="phone"
              label="מספר טלפון"
              type="phone"
              error={errors.phone}
              helperText={errors.phone && "מספר טלפון הוא שדה חובה"}
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^[0-9]{9,9}$/,
                  message: "מספר טלפון אינו תקין",
                },
              })}
              sx={{ mr: 0, width: "100%" }}
            />
          </div>
          <FormControl
            size="small"
            error={errors.gender}
            sx={{ m: 0, width: "100%" }}
          >
            <InputLabel id="gender-label">מגדר</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              label="מגדר"
              {...register("gender", { required: true })}
              style={{ height: "2.6375em", alignContent: "center" }}
              // Handle the change event
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genders.map((gender1) => (
                <MenuItem key={gender1} value={gender1}>
                  {gender1}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.gender && "מגדר הוא שדה חובה"}
            </FormHelperText>
          </FormControl>
          <FormControl
            size="small"
            error={errors.department}
            sx={{ m: 0, width: "100%" }}
          >
            <InputLabel id="department-label">מחלקה</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              label="מחלקה"
              {...register("department", { required: true })}
              style={{ height: "2.6375em", alignContent: "center" }}
              disabled={isUserUpdate}
              // Handle the change event
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {depState?.map((department1) => (
                <MenuItem key={department1} value={department1}>
                  {department1}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.department && "מחלקה היא שדה חובה"}
            </FormHelperText>
          </FormControl>
          <TextField
            size="small"
            id="job"
            label="תפקיד"
            type="job"
            error={errors.job}
            helperText={errors.job && "תפקיד הוא שדה חובה"}
            {...register("job", { required: true, maxLength: 30 })}
            sx={{ m: 0, width: "100%" }}
            disabled={isUserUpdate}
          />
          <FormControl
            size="small"
            error={errors.roleType}
            sx={{ m: 0, width: "100%" }}
          >
            <InputLabel id="roleType-label">סוג תפקיד</InputLabel>
            <Select
              labelId="roleType-label"
              id="roleType"
              label="סוג תפקיד"
              {...register("roleType", { required: true })}
              style={{ height: "2.6375em", alignContent: "center" }}
              // Handle the change event
              value={roleType}
              onChange={(e) => setroleType(e.target.value)}
              disabled={isUserUpdate}
            >
              {roleTypes.map((roleType1) => (
                <MenuItem key={roleType1} value={roleType1}>
                  {roleType1}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.roleType && "סוג תפקיד הוא שדה חובה"}</FormHelperText>
          </FormControl>
          <FormControl
            size="small"
            error={errors.roleGroup}
            sx={{ m: 0, width: "100%" }}
          >
            <InputLabel id="roleGroup-label">סוג תפקידן</InputLabel>
            <Select
              labelId="roleGroup-label"
              id="roleGroup"
              label="סוג תפקידן"
              {...register("roleGroup", { required: true })}
              style={{ height: "2.6375em", alignContent: "center" }}
              // Handle the change event
              value={roleGroup}
              onChange={(e) => setroleGroup(e.target.value)}
              disabled={isUserUpdate}
            >
              {roleGroups.map((roleGroup1) => (
                <MenuItem key={roleGroup1} value={roleGroup1}>
                  {roleGroup1}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.roleGroup && "סוג תפקידן הוא שדה חובה"}</FormHelperText>
          </FormControl>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <TextField
              size="small"
              id="managerFname"
              label="שם פרטי מנהל"
              error={errors.managerFname}
              helperText={errors.managerFname && "שם פרטי הוא שדה חובה"}
              {...register("managerFname", { required: true, maxLength: 20 })}
              sx={{ m: 0, width: "100%" }}
              disabled={isUserUpdate}
            />
            <TextField
              size="small"
              id="managerLName"
              label="שם משפחה מנהל"
              error={errors.managerLName}
              helperText={errors.managerLName && "שם משפחה הוא שדה חובה"}
              {...register("managerLName", { required: true, maxLength: 20 })}
              sx={{ m: 0, width: "100%" }}
              disabled={isUserUpdate}
            />
          </div>
          <TextField
            size="small"
            id="managerEmail"
            label="אימייל מנהל"
            type="managerEmail"
            error={errors.managerEmail}
            helperText={errors.managerEmail && "אימייל הוא שדה חובה"}
            {...register("managerEmail", {
              required: true,
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "האימייל אינו תקין",
              },
            })}
            sx={{ m: 0, width: "100%" }}
            disabled={isUserUpdate}
          />
          {!isUserUpdate ?
            <><FormControl
              size="small"
              error={errors.isActive}
              sx={{ m: 0, width: "100%" }}
            >
              <FormControlLabel
                value={isActiveState}
                control={<Checkbox
                  inputProps={{ "aria-label": "Checkbox is_Active" }}
                  {...register("isActive")}
                  checked={isActiveState}
                  onChange={(e) => setisActiveState(e.target.checked)}
                />}
                label="פעיל?" />
              <FormHelperText>{errors.isActive && "הפעלה הוא שדה חובה"}</FormHelperText>
            </FormControl>
              <FormControl
                size="small"
                error={errors.isActive}
                sx={{ m: 0, width: "100%" }}
              >
                <FormControlLabel
                  value={isAdminState}
                  control={<Checkbox
                    inputProps={{ "aria-label": "Checkbox is_Admin" }}
                    {...register("isAdmin")}
                    checked={isAdminState}
                    onChange={(e) => setisAdminState(e.target.checked)}
                  />}
                  label="אדמין?"
                />
                <FormHelperText>{errors.isActive && "אדמין הוא שדה חובה"}</FormHelperText>
              </FormControl>
            </>
            : ""}

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
          {user ? "עריכה" : "יצירה"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
