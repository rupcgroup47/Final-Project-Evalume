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
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseDialog from "dialog/CloseDialog";
import CreateOrUpdateGoalDialog from "dialog/CreateOrUpdateGoalDialog";
import { EvalueContext } from "context/evalueVariables";
import Checkbox from '@mui/material/Checkbox';

// const _goals = [
//   {
//     goalNum: 1,
//     goalName: "קורס אקסל",
//     isActive:true
//   },
//   {
//     goalNum: 2,
//     goalName: "קורס פריוריטי",
//     isActive:false
//   }
// ]



export default function GoalsInfoTable() {
  const [, dispatch] = useMaterialUIController();
  const { API } = useContext(EvalueContext);
  const [items, setItems] = useState([]);//for search
  const [goals, setGoals] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showUpdateGoalDialog, setShowUpdateGoalDialog] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalName, setGoalName] = useState(null);
  //   // Function to handle the click event and update the selected goal
  const handleEditClick = (goal) => {
    setSelectedGoal(goal);
    setGoalName(goal.goalName);
    setShowUpdateGoalDialog(true);
  };
  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  // GET the all avaliable goals
  useEffect(() => {
    const abortController = new AbortController();
    if (API) {
      fetch(
        API.apiGetAllGoals,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          signal: abortController.signal,
        })
        .then(async (response) => {
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
            setItems(result);
            setGoals(result);
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    }
  }, []);


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
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

  return (
    <Paper sx={{ boxShadow: "none" }}>
      <TableToolbarGoal
        goals={goals}
        setGoals={setGoals}
        setItems={setItems}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        condition={true}
      />

      <TableContainer>
        <Table>
          <TableHead style={{ display: "table-header-group" }}>
            <TableRow style={{ width: "100%" }}>
              <TableCell style={{ width: "33%" }}>שם היעד</TableCell>
              <TableCell style={{ width: "33%" }}>האם פעיל?</TableCell>
              <TableCell style={{ width: "33%" }}>עריכה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((goal, index) => (
              <TableRow key={index}>
                <TableCell style={{ width: "33%" }}>{goal.goalName}</TableCell>
                <TableCell style={{ width: "33%" }}>
                  {goal.is_Active ? 'פעיל' : 'לא פעיל'}
                </TableCell>
                <TableCell style={{ width: "33%" }}>
                  <IconButton color="primary" onClick={() => handleEditClick(goal)}>
                    <EditRoundedIcon />
                  </IconButton>

                </TableCell>
              </TableRow>
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

      <CreateOrUpdateGoalDialog
        open={showUpdateGoalDialog}
        setOpen={setShowUpdateGoalDialog}
        goal={selectedGoal}
        initGoalName={goalName}
        goals={goals}
        condition={true}
        setGoals={setGoals}
        setItems={setItems}
      />

      <CloseDialog
        open={showCloseDialog}
        setOpen={setShowCloseDialog}
        onClick={() => {
          //   onRemoveButtonClick(selectedGoal);
          setShowCloseDialog((e) => !e);
        }}
      />
    </Paper>


  );
}
