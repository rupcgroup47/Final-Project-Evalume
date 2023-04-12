import { React, useState } from "react";
import CreateYearlyProcessDialog from "dialog/CreateYearlyProcessDialog";
import { Button } from "@mui/material";
export default function OpenEvaluation() {
  const [showCreateOpenEvalueDialog, setShowCreateOpenEvalueDialog] = useState(false);
  const columns = ["משרדי", "תפעולי"];
  const rows = ["מנהל", "עובד"];
  return (
    <>
      <Button onClick={() => setShowCreateOpenEvalueDialog((e) => !e)}>פתיחת תהליך הערכה</Button>
      <CreateYearlyProcessDialog
        open={showCreateOpenEvalueDialog}
        setOpen={setShowCreateOpenEvalueDialog}
        columnHeaders={columns}
        rowHeaders={rows}
        cellData={[
          [
            ["שאלון 1", "שאלון 2"],
            ["שאלון 12", "שאלון 3"],
          ],
          [
            ["שאלון 21", "שאלון 77"],
            ["שאלון 18", "שאלון 66"],
          ],
        ]}
      />
    </>
  );
}
