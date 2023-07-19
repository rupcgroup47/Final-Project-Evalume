/* eslint-disable */

/*
This is a React functional component that renders a table with some additional functionality. The table displays a list of users that can be sorted, searched, and filtered by various criteria. The component uses Material-UI for styling and provides its own toolbar component that contains search and filter controls.

The component receives two props: users and setUsers. users is an array of objects representing users, and setUsers is a function to update the users array. The component initializes its internal state with the useState hook to manage the current page number (page) and the number of rows per page (rowsPerPage). It also sets the initial state of several other variables to be used later: tableHead (the columns to display in the table), items (the current items to display), orderType and orderBy (to keep track of the sorting order), searchInput (the user's input for the search), and filterName, filterEmail, filterGender, filterDepartment, and filterJob (the user's input for the filter).

The component uses useEffect to update the items array whenever the users prop changes. It also uses useDebounce to delay the search when the user is typing, and updates the items array when the search input changes. The handleSearch function filters the items array by the user's search input, which is a case-insensitive substring match against the users' first and last names.

The component uses the handleFilter function to filter the items array by the user's filter input. The function checks if each user object matches the filter criteria and updates the items array accordingly. The filter criteria are also case-insensitive.

The component defines the handleSort function to sort the items array by a given column (specified by the value parameter). It uses the orderBy and orderType variables to keep track of the current sorting order and reverse the order if needed. The sorting is done using the sort method with the localeCompare function for strings.

The component defines the handleRemoveUser function to remove a user from the users and items arrays. It receives a user object as a parameter and uses the setUsers and setItems functions to update the arrays.

Finally, the component renders the table using Material-UI components, including Table, TableHead, TableBody, TableRow, TableCell, and TablePagination. It uses the map method to iterate over the items array and render a TableItem component for each user. It also uses the emptyRows variable to render empty rows at the bottom of the table when there are fewer items than the rows per page. The TableSortLabel component is used to indicate the current sorting column and order. The TablePagination component is used to handle pagination and displays the current page and the total number of items. The Box component is used to add some spacing around the table.
*/

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
import { useEffect, useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import { EvalueContext } from "context/evalueVariables";
import swal from "sweetalert";
import TableItem from "components/TableItem";
import TableToolbar from "components/TableToolbar";
import tableHeadArr from "./tableHeaderArr";

export default function UsersTable({ users, setUsers }) {
  const [tableHead, setTableHead] = useState(tableHeadArr);
  const [items, setItems] = useState([users]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { API } = useContext(EvalueContext);

  useEffect(() => {
    // Update the users array
    setItems(users);
  }, [users]);

  // handleSearch - start
  const [searchInput, setSearchInput] = useState("");
  const [searchDebounce] = useDebounce(searchInput, 500);

  const handleSearch = (value) => {
    setSearchInput(value);

    const sx = users.filter((item) =>
      `${item.userFName} ${item.userLName}`.toLowerCase().includes(value.toLowerCase())
    );

    setItems(value?.length > 0 ? sx : users);
  };

  useEffect(() => {
    handleSearch(searchDebounce);
  }, [searchDebounce]);

  // handleSearch - end

  // handleFilter - start
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterJob, setFilterJob] = useState("");
  const [filterRoleType, setFilterRoleType] = useState("");
  const [filterDirector, setFilterDirector] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [filterAdmin, setFilterAdmin] = useState("");
  const [filterRoleGroup, setFilterRoleGroup] = useState("");

  const handleFilter = () => {
    const filterdArray = users.filter(
      (user) =>
        (filterName
          ? `${user.userFName} ${user.userLName}`?.toLowerCase().includes(filterName.toLowerCase())
          : true) &&
        (filterGender ? user.userGender === filterGender : true) &&
        (filterEmail ? user.userEmail.toLowerCase().includes(filterEmail.toLowerCase()) : true) &&
        (filterJob ? user.userRole.includes(filterJob) : true) &&
        (filterDepartment ? user.userDepartment.includes(filterDepartment) : true) &&
        (filterRoleType ? user.userRoleGroupDesc.includes(filterRoleType) : true) &&
        (filterDirector
          ? `${user.managerFname} ${user.managerLName}`
            ?.toLowerCase()
            .includes(filterDirector.toLowerCase())
          : true) &&
        (filterRoleGroup ? user.userType === (filterRoleGroup === "מנהל") : true) &&
        (filterActive ? user.is_Active === (filterActive === "פעיל") : true) &&
        (filterAdmin ? user.is_Admin === (filterAdmin === "אדמין") : true)
    );

    setItems(filterdArray);
  };

  useEffect(() => {
    handleFilter();
  }, [
    filterName,
    filterEmail,
    filterGender,
    filterDepartment,
    filterJob,
    filterRoleType,
    filterDirector,
    filterActive,
    filterAdmin,
    filterRoleGroup,
  ]);
  // handleFilter - end

  // handleRemoveUser - start
  const [putUser, setPutUser] = useState("");

  const handleRemoveUser = (user) => {
    const userCopy = { ...user };
    userCopy.is_Active = false;
    // user.is_Active = false;
    console.log(userCopy);
    setPutUser(userCopy);
    setUsers((array) =>
      array.map((item) =>
        item.userNum === user?.userNum ? { ...item, ...user } : item
      )
    );
    setItems((array) =>
      array.map((item) =>
        item.userNum === user?.userNum ? { ...item, ...user } : item
      )
    );
  };


  //  update user datails using PUT api
  useEffect(() => {
    // Update is active for a user ("delete")
    const abortController = new AbortController();
    if (putUser !== "") {
      fetch(
        API.apiPutUserUrl + putUser.userNum,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(!putUser.is_Active),
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
            console.log("success" + result);
            handleRemoveUser(putUser);
            swal({
              title: "הצלחנו!",
              text: "המשתמש עודכן בהצלחה",
              icon: "success",
              button: "סגור"
            });
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err put=", error);
            swal({
              title: "קרתה תקלה!",
              text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
              icon: "error",
              button: "סגור"
            });
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    }
  }, [putUser]);
  // handleRemoveUser - end

  // show empty rows if the array / filted array is epmty or less then rowsPerPage
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

  return (
    <Paper sx={{ boxShadow: "none" }}>
      <TableToolbar
        // Users
        users={users}
        setUsers={setUsers}
        setItems={setItems}
        // Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        // Table Head
        tableHead={tableHead}
        setTableHead={setTableHead}
        // Filters
        filterName={filterName}
        setFilterName={setFilterName}
        filterEmail={filterEmail}
        setFilterEmail={setFilterEmail}
        filterGender={filterGender}
        setFilterGender={setFilterGender}
        filterDepartment={filterDepartment}
        setFilterDepartment={setFilterDepartment}
        filterJob={filterJob}
        setFilterJob={setFilterJob}
        filterRoleType={filterRoleType}
        setFilterRoleType={setFilterRoleType}
        filterDirector={filterDirector}
        setFilterDirector={setFilterDirector}
        filterActive={filterActive}
        setFilterActive={setFilterActive}
        filterAdmin={filterAdmin}
        setFilterAdmin={setFilterAdmin}
        filterRoleGroup={filterRoleGroup}
        setFilterRoleGroup={setFilterRoleGroup}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle" size="small">
          {/* Table Head - Start */}
          <TableHead sx={{ display: "table-header-group" }} style={{ position: "sticky", top: 0 }}>
            <TableRow>
              {tableHead.map((item) => (
                  item.show && (
                    <TableCell
                      key={item.id}
                      align={item.textAlign || ""}
                      padding={item.disablePadding ? "none" : "normal"}
                      sx={{ fontWeight: 600, padding: "4px"}}
                    >
                      {item.label}
                    </TableCell>
                  )
                )
              )}
            </TableRow>
          </TableHead>
          {/* Table Head - End */}

          {/* Table Body - Start */}
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableItem
                  key={index}
                  user={user}
                  users={users}
                  setUsers={setUsers}
                  setItems={setItems}
                  tableHead={tableHead}
                  onRemoveButtonClick={() => handleRemoveUser(user)}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={12} sx={{ textAlign: "inherit" }}>
                  {users.length > 0
                    ? items.length <= 0 && "לא נמצאו רשומות מתאימות"
                    : "הרשימה ריקה, הוסף רשומות"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* Table Body - End */}
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
