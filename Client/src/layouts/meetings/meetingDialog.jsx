import {
    Button,
    TextField,
    Paper,
    Grid,
    Typography,
    Stack
} from "@mui/material";


import { useContext, useEffect, useState } from "react";
import { EvalueContext } from "context/evalueVariables";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { makeStyles } from '@mui/styles';
import swal from 'sweetalert';

const useStyles = makeStyles({
    customTimePicker: {
        '& .MuiMenuItem-root.MuiMultiSectionDigitalClockSection-item': {
            minWidth: '56px', /* Adjust the width value as needed */
        },
        // Add any other custom styles
    },
});

export default function SetMeetingDialog({ chosenEmployee, selectedDate }) {
    const { API } = useContext(EvalueContext);
    const [value, setValue] = useState(dayjs(selectedDate));
    const classes = useStyles();


    // Use state to store the selected
    const [putUser, setPutUser] = useState("");

    //creating a new user when submiting the form at the targeted varibles type and set the relevant state
    const onSubmit = (data) => {
        if (user) {
            // Update a user
            setPutUser(newUser);
        } else {
            // Add new user at the end of the array
            setPostUser(newUser);
        }
    };

    return (
        <Paper
            sx={{ boxShadow: "none", minWidth: 300, maxWidth: 1200, margin: "auto", marginTop: "50px" }}
        >
            <Grid container direction="row" spacing={3} marginTop="-10px">
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>

                        <Typography>שם העובד: </Typography>
                        <TextField
                            size="small"
                            id="employeeName"
                            label="שם העובד"
                            InputProps={{
                                style: { fontSize: 20, alignItems: "baseline" },
                            }}
                            value={chosenEmployee.userFName + ' ' + chosenEmployee.userLName}
                            disabled
                            sx={{ m: 0, width: "100%" }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Typography>מועד הפגישה: </Typography>
                        <TextField
                            size="small"
                            id="meetingDate"
                            label="מועד הפגישה"
                            InputProps={{
                                style: { fontSize: 20, alignItems: "baseline" },
                            }}
                            value={selectedDate}
                            disabled
                            sx={{ m: 0, width: "100%" }}
                        />
                    </Stack>
                </Grid>{" "}
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Typography>שעת הפגישה: </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    label="Basic time picker"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    ampm={false}
                                    className={classes.customTimePicker}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Stack>
                </Grid>{" "}
            </Grid>
        </Paper>
    );
}
