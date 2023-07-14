import { React, useState } from "react";
import CreateYearlyProcessDialog from "dialog/CreateYearlyProcessDialog";
import { Button } from "@mui/material";

export default function OpenEvaluation({questionnairesData}) {
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
        style={{ position:"absolute", left:"20px", top: "20px", borderRadius:"20px"}}
        onClick={() => setShowCreateOpenEvalueDialog((e) => !e)}
      >
        פתיחת תהליך הערכה
      </Button>
      <CreateYearlyProcessDialog
        open={showCreateOpenEvalueDialog}
        setOpen={setShowCreateOpenEvalueDialog}
        questionnairesData={questionnairesData}
      />
    </>
  );
}
