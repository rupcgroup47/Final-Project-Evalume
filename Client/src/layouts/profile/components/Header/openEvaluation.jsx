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
          height: "60px",
          width: "200px",
        }}
        style={{ position:"absolute", left:"50px", top: "30px", borderRadius:"20px"}}
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
