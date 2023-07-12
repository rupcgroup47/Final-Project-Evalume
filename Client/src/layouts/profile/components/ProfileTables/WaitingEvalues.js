import { useState, useContext } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogContent, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { EvalueContext } from "context/evalueVariables";
import MDTypography from "components/MDTypography";
import MeetingCalendar from "layouts/meetings/Calendar";

const WaitingEvalues = ({ data, calender }) => {
  //evaluations that are waiting for an administrator's feedback
  const [selectedRow, setSelectedRow] = useState(null);
  const adminStep = 1; //Awaiting admin feedback
  const adminEmployeeStep = 2; //Awaiting manager and  employee  feedback
  const { setChosenEmployee } = useContext(EvalueContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTypographyClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };

  const handleRowClick = (row) => {
    console.log(row);
    setChosenEmployee(row); //send chosen employee data to the global context
    setSelectedRow(row); //css
  };

  return (
    <Table>
      <TableHead sx={{ display: "table-header-group" }}>
        <TableRow>
          <TableCell>שם עובד</TableCell>
          {calender ? <TableCell>מייל העובד</TableCell> : <TableCell>תאריך סיום שאלון</TableCell>}
          <TableCell>שלב</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={row.userNum}
            onClick={() => handleRowClick(row)}
            style={{ backgroundColor: selectedRow === row ? "lightgray" : "white" }}
          >
            <TableCell style={{ width: "25%" }}>{row.userFName + " " + row.userLName}</TableCell>
            {calender ? <TableCell style={{ width: "25%" }}>{row.userEmail}</TableCell> : <TableCell style={{ width: "25%" }}>{row.answerInsertDate.slice(0, 10).replace(/-/g, "/")}</TableCell>}
            <TableCell style={{ width: "25%" }}>{row.evalu_Part_Type === 0 ? "ממתין למישוב מנהל" : "ממתין למישוב משותף"}</TableCell>
            <TableCell style={{ width: "25%" }}>
              {row.evalu_Part_Type === 0 ? (//send current step according to which form i redirect to
                <Link to="/ManagerEvalues" state={adminStep}>
                  מעבר לשאלון
                </Link>
              )
                : (calender ?
                  (
                    <>
                      <Typography onClick={handleTypographyClick} variant="link" style={{ cursor: "pointer", color: "#511A8B" }}>
                        תיאום פגישה
                      </Typography>
                      <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
                        <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
                        <DialogContent>
                          <MeetingCalendar fromAlert />
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <Link to="/ManagerEvalues" state={adminEmployeeStep}>
                      מעבר לשאלון
                    </Link>
                  ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WaitingEvalues;
