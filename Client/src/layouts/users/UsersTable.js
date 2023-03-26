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
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { visuallyHidden } from "@mui/utils";
import { useDebounce } from "use-debounce";

import TableItem from "components/TableItem";
import TableToolbar from "components/TableToolbar";

export default function UsersTable({ users, setUsers }) {
  const [tableHead, setTableHead] = useState(_tableHead);
  const [items, setItems] = useState([users]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Update the users array
    setItems(users);
  }, [users]);

  // handleSearch - start
  const [searchInput, setSearchInput] = useState("");
  const [searchDebounce] = useDebounce(searchInput, 500);
  useEffect(() => {
    handleSearch(searchDebounce);
  }, [searchDebounce]);

  const handleSearch = (value) => {
    setSearchInput(value);

    let sx = users.filter((item) =>
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(value.toLowerCase())
    );

    setItems(value?.length > 0 ? sx : users);
  };
  // handleSearch - end

  // handleFilter - start
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterJob, setFilterJob] = useState("");

  useEffect(() => {
    handleFilter();
  }, [filterName, filterEmail, filterGender, filterDepartment, filterJob]);

  const handleFilter = () => {
    let filterdArray = users.filter(
      (user) =>
        (filterName
          ? `${user.firstName} ${user.lastName}`?.toLowerCase().includes(filterName.toLowerCase())
          : true) &&
        (filterGender ? user.userGender.toLowerCase() === filterGender.toLowerCase() : true) &&
        (filterEmail ? user.userEmail.toLowerCase().includes(filterEmail.toLowerCase()) : true) &&
        (filterJob ? user.userJob.toLowerCase().includes(filterJob.toLowerCase()) : true) &&
        (filterDepartment
          ? user.userDepartment.toLowerCase().includes(filterDepartment.toLowerCase())
          : true)
    );

    setItems(filterdArray);
  };
  // handleFilter - end

  // handleRemoveUser - start
  const handleRemoveUser = (user) => {
    setUsers((i) => i.filter((item) => item.userEmail !== user.userEmail));
    setItems((i) => i.filter((item) => item.userEmail !== user.userEmail));

    setSearchInput("");
    setFilterName("");
    setFilterEmail("");
    setFilterGender("");
    setFilterDepartment("");
    setFilterJob("");
  };
  // handleRemoveUser - end

  // shoe empty rows if the array / filted array is epmoty or less then rowsPerPage
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
        //Table Head
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
      />

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          {/* Table Head - Start */}
          <TableHead>
            <TableRow>
              {/* <TableCell align="right" width={40} /> */}

              {tableHead.map((item) => {
                return (
                  item.show && (
                    <TableCell
                      key={item.id}
                      align={item.textAlign || "right"}
                      padding={item.disablePadding ? "none" : "normal"}
                      // sortDirection={orderBy === item.id ? orderType : false}
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
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
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
      />
    </Paper>
  );
}

const _tableHead = [
  {
    id: "fullName",
    textAlign: "right",
    disablePadding: true,
    label: "שם מלא",
    show: true,
  },
  {
    id: "email",
    textAlign: "right",
    disablePadding: false,
    label: "אימייל",
    show: true,
  },
  {
    id: "gender",
    textAlign: "right",
    disablePadding: false,
    label: "מגדר",
    show: true,
  },
  {
    id: "department",
    textAlign: "right",
    disablePadding: false,
    label: "מחלקה",
    show: true,
  },
  {
    id: "job",
    textAlign: "right",
    disablePadding: false,
    label: "תפקיד",
    show: true,
  },
];
