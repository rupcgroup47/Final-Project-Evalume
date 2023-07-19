/* eslint-disable */

/*

This is a React functional component that defines a toolbar for a table of users. The toolbar includes a search bar, filter and sort options, and buttons to add a new user and select columns to display in the table.

The component receives several props including users and functions to set users and items, which are used to manage the state of the table. It also receives props related to search and filter functionality, including searchInput, setSearchInput, filterName, setFilterName, and so on. The component uses React's useState hook to manage the state of some of its own components, such as whether to show the search button or the "create user" dialog.

The component returns a Box element containing the toolbar's various elements, including the search bar and buttons for adding a new user, selecting columns, and filtering the table. Additionally, the component returns a CreateUserDialog component that appears when the "create user" button is clicked.

*/

import { useState } from "react";
import {
  Fade,
  IconButton,
  InputBase,
  Tooltip,
  Dialog,
  DialogContent,
  Button
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CreateOrUpdateGoalDialog from "dialog/CreateOrUpdateGoalDialog";
import GoalsInfoTable from "./GoalsInfoTable";

export default function TableToolbarGoal({
  setGoals,
  setItems,
  searchInput,
  setSearchInput,
  condition
}) {
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [showCreateGoalDialog, setShowCreateGoalDialog] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };

  const handleCondition = () => {//Checks if the Add goal is from the managers page or Admin page
    if (condition){
      setShowCreateGoalDialog(true)
    } else {
      setIsPopupOpen(true)
    }
  }

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
              onClick={() => handleCondition()}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="חיפוש">
            <IconButton onClick={() => setShowSearchButton((e) => !e)}>
              <SearchIcon />
            </IconButton>
          </Tooltip>

        </Box>
      </Box>


      <CreateOrUpdateGoalDialog
        open={showCreateGoalDialog}
        setOpen={setShowCreateGoalDialog}
        setGoals={setGoals}
        setItems={setItems}
      />

      <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
        <Button onClick={handleCloseDialog}>חזרה לדף הקודם</Button>
        <DialogContent>
          <GoalsInfoTable />
        </DialogContent>
      </Dialog>
    </>
  );
}
