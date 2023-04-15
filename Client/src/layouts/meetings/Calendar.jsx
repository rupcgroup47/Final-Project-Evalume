import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Card, Typography, Grid, Stack } from "@mui/material";
import { meetings } from "./meetingsData";

function MeetingCalendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const locale = "he-IL";
  const calendarType = "Hebrew";
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const handleDateChange = (date) => {
    setDate(date);
  };

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
    const hasMeeting = meetings.some(
      (meeting) =>
        new Date(meeting.date).getFullYear() === new Date(date).getFullYear() &&
        new Date(meeting.date).getMonth() === new Date(date).getMonth() &&
        new Date(meeting.date).getDate() === new Date(date).getDate()
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
      const inTheSameDayMeetings = meetings.filter((meeting) => {//show all meetings schedule in the same day
        console.log(meeting);
        const d1 = new Date(selectedDate);
        const d2 = new Date(meeting.date);
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
        );
      });
      setFilteredMeetings(inTheSameDayMeetings); // filtered meetings array
    }

    areDatesEqual();
  }, [selectedDate]);

  return (
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
        <Typography sx={{ m: 2, fontSize: "1rem" }}>
          {" "}
          מקרא: <br />
          בתא אדום קיימות כבר פגישות
          <br />
          תא כחול זה התא עליו לחצת
        </Typography>
      </Stack>
      {filteredMeetings.map((meeting) => (
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "aliceblue",
              overflow: "visible",
              textAlign: "center",
            }}
          >
            <Typography sx={{ m: 2, fontSize: "1rem" }} key={meeting.id}>
              {meeting.title} <br />
              {meeting.time} <br />
              {meeting.location}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default MeetingCalendar;
