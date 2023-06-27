import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Card, Typography, Grid, Stack, Button, IconButton,Dialog, DialogContent } from "@mui/material";
// import { meetings } from "./meetingsData";
import { EvalueContext } from "context/evalueVariables";
import { MainStateContext } from "App";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MeetingDialog from ".//meetingDialog"

function MeetingCalendar({ fromAlert }) {
  const { meetings, chosenEmployee } = useContext(EvalueContext);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const locale = "he-IL";
  const calendarType = "Hebrew";
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const { mainState } = useContext(MainStateContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const handleDateChange = (date) => {
    setDate(date);
  };

  const scheduleMeeting = () => {
    setIsPopupOpen(true);
  }

  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };

  console.log("meetings", meetings);

  const tileDisabled = ({ date, view }) => {
    // handle weekend and disable passed dates
    // Disable weekends
    if (view === "month" && (date.getDay() === 5 || date.getDay() === 6)) {
      return true;
    }

    // Disable dates before today
    if (date < new Date()) {
      return true;
    }
  };

  const meetingsInTheSameDayExist = ({ date }) => {
    // Check if the date has a meeting


    const theDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const hasMeeting = meetings?.some(
      (meeting) => {
        const parts = meeting.date.split('/'); // Split the date string by '/'
        const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`; // Rearrange the parts in the format 'YYYY-MM-DD'
        const meetingDate = new Date(formattedDate); // Convert the formatted string to a JavaScript Date object
        return (
          meetingDate.getFullYear() === theDate.getFullYear() &&
          meetingDate.getMonth() === theDate.getMonth() &&
          meetingDate.getDate() === theDate.getDate()
        )
      }
    );

    // Return a div with a blue background if the date has a meeting
    return hasMeeting ? "has-meeting" : "";
  };

  useEffect(() => {
    // When a user clicks on a date in the calendar, all meetings on that day are opened for him, if any

    function areDatesEqual() {
      //returns all the meetings in the selected date
      if (selectedDate === null) {
        return [];
      }

      const inTheSameDayMeetings = meetings?.filter((meeting) => {//show all meetings schedule in the same day
        console.log(meeting);
        const parts = meeting.date.split('/'); // Split the date string by '/'
        const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`; // Rearrange the parts in the format 'YYYY-MM-DD'
        const meetingDate = new Date(formattedDate); // Convert the formatted string to a JavaScript Date object

        const selectedDateObj = new Date(selectedDate); // Convert the selectedDate to a JavaScript Date object
        return (
          meetingDate.getFullYear() === selectedDateObj.getFullYear() &&
          meetingDate.getMonth() === selectedDateObj.getMonth() &&
          meetingDate.getDate() === selectedDateObj.getDate()
        );
      });

      setFilteredMeetings(inTheSameDayMeetings); // filtered meetings array
    }

    areDatesEqual();
  }, [selectedDate]);

  return (
    <>
      <Grid container spacing={2} width="auto" justifyContent="center" alignItems="center">
        <Stack alignItems="center" justifyContent="center">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileDisabled={tileDisabled}
            locale={locale}
            calendarType={calendarType}
            onClickDay={(date) => setSelectedDate(date)}
            tileClassName={meetingsInTheSameDayExist}
          />
          <Stack direction="row" spacing={2}>
            <Typography sx={{ m: 2, fontSize: "1rem" }}>
              {" "}
              מקרא: <br />
              בתא אדום קיימות כבר פגישות
              <br />
              תא כחול זה התא עליו לחצת
            </Typography>
            {selectedDate !== null && fromAlert ?
              <IconButton aria-label="setMeeting" size="large" onClick={scheduleMeeting}>
                <EventAvailableIcon fontSize="large" />
              </IconButton>
              : ""}
          </Stack>
        </Stack>
        {filteredMeetings.map((meeting) => (
          <Grid item xs={12} md={4} key={"g" + meeting.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "aliceblue",
                overflow: "visible",
                textAlign: "center",
                minWidth: "max-content"
              }}
            >
              <Typography sx={{ m: 2, fontSize: "1rem" }} key={meeting.id}>
                {' פגישה עם ' + (meeting.userNum !== mainState.userNum ? meeting.employeeName : meeting.managerName)} <br />
                {' בשעה: ' + meeting.time} <br />
                {' במיקום: ' + meeting.meetingPlace} <br />
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
        <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
        <DialogContent>
          <MeetingDialog chosenEmployee={chosenEmployee} selectedDate={selectedDate}/>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MeetingCalendar;
