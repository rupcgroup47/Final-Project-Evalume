import { useState, useContext } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { EvalueContext } from "context/evalueVariables";

const WaitingEvalues = ({ data }) => {
  //evaluations that are waiting for an administrator's feedback
  const [selectedRow, setSelectedRow] = useState(null);
  const adminStep = 1; //Awaiting admin feedback
  const adminEmployeeStep = 2; //Awaiting manager and  employee  feedback
  const { setChosenEmployee } = useContext(EvalueContext);
  const handleRowClick = (row) => {
    setChosenEmployee(row.id); //send chosen employee data to the global context
    setSelectedRow(row); //css
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
                <Link to="/ManagerEvalues" state={adminStep}>
                  מעבר לשאלון
                </Link>
              ) : (
                <Link to="/ManagerEvalues" state={adminEmployeeStep}>
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
