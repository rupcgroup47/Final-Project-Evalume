/*

This is a React functional component that defines a toolbar for a table of users. The toolbar includes a search bar, filter and sort options, and buttons to add a new user and select columns to display in the table.

The component receives several props including users and functions to set users and items, which are used to manage the state of the table. It also receives props related to search and filter functionality, including searchInput, setSearchInput, filterName, setFilterName, and so on. The component uses React's useState hook to manage the state of some of its own components, such as whether to show the search button or the "create user" dialog.

The component returns a Box element containing the toolbar's various elements, including the search bar and buttons for adding a new user, selecting columns, and filtering the table. Additionally, the component returns a CreateUserDialog component that appears when the "create user" button is clicked.

*/

import { useState } from "react";
import { Fade, IconButton, InputBase, Tooltip, Typography, Box } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import FilterMenu from "./FilterMenu";
import SelectColumnsMenu from "./SelectColumnsMenu";
import CreateOrUpdateUserDialog from "../dialog/CreateOrUpdateUserDialog";

export default function TableToolbar({
  // Users
  users,
  setUsers,
  setItems,

  //Table Head
  tableHead,
  setTableHead,

  // Search
  searchInput,
  setSearchInput,

  // Filters
  filterName,
  setFilterName,
  filterEmail,
  setFilterEmail,
  filterGender,
  setFilterGender,
  filterDepartment,
  setFilterDepartment,
  filterJob,
  setFilterJob,
  filterRoleType,
  setFilterRoleType,
  filterDirector,
  setFilterDirector,
  filterActive,
  setFilterActive,
  filterAdmin,
  setFilterAdmin,
  filterRoleGroup,
  setFilterRoleGroup,
}) {
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 16px  8px 16px",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Fade in={!showSearchButton}>
            <Typography variant="h5" fontWeight={600}>
              משתמשים
            </Typography>
          </Fade>

          <Fade in={showSearchButton} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                pl: 1,

                bgcolor: "rgba(0,0,0,.05)",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                width: "max(100%, 250px)",
                maxWidth: 400,
              }}
            >
              <SearchIcon color="disabled" />

              <InputBase
                sx={{
                  pl: 1,
                }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="חיפוש"
              />

              <IconButton
                type="button"
                sx={{ p: 1 }}
                aria-label="search"
                size="small"
                onClick={() => {
                  setSearchInput("");
                  setShowSearchButton(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Fade>
        </div>

        <Box style={{ display: "flex" }}>
          <Tooltip title="הוספה">
            <IconButton
              color="primary"
              onClick={() => setShowCreateUserDialog((e) => !e)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="חיפוש">
            <IconButton onClick={() => setShowSearchButton((e) => !e)}>
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <SelectColumnsMenu
            tableHead={tableHead}
            setTableHead={setTableHead}
          />

          <FilterMenu
            users={users}
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
        </Box>
      </Box>

      <CreateOrUpdateUserDialog
        open={showCreateUserDialog}
        setOpen={setShowCreateUserDialog}
        setUsers={setUsers}
        setItems={setItems}
      />
    </>
  );
}
