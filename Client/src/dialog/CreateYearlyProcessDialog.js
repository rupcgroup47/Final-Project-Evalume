import { Button, Dialog, MenuItem, Select, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  MenuList,
  Box,
  Card
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from "date-fns/locale/he";
registerLocale("he", he);
import addNotification from "react-push-notification";
import { Notifications } from "react-push-notification";


const test = [
  {
    roleGrouptype: "משרדי",
    roletype: "מנהל",
    forms: [
      {
        id: 1,
        year: 2023,
      },
      {
        id: 2,
        year: 2022,
      },
    ],
  },
  {
    roleGrouptype: "משרדי",
    roletype: "עובד",
    forms: [
      {
        id: 4,
        year: 20233,
      },
      {
        id: 3,
        year: 20422,
      },
    ],
  },
  {
    roleGrouptype: "תפעולי",
    roletype: "מנהל",
    forms: [
      {
        id: 5,
        year: 1990,
      },
      {
        id: 6,
        year: 2009,
      },
    ],
  },
  {
    roleGrouptype: "תפעולי",
    roletype: "עובד",
    forms: [
      {
        id: 7,
        year: 1777,
      },
      {
        id: 31,
        year: 4572,
      },
    ],
  }
];

export default function CreateYearlyProcessDialog({
  open,
  setOpen,
}) {
  const [openProcess, setOpenProcess] = useState({});
  const [finishDate, setfinishDate] = useState(new Date());
  const [testData, setTestData] = useState(test);
  const [selectedForms, setSelectedForms] = useState([]);//selected values for each select

  const handleChange = (event) => {//called every time a select element changes, and it will update the selectedForms array with the new selected value
    const index = event.target.name;
    const value = event.target.value;//form id
    const newSelectedForms = [...selectedForms];
    newSelectedForms[index] = value;
    setSelectedForms(newSelectedForms);
  };
  const handleFinish = () => {
    console.log(selectedForms)

    if (selectedForms.length != test.length) {//Check that all questionnaires have been selected
      addNotification({
        title: "אזהרה",
        subtitle: "לא בחרת בכל האפשרויות",
        message: "צריך לבחור בכל שאלון מספר שאלון",
        theme: "red",
        closeButton: "X",
      });
    } else {
      setOpenProcess((prevObject) => ({ ...prevObject, selectedForms, date: finishDate }));//Connecting the selected date and the set of questionnaires to one object
      console.log(openProcess);
      setOpen(false);
    }
  };

  return (
    <Dialog fullWidth maxWidth="lg" onClose={() => setOpen((e) => !e)} open={open}>
      <Typography sx={{ fontFamily: "Rubik", fontSize: "50px", textAlign: "center" }}>
        פתיחת תהליך הערכה{" "}
      </Typography>
      <Box
        display="inline"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        marginBottom={10}
        marginLeft="20%"
        textAlign="center"
        width="60%"
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "whitesmoke",
            overflow: "visible",
            textAlign: "center",
            padding: "30px"
          }}
        >
          <Typography>בחירת שאלונים</Typography>

          <Notifications />

          {testData.map((testObject, index) => (
            <div key={index}>
              <h4>{`${testObject.roleGrouptype} - ${testObject.roletype}`}</h4>
              <select key={index} name={index} onChange={handleChange}>
                <option value="">בחירת שאלון מתאים</option>
                {testObject.forms.map((form) => (//Go through all the questionnaires appropriate for role type & group type
                  <option key={form.id} value={form.id}>שאלון {form.year} </option>
                ))}
              </select>
            </div>
          ))}
          <Typography>בחירת תאריך סיום</Typography>

          <DatePicker selected={finishDate} onChange={(date) => setfinishDate(date)} locale="he" />
          {/* </Box> */}</Card>
      </Box>
      <Box textAlign="center" marginBottom={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="white" size="large" onClick={() => setOpen(false)}>
              יציאה{" "}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="white" size="large" onClick={handleFinish}>
              שליחת הערכה שנתית
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
