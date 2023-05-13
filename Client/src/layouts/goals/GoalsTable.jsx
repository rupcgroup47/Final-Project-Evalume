import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMaterialUIController, setDirection } from "context";
import TableToolbarGoal from "./TableToolBarGoal";
import { TablePagination } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useDebounce } from "use-debounce";
import GoalItem from "./GoalItem";
import { EvalueContext } from "context/evalueVariables";
import { MainStateContext } from "App";


// const _goals = [
//   {
//     goalNum: 1,
//     goalName: "קורס אקסל",
//     employees: [
//       {
//         date: "2020-01-05",
//         userNum: 1,
//         userLName:"יעל",
//         userFName:"פרקש",
//         status: "חדש",
//       },
//       {
//         date: "2020-01-02",
//         userNum: 2,
//         userLName:"ריקי",
//         userFName:"פרקש",
//         status: "חדש",
//       },
//     ],
//   },
//   {
//     goalNum: 2,
//     goalName: "קורס פריוריטי",
//     employees: [
//       {
//         date: "2020-01-05",
//         userNum: 4,
//         userLName:"לי",
//         userFName:"פרקש",
//         status: "חדש",
//       },
//       {
//         date: "2020-01-02",
//         userNum: 5,
//         userLName:"מאי",
//         userFName:"פרקש",
//         status: "חדש",
//       },
//     ],
//   },
//   {
//     goalNum: 3,
//     goalName: "קורס חשבשבת",
//     employees: [
//       {
//         date: "2020-01-05",
//         userNum: 14,
//                 userLName:"נועה",
//         userFName:"פרקש",
//         status: "חדש",
//       },
//       {
//         date: "2020-01-02",
//         userNum: 13,
//         userLName:"דני",
//         userFName:"פרקש",
//         status: "בוצע",
//       },
//     ],
//   },
// ];

export default function GoalsTable() {
  const [, dispatch] = useMaterialUIController();
  const [tableHead, setTableHead] = useState(_tableHead);
  const [items, setItems] = useState([]);
  const [goals, setGoals] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { API } = useContext(EvalueContext);
  const { mainState, setMainState } = useContext(MainStateContext);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  // bring all the goals under manager using GET api
  useEffect(() => {
    const abortController = new AbortController()
    if (mainState.userType) {
      fetch(
        API.apiGoalsEmployee + mainState.userNum,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          signal: abortController.signal
        })
        .then(async response => {
          const data = await response.json();
          console.log(response);

          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          return data;
        })
        .then(
          (result) => {
            console.log("success");
            setGoals(result);
            setItems(result);
          },
          (error) => {
            if (error.name === 'AbortError') return
            console.log("err get=", error);
            throw error
          }
        );
      return () => {
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
    }
  }, []);

  // useEffect(() => {
  //   // Update the goals array
  //   const newArray = [...goals];
  //   const newQuestion = {
  //     quesContent: postQuestion.quesContent,
  //     questionNum: result,
  //     is_Active: true,
  //   };
  //   newArray[index].questions.push(newQuestion);
  //   if (globalQuestionArray !== null) setGlobalQuestionsArray(newArray);
  //   else settempQuestionArray(newArray);
  // }, [goals]);

  //search goal 
  const [searchInput, setSearchInput] = useState("");
  const [searchDebounce] = useDebounce(searchInput, 500);
  useEffect(() => {
    handleSearch(searchDebounce);
  }, [searchDebounce]);

  const handleSearch = (value) => {
    setSearchInput(value);

    let sx = goals.filter((item) =>
      `${item.goalName}`.toLowerCase().includes(value.toLowerCase())
    );

    setItems(value?.length > 0 ? sx : goals);
  };
  const handleRemoveGoal = (goal) => {
    setGoals((i) => i.filter((item) => item.goalName !== goal.goalName));
    setItems((i) => i.filter((item) => item.goalName !== goal.goalName));

    setSearchInput("");
  };
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

  return (
    <Paper sx={{ boxShadow: "none" }}>
      <TableToolbarGoal
        goals={goals}
        setGoals={setGoals}
        setItems={setItems}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        tableHead={tableHead}
        setTableHead={setTableHead}
        condition ={false}
      />

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right" width={40} />

              {tableHead.map((item) => {//header
                return (
                  item.show && (
                    <TableCell
                      key={item.id}
                      align={item.textAlign || "right"}
                      padding={item.disablePadding ? "none" : "normal"}
                      sx={{ fontWeight: 600 }}
                    >
                      {" "}
                      {item.label}
                    </TableCell>
                  )
                );
              })}

              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((goal, index) => (
                <GoalItem
                  key={index}
                  goal={goal}//each goal in the goals array
                  goals={goals}
                  setGoals={setGoals}
                  setItems={setItems}
                  tableHead={tableHead}
                  onRemoveButtonClick={() => handleRemoveGoal(goal)}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                  {goals.length > 0
                    ? items.length <= 0 && "לא נמצאו רשומות מתאימות"
                    : "הרשימה ריקה, הוסף רשומות"}
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

const _tableHead = [
  {
    id: "goalName",
    textAlign: "right",
    disablePadding: true,
    label: "שם יעד",
    show: true,
  },
];

