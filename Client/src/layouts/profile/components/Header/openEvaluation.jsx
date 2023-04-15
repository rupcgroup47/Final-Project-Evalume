import { React, useState, useEffect } from "react";
import CreateYearlyProcessDialog from "dialog/CreateYearlyProcessDialog";
import { Button } from "@mui/material";
export default function OpenEvaluation() {
  const [showCreateOpenEvalueDialog, setShowCreateOpenEvalueDialog] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="white"
        size="large"
        sx={{
          borderRadius: 50,
          height: "100px",
          width: "300px",
        }}
        onClick={() => setShowCreateOpenEvalueDialog((e) => !e)}
      >
        פתיחת תהליך הערכה
      </Button>
      <CreateYearlyProcessDialog
        open={showCreateOpenEvalueDialog}
        setOpen={setShowCreateOpenEvalueDialog}
      />
    </>
  );
}
