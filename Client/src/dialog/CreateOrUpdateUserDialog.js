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
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";

export default function CreateOrUpdateUserDialog({
  open,
  setOpen,
  setUsers,
  setItems,

  user,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      department: "",
      job: "",
      roleType: "",
      director: "",
      isActive: "",
      isAdmin: "",
      roleGroup: "",
    },
  });
  const avatarValue = watch("avatar");

  useEffect(() => {
    if (open === true) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("email", user?.userEmail);

      setValue("gender", user?.userGender);
      setValue("department", user?.userDepartment);
      setValue("job", user?.userJob);

      setGender(user?.userGender);
      setDepartment(user?.userDepartment);
      setJob(user?.userJob);

      // console.log("User: ", user);
    }
  }, [user, open]);

  const onSubmit = (data) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: data?.firstName,
      lastName: data?.lastName,
      userAvatar: avatar,
      userEmail: data?.email,
      userGender: data?.gender,
      userDepartment: data?.department,
      userJob: data?.job,
    };

    if (user) {
      // Update a user
      setUsers((array) =>
        array.map((item) =>
          item.id === user.id ? { ...item, ...newUser } : item
        )
      );
      setItems((array) =>
        array.map((item) =>
          item.id === user.id ? { ...item, ...newUser } : item
        )
      );
    } else {
      // Add new user at the end of the array
      setUsers((oldArray) => [...oldArray, newUser]);
      setItems((oldArray) => [...oldArray, newUser]);
    }

    setOpen((e) => !e);

    reset();
    setGender();
    setDepartment();
    setJob();

    console.log(data);
  };

  const genders = ["זכר", "נקבה", "אחר"];
  const departments = ["מכירות", "הנהלת חשבונות", "לוגיסטיקה"];
  const jobs = ["מנהל", "מנהלת חשבונות", "מחסנאי"];

  // Use state to store the selected value
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [job, setJob] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const isImage = (file) => {
    return file?.length > 0 && file[0].type?.includes("image/");
  };

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
          <TextField
            InputProps={{
              startAdornment: <div />,
            }}
            size="small"
            type="file"
            label="תמונת פרופיל"
            {...register("avatar", {
              required: true,
              validate: isImage,
            })}
            onChange={handleAvatarChange}
            error={errors.avatar}
            helperText={
              errors.avatar &&
              ((avatarValue?.length <= 0 && "Profile picture is required") ||
                (!isImage(avatarValue) && "This file is not an image"))
            }
          />

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
              // Handle the change event
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
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
              // Handle the change event
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.department && "מחלקה היא שדה חובה"}
            </FormHelperText>
          </FormControl>
          <FormControl
            size="small"
            error={errors.job}
            sx={{ m: 0, width: "100%" }}
          >
            <InputLabel id="job-label">תפקיד</InputLabel>
            <Select
              labelId="job-label"
              id="job"
              label="תפקיד"
              {...register("job", { required: true })}
              // Handle the change event
              value={job}
              onChange={(e) => setJob(e.target.value)}
            >
              {jobs.map((job) => (
                <MenuItem key={job} value={job}>
                  {job}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.job && "תפקיד הוא שדה חובה"}</FormHelperText>
          </FormControl>
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
