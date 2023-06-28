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
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import ApiFetcher from "components/ApiFetcher";


export default function SetMeetingDialog({ chosenEmployee, selectedDate }) {
    const { API } = useContext(EvalueContext);
    const [value, setValue] = useState(dayjs(selectedDate));
    const [location, setLocation] = useState("");

    //creating a new user when submiting the form at the targeted varibles type and set the relevant state
    const setMeeting = () => {
        let isMounted = true;

        const sendObject = {
            meetingDate: dayjs(value).format('DD/MM/YYYY HH:MM'),
            meetingPlace: location,
            userNum: chosenEmployee.userNum
        }

        console.log(sendObject);

        // Post a new meeting
        // const setMeeting = async () => {
        //     try {
        //         const fetchedData = await ApiFetcher(API.apiPostMeeting, "POST", null);
        //         if (isMounted) {
        //             console.log("success");

        //         }
        //     }
        //     catch (error) {
        //         if (isMounted) {
        //             console.log(error);
        //         }
        //     }
        // }
        // setMeeting();

        return () => {
            isMounted = false;
        }
    };

    console.log(dayjs(selectedDate).format('DD/MM/YYYY'));

    return (
        <Paper
            sx={{ boxShadow: "none", minWidth: 300, maxWidth: 1200, margin: "auto", marginTop: "50px" }}
        >
            <Grid container direction="row" spacing={3} marginTop="-10px">
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2} style={{ flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Typography>שם העובד: </Typography>
                        <TextField
                            size="small"
                            id="employeeName"
                            label="שם העובד"
                            InputProps={{
                                style: { fontSize: 24, alignItems: "center" },
                            }}
                            value={chosenEmployee.userFName + ' ' + chosenEmployee.userLName}
                            readOnly
                            sx={{ m: 0, width: "48%" }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2} style={{ flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Typography>מועד הפגישה: </Typography>
                        <TextField
                            size="small"
                            id="meetingDate"
                            label="מועד הפגישה"
                            InputProps={{
                                style: { fontSize: 24, alignItems: "center" },
                            }}
                            value={dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
                            readOnly
                            sx={{ m: 0, width: "48%" }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2} style={{ flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Typography>שעת הפגישה: </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    label="בחר שעה"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}

                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2} style={{ flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Typography>מיקום הפגישה: </Typography>
                        <TextField
                            size="small"
                            id="meetingLocation"
                            label="מיקום הפגישה"
                            InputProps={{
                                style: { fontSize: 24, alignItems: "center" },
                            }}
                            // value={}
                            onChange={(newValue) => setLocation(newValue.target.value)}
                            sx={{ m: 0, width: "48%" }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={setMeeting}>סיום</Button>
                </Grid>

            </Grid>
        </Paper>
    );
}
