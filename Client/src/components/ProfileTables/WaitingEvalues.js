import { useState } from "react";
import {
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

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell >שם עובד</TableCell>
          <TableCell>תאריך סיום שאלון</TableCell>
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
            <TableCell style={{ width: '33%' }} >{row.name}</TableCell>
            <TableCell style={{ width: '33%' }}>{row.date}</TableCell>
            <TableCell style={{ width: '33%' }}>
              {" "}
              <a href={row.link}>מעבר לשאלון</a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WaitingEvalues;
