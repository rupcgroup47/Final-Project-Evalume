import { useState } from "react";
import {
  Button,
  // Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  // TableSortLabel,
} from "@mui/material";
const WaitingEvalues = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [myValue,setValue] = useState(2);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <Table>
      <TableHead sx={{ display: "table-header-group" }}>
        <TableRow>
          <TableCell >שם עובד</TableCell>
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
            <TableCell style={{ width: '25%' }} >{row.name}</TableCell>
            <TableCell style={{ width: '25%' }}>{row.date}</TableCell>
            <TableCell style={{ width: '25%' }}>{row.status}</TableCell>
            <TableCell style={{ width: '25%' }}>
              {console.log(myValue)}
              {/* <Button component={Link} to={{ pathname: '/ManagerEvalues', myProp: myValue }}>מעבר לשאלון
              </Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WaitingEvalues;
