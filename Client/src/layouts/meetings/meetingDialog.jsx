import {
    Button,
    TextField,
    Paper,
    Grid,
    Typography,
    Stack
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { EvalueContext } from "context/evalueVariables";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
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
    const [date, setDate] = useState(dayjs(selectedDate));
    const [location, setLocation] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //creating a new user when submiting the form at the targeted varibles type and set the relevant state
    const onSubmit = () => {
        let isMounted = true;

        console.log(date);
        const sendObject = {
            meetingDate: dayjs(date).format('DD/MM/YYYY HH:mm'),
            meetingPlace: location,
            userNum: chosenEmployee.userNum
        }

        console.log(JSON.stringify(sendObject));

        // Post a new meeting
        // const setMeeting = async () => {
        //     try {
        //         const fetchedData = await ApiFetcher(API.apiPostMeeting, "POST", JSON.stringify(sendObject));
        //         if (isMounted) {
        //             console.log("success");
        //             if (fetchedData.txt) {
        //                 console.log(fetchedData);
        //                 swal({
        //                     title: "פעולה בוטלה!",
        //                     text: "נראה כי קיימת כבר פגישה במועד זה במערכת",
        //                     icon: "error",
        //                     button: "סגור"
        //                 });
        //             }
        //             else
        //                 swal({
        //                     title: "הצלחנו!",
        //                     text: "היעד עודכן בהצלחה",
        //                     icon: "success",
        //                     button: "סגור"
        //                 });
        //         }
        //     }
        //     catch (error) {
        //         if (isMounted) {
        //             console.log(error);
        //             swal({
        //                 title: "פעולה בוטלה!",
        //                 text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
        //                 icon: "error",
        //                 button: "סגור"
        //             });
        //         }
        //     }
        // }
        // setMeeting();

        // window.location.reload(); // Reload the page

        return () => {
            isMounted = false;
        }
    };

    //in case of an error on the validations of the form sending the error to te console
    const onError = (errors, e) => console.log(errors, e);

    console.log(dayjs(selectedDate).format('DD/MM/YYYY'));

    return (
        <form

            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <Paper
                component="form"
                sx={{ boxShadow: "none", minWidth: 300, maxWidth: 1200, margin: "auto", marginTop: "50px" }}
            >
                <Grid container direction="row" spacing={3}>
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
                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
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
                                {...register("meetingLocation", { required: true })}
                                onChange={(newValue) => setLocation(newValue.target.value)}
                                sx={{ m: 0, width: "48%" }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit">סיום</Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
}
