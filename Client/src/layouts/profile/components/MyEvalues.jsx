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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMaterialUIController, setDirection } from "context";
import PDFFile from "layouts/evaluation/components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";

const evalues = [
  { id: 1, name: "שנת 2022" },
  { id: 2, name: "שנת 2024" },
];
export default function MyEvalues() {
  const [tableHead, setTableHead] = useState({
    id: "evalueYear",
    align: "center",
    scope: "row",
    disablePadding: false,
    label: "שאלוני הערכה",
    show: true,
  });
  const [items, setItems] = useState(evalues);
  const [, dispatch] = useMaterialUIController();

  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

  return (
    <Paper sx={{ boxShadow: "none", minWidth: 300, maxWidth: 900, margin: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300, maxWidth: 900 }} aria-labelledby="tableTitle" size="small">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow height="50px" />
            <TableRow
              key={tableHead.id}
              align={tableHead.align || ""}
              padding={tableHead.disablePadding ? "none" : "normal"}
              sx={{ fontWeight: 600 }}
            >
              <TableCell align="left" >
                {tableHead.label}
              </TableCell>
            </TableRow>
            <TableRow height="50px" />
          </TableHead>
          <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((evalue) => (
              <TableRow
                key={`${evalue.id} `}
                tabIndex={-1}
                sx={{ "&:last-child·td,·&:last-child·th": { border: 0 } }}
                hover
              >
                {/* {" "} */}
                <TableCell align="left" >
                  {console.log(evalue.name)}
                  {evalue.name}
                </TableCell>
                <TableCell align="center" >
                  {console.log(evalue.name)}
                  <PDFDownloadLink document={<PDFFile />} fileName="טופס הערכה">
                    {({ loading }) =>
                      loading ? <Button>שגיאה</Button> : <Button>הורד קובץ כPFD</Button>
                    }
                  </PDFDownloadLink>{" "}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={12} sx={{ textAlign: "inherit" }}>
                  {evalues.length > 0
                    ? items.length <= 0 && "לא נמצאו רשומות מתאימות"
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
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 5));
          setPage(0);
        }}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`
        }
        labelRowsPerPage="מספר שורות להציג:"
      />
    </Paper>
  );
}
