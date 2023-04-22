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
import { useEffect, useState, useContext, useCallback } from "react";
import { useMaterialUIController, setDirection } from "context";
import PDFFile from "layouts/evaluation/components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import { MainStateContext } from "App";
import { ContactSupportOutlined } from "@mui/icons-material";
import ApiFetcher from "components/ApiFetcher";
import { EvalueContext } from "context/evalueVariables";

// const evalues = [
//   { id: 1, year: 2022 },
//   { id: 2, year: 2023 },
// ];


export default function MyEvalues() {
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
  const { API } = useContext(EvalueContext);
  const [items, setItems] = useState([]);
  const [, dispatch] = useMaterialUIController();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [state, setState] = useState({
    fetch: {
      api: "",
      method: "",
      body: "",
      onFetchComplete: setItems,
      onFetchError: "",
    }

  });

  useEffect(() => {
    console.log("here?")
    if (state?.fetch.onFetchError != null)
      console.log("err get=", state.fetch.onFetchError)
  }, [state?.fetch.onFetchError])


  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

  function calculateData(userId, year) {
    ///data is the array i pass to the pdf file component
    // let data = [{id:1, year:222}, {id:2,year:333}]
    let data = {
      questionnaireNum: 1,
      userNum: 14,
      roleGroup: 0,
      filledOn: 1,
      parts: [{
        part: 0,
        answerInsertDate: "14/4/2022",
        quesGroup_Desc: "שירותיות",
        questions: [
          {
            questionNum: 1,
            questionContent: "הייי",
            numericAnswer: 1,
            verbalAnswer: "שלום"
          },
          {
            questionNum: 2,
            questionContent: "עדע",
            numericAnswer: 1,
            verbalAnswer: "יכגיג"
          }
        ]
      }
        ,

      {
        part: 1,
        answerInsertDate: "19/4/2022",
        quesGroup_Desc: "שירותיות",
        questions: [
          {
            questionNum: 1,
            questionContent: "הייי",
            numericAnswer: 1,
            verbalAnswer: "שלום"
          },
          {
            questionNum: 2,
            questionContent: "עדע",
            numericAnswer: 1,
            verbalAnswer: "יכגיג"
          }
        ]
      }
      ]

    }
    return data;

  }

  useEffect(() => {
    if (userId) {
      setState({
        fetch: {
          api: API.apiGetEvaluationsByUserNum + userId,
          method: "GET",
          body: undefined,
        }
      })
    }
  }, [])


  function updateData(year) {
    const newData = calculateData(userId, year);
    setData(newData);
    console.log("nenew" + newData);
  }

  useEffect(() => {
    // This code will be executed whenever the `data` state changes
    console.log(data);
  }, [data]);

  return (
    <Paper sx={{ boxShadow: "none", minWidth: 300, maxWidth: 900, margin: "auto" }}>
      {
        userId ?
          (
            <ApiFetcher props={state.fetch} />
          ) : null
      }
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
                  {evalue.year}
                </TableCell>
                <TableCell align="center" >
                  {console.log(evalue.name)}
                  <PDFDownloadLink document={<PDFFile data={data} />} fileName="טופס הערכה">
                    {({ loading }) =>
                      loading ? (
                        <Button>שגיאה</Button>
                      ) : (
                        <Button onClick={() => updateData(evalue.year)}>הורד קובץ כPFD</Button>
                      )
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
                  {items?.length > 0
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
