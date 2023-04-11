import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const WaitingEvalues = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentStep, setStep] = useState(1);
  const [currentStep1, setStep1] = useState(2);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    console.log(row.status);
  };

  return (
    <Table>
      <TableHead sx={{ display: "table-header-group" }}>
        <TableRow>
          <TableCell>שם עובד</TableCell>
          <TableCell>תאריך סיום שאלון</TableCell>
          <TableCell>שלב</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => handleRowClick(row)}
            style={{ backgroundColor: selectedRow === row ? "lightgray" : "white" }}
          >
            <TableCell style={{ width: "25%" }}>{row.name}</TableCell>
            <TableCell style={{ width: "25%" }}>{row.date}</TableCell>
            <TableCell style={{ width: "25%" }}>{row.status}</TableCell>
            <TableCell style={{ width: "25%" }}>
              {row.status === "ממתין למישוב מנהל" ? (
                <Link to="/ManagerEvalues" state={currentStep}>
                  מעבר לשאלון
                </Link>
              ) : (
                <Link to="/ManagerEvalues" state={currentStep1}>
                  מעבר לשאלון
                </Link>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WaitingEvalues;
