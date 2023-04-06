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
const PersonalGoals = ({ myGoalsData }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <Table>
      <TableHead sx={{ display: "table-header-group" }}>
        <TableRow>
          <TableCell>שם יעד</TableCell>
          <TableCell>תאריך מתן היעד</TableCell>
          <TableCell>האם בוצע</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {myGoalsData.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => handleRowClick(row)}
            style={{ backgroundColor: selectedRow === row ? "lightgray" : "white" }}
          >
            <TableCell style={{ width: "33%" }}>{row.name}</TableCell>
            <TableCell style={{ width: "33%" }}>{row.date}</TableCell>
            <TableCell style={{ width: "33%" }}>{row.isDone} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PersonalGoals;
