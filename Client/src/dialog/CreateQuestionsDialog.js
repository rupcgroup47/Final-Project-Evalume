import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  FormControl,
  // FormHelperText,
  InputLabel,
} from "@mui/material";

import { useEffect, useState, useContext } from "react";
// import { QuestionsContext } from "context/globalVariables";

export default function CreateQuestionsDialog({
  open,
  setOpen,
  tempQuestionArray,
  setPostQuestion,
}) {
  const [titles, setTitles] = useState([]); // Add all the sections of the questions!!
  const [title, setTitle] = useState("");
  const [content, setQuestion] = useState(""); // Need to insert question content
  // const { globalQuestionArray, setGlobalQuestionsArray } = useContext(QuestionsContext); // Global variable

  const addQuestion = (event) => {
    event.preventDefault();
    // const index = tempQuestionArray.findIndex((obj) => obj.QuesGroup_Desc === title);
    const newQuestion = {
      quesContent: content,
      quesGroup_Desc: title,
    };
    setPostQuestion(newQuestion);
    // if (index !== -1) {

    // }
    // else {
    // //   setGlobalQuestionsArray([
    // //     ...tempQuestionArray,
    // //     {
    // //       questionNum: globalQuestionArray.length + 1,
    // //       quesGroup_Desc: title,
    // //       questions: [content],
    //     },
    //   ]);
    // }
    setOpen((e) => !e);
  };

  useEffect(() => {
    console.log("here");
    console.log(tempQuestionArray);
    if (tempQuestionArray !== null) {
      const titleArray = tempQuestionArray.map((item) => item.quesGroup_Desc);
      setTitles(titleArray);
    }
  }, [tempQuestionArray]);

  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false);
    setTitle("");
  };

  return (
    <Dialog fullWidth maxWidth="lg" onClose={() => setOpen((e) => !e)} open={open}>
      <DialogTitle sx={{ fontWeight: 600 }}> צור שאלה</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <form
          style={{
            width: "100%",
            flex: 1,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <TextField
              size="small"
              id="questionContent"
              label="שם השאלה"
              onChange={(newValue) => setQuestion(newValue.target.value)}
              sx={{ m: 0, width: "100%" }}
            />
            <FormControl sx={{ m: 0, width: "100%", height: "100%" }}>
              <InputLabel id="title-label" style={{ alignSelf: "center" }}>
                קטגורייה
              </InputLabel>
              <Select
                labelId="title-label"
                id="title"
                label="קטגורייה"
                // Handle the change event
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ minHeight: "40px", alignContent: "center" }}
              >
                {titles?.map((titleItem) => (
                  <MenuItem key={titleItem} value={titleItem}>
                    {titleItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <DialogActions sx={{ mr: 2, mb: 2, p: 1, display: "flex", gap: 1 }}>
            <Button
              sx={{
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "#1976d226",
                pl: 4,
                pr: 4,
                "&:hover": {
                  bgcolor: "#1976d240",
                },
              }}
              color="primary"
              onClick={addQuestion}
              autoFocus
              type="submit"
            >
              יצירת שאלה{" "}
            </Button>
            <Button
              sx={{
                fontWeight: 500,
                textTransform: "none",
                bgcolor: "#d32f2f26",
                pl: 2,
                pr: 2,
                "&:hover": {
                  bgcolor: "#d32f2f40",
                },
              }}
              color="error"
              onClick={handleClose}
            >
              ביטול
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
