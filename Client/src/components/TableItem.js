/*
This is a React functional component that renders a table row with user information. The component takes in several props:

user: an object containing user information (such as first name, last name, email, gender, department, and job).
tableHead: an array of objects that define the table header, including which columns to show.
onRemoveButtonClick: a function to be called when the "Delete" button is clicked.

The component uses the useState hook to manage the state of the showCloseDialog variable, which controls whether or not the "Delete" confirmation dialog is shown.

The component then renders a TableRow component with several TableCell components containing user information. The IconButton components with the "Edit" and "Delete" icons allow the user to edit or delete the user information. Clicking the "Delete" button sets the showCloseDialog state to true, which shows the "Delete" confirmation dialog.

The CloseDialog component is rendered outside of the TableRow component, and is conditionally shown when showCloseDialog is true. The CloseDialog component shows a confirmation dialog asking the user if they are sure they want to delete the user, and provides two buttons: "Cancel" and "Delete". If the user clicks the "Delete" button, the onRemoveButtonClick function is called (which presumably removes the user from the table), and showCloseDialog is set to false, hiding the dialog.
*/

import { useState } from "react";
import { Avatar, IconButton, TableCell, TableRow } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import CloseDialog from "../dialog/CloseDialog";
import UpdateUserDialog from "../dialog/CreateOrUpdateUserDialog";

export default function TableItem({
  users,
  setUsers,
  setItems,
  user,
  tableHead,
  onRemoveButtonClick,
}) {
  const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  return (
    <>
      <TableRow
        hover
        // onClick={(event) => handleClick(event, row.name)}
        role="checkbox"
        tabIndex={-1}
      >
        {/* <TableCell>
          <Avatar src={user.userAvatar} alt={user.firstName} />
        </TableCell> */}

        {tableHead.find((i) => i.id === "fullName").show && (
          <TableCell component="th" scope="row" padding="none">
            {`${user.firstName} ${user.lastName}`}
          </TableCell>
        )}
        {tableHead.find((i) => i.id === "email").show && (
          <TableCell align="right">{user.userEmail}</TableCell>
        )}
        {tableHead.find((i) => i.id === "gender").show && (
          <TableCell align="right">{user.userGender}</TableCell>
        )}
        {tableHead.find((i) => i.id === "department").show && (
          <TableCell align="right">{user.userDepartment}</TableCell>
        )}
        {tableHead.find((i) => i.id === "job").show && (
          <TableCell align="right">{user.userJob}</TableCell>
        )}
        <TableCell align="right">
          <IconButton
            color="primary"
            onClick={() => setShowUpdateUserDialog((e) => !e)}
          >
            <EditRoundedIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => setShowCloseDialog((e) => !e)}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <UpdateUserDialog
        open={showUpdateUserDialog}
        setOpen={setShowUpdateUserDialog}
        user={user}
        users={users}
        setUsers={setUsers}
        setItems={setItems}
      />

      <CloseDialog
        open={showCloseDialog}
        setOpen={setShowCloseDialog}
        onClick={() => {
          onRemoveButtonClick();
          setShowCloseDialog((e) => !e);
        }}
      />
    </>
  );
}
