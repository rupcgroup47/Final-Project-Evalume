/*
This is a React functional component that displays a dialog box with a confirmation message when the user tries to delete a user from a table. It receives three props: open, setOpen, and onClick.

The open prop is a boolean that determines whether the dialog box should be open or closed. The setOpen prop is a function that is called when the user clicks the close button or clicks outside the dialog box to close it. The onClick prop is a function that is called when the user clicks the Agree button to confirm the deletion of the user.

The component uses the Dialog component from MUI to display the dialog box. The dialog box contains a DialogTitle, a DialogContent with a Typography component that displays the confirmation message, and two DialogActions with Button components. The Cancel button simply closes the dialog box, while the Agree button calls the onClick function passed as a prop and then closes the dialog box.

Overall, this component is a simple and reusable way to display a confirmation dialog box in a React application.
*/

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function CloseDialog({ open, setOpen, onClick }) {

  return (
    <Dialog maxWidth="xs" fullWidth onClose={() => setOpen((e) => !e)} open={open}>
      <DialogTitle>שינוי מצב המשתמש</DialogTitle>

      <DialogContent>
        <Typography variant="body1">האם אתה בטוח שאתה רוצה להפוך את המשתמש ללא פעיל ? </Typography>
      </DialogContent>

      <DialogActions sx={{ m: 2, p: 1, display: "flex", gap: 1 }}>
        <Button
          sx={{
            fontWeight: 600,
            textTransform: "none",
            bgcolor: "#1976d226",
            pl: 2,
            pr: 2,
            "&:hover": {
              bgcolor: "#1976d240",
            },
          }}
          color="primary"
          onClick={() => setOpen(false)}
        >
          ביטול
        </Button>
        <Button
          sx={{
            fontWeight: 500,
            textTransform: "none",
            bgcolor: "#d32f2f26",
            pl: 4,
            pr: 4,
            "&:hover": {
              bgcolor: "#d32f2f40",
            },
          }}
          color="error"
          onClick={onClick}
          autoFocus
        >
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
}
