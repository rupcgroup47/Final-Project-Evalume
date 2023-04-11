import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function DialogSurvey({ open, setOpen, msg, finishRouteMsg }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(msg);
    if (msg === "לא ענית על כל השאלות") {
      // render component A
      setOpen(false);
    } else {
      // render component B
      navigate("layouts/profile");
    }
  };
  return (
    <Dialog maxWidth="xs" fullWidth onClose={() => setOpen((e) => !e)} open={open}>
      <DialogTitle>הודעה</DialogTitle>

      <DialogContent>
        <Typography variant="body1">{msg}</Typography>
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
          onClick={handleClick}
        >
          {finishRouteMsg}{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
