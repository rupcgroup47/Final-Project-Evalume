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
const PersonalGoals = ({ goals }) => {///receive all user goals and their data
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log("myGoalsData" + goals);

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - goals?.length);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <Paper sx={{ boxShadow: "none", minWidth: 300, maxWidth: 900, margin: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300, maxWidth: 900 }} aria-labelledby="tableTitle" size="small">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>שם יעד</TableCell>
              <TableCell>תאריך מתן היעד</TableCell>
              <TableCell>האם בוצע</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.id}
                tabIndex={-1}
                sx={{ "&:last-child·td,·&:last-child·th": { border: 0 } }}
                hover
                onClick={() => handleRowClick(row)}
                style={{ backgroundColor: selectedRow === row ? "lightgray" : "white" }}
              >
                <TableCell style={{ width: "33%" }}>{row.name}</TableCell>
                <TableCell style={{ width: "33%" }}>{row.date.slice(0, 10).replace(/-/g, "/")}</TableCell>
                <TableCell style={{ width: "33%" }}>{row.isDone} </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={12} sx={{ textAlign: "inherit" }}>
                  {goals?.length > 0
                    ? goals?.length <= 0 && "לא נמצאו רשומות מתאימות"
                    : "הרשימה ריקה"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={goals?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`
        }
        labelRowsPerPage="מספר שורות להציג:"
      />
    </Paper >
  );
};

export default PersonalGoals;
