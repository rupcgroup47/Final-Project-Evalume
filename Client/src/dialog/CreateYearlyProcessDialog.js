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
  },
];
export default function CreateYearlyProcessDialog({
  open,
  setOpen,
}) {
  const [openProcess, setOpenProcess] = useState({});
  const [finishDate, setfinishDate] = useState(new Date());
  const [testData, setTestData] = useState(test);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [lastSelectedOptions, setLastSelectedOptions] = useState([]);

  // const handleChange = (event) => {
  //   const index = event.target.name;
  //   const value = event.target.value;
  
  //   // Update the selectedOptions object
  //   setSelectedOptions((prevState) => {
  //     // If the index already exists in the object, update the value
  //     if (prevState.hasOwnProperty(index)) {
  //       return {
  //         ...prevState,
  //         [index]: value,
  //       };
  //     }
  //     // Otherwise, add a new key-value pair to the object
  //     else {
  //       return {
  //         ...prevState,
  //         [index]: value,
  //       };
  //     }
  //   });
  // };
 
  const handleFinish = () => {
    // console.log(savedValues)
    // const optionsArray = Object.values(selectedOptions);
    // setLastSelectedOptions(optionsArray);
    if (lastSelectedOptions.length != test.length) {
      addNotification({
        title: "אזהרה",
        subtitle: "לא בחרת בכל האפשרויות",
        message: "צריך לבחור בכל שאלון מספר שאלון",
        theme: "red",
        closeButton: "X",
      });
    } else {
      setOpenProcess((prevObject) => ({ ...prevObject, lastSelectedOptions, date: finishDate }));
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
        padding:"30px"
      }}
    >
        <Typography>בחירת שאלונים</Typography>

          <Notifications />

        <div>
      {testData.map((testObject, index) => (
        <div key={index}>
          <h2>{`${testObject.roleGrouptype} - ${testObject.roletype}`}</h2>
          <select  key= {index} name={index} onChange={handleChange}>
            <option value="">בחירת שאלון מתאים</option>
            {testObject.forms.map((form) => (
              <option key={form.id} value={form.year}>שאלון {form.year} </option>
            ))}
          </select>
        </div>
      ))}
    </div>
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
