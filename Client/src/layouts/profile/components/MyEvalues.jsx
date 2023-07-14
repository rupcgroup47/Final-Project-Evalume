import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState, useContext } from "react";
import { useMaterialUIController } from "context";
import PDFFile from "layouts/evaluation/components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";
import ApiFetcher from "components/ApiFetcher";
import swal from 'sweetalert';


export default function MyEvalues({ evalus }) {
  const [tableHead, setTableHead] = useState({
    id: "evalueYear",
    align: "center",
    scope: "row",
    disablePadding: false,
    label: "שאלוני הערכה",
    show: true,
  });

  const mainState = useContext(MainStateContext);
  const userId = mainState.mainState.userNum; //The employee who is now connected to the system
  const [items, setItems] = useState(evalus);
  const [, dispatch] = useMaterialUIController();
  const [data, setData] = useState([]);
  const [dataFetched, setdataFetched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { API } = useContext(EvalueContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items?.length);



  const updateData = async (id) => {
    try {
      setLoading(true);
      const fetchedData = await ApiFetcher(API.apiGetPDFdetails + userId + "&questionnaireNum=" + id, "GET", null);
      console.log(fetchedData);
      setData(fetchedData);
      setdataFetched(true);
      setLoading(false);
    }
    catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  if (error) {
    swal({
      title: "קרתה תקלה!",
      text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
      icon: "error",
      button: "סגור"
    });
  }

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
            {items?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((evalue) => (
              <TableRow
                key={`${evalue.id} `}
                tabIndex={-1}
                sx={{ "&:last-child·td,·&:last-child·th": { border: 0 } }}
                hover
              >
                {/* {" "} */}
                <TableCell align="left" >
                  {evalue.year}-{evalue.id}
                </TableCell>
                <TableCell align="center" >
                  <Button onClick={() => updateData(evalue.id)}>הורד קובץ כPFD</Button>
                  {dataFetched && (
                    <PDFDownloadLink document={<PDFFile data={data} />} fileName="טופס הערכה.pdf">
                      {({ loading }) => loading ? ('טוען מידע לפני הורדה...') : ( <Button id="pdf-download-link" > הורד</Button>)}
                    </PDFDownloadLink>
                  )}
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
                  {items?.length > 0
                    ? items?.length <= 0 && "לא נמצאו רשומות מתאימות"
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
        count={items?.length}
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
    </Paper>
  );
}