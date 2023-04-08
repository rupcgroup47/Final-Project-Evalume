import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { QuestionsContext } from "context/globalVariables";

export default function CreateQuestionsDialog({ open, setOpen }) {
  const titles = ["שירותיות", "אכפתיות"]; // Add all the sections of the questions!!
  const [title, setTitle] = useState("");
  const [content, setQuestion] = useState(""); //// Need to insert question content
  const { globalQuestionArray, setGlobalQuestionsArray } = useContext(QuestionsContext); //Global variable

    const addQuestion = (event) => {
event.preventDefault();
    const index = globalQuestionArray.findIndex(obj => obj.title === title);
  
    if (index !== -1) {
      const newQuestion = { questionId: globalQuestionArray[index].questions.length + 1, name:content }
      const newArray = [...globalQuestionArray];
      newArray[index].questions.push(newQuestion);
      setGlobalQuestionsArray(newArray);
    } else {
      setGlobalQuestionsArray([...globalQuestionArray, { questionId: globalQuestionArray.length + 1, title: title, questions: [content] }]);
    }
    setOpen((e) => !e);

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
              <InputLabel id="title-label">קטגורייה</InputLabel>
              <Select
                labelId="title-label"
                id="title"
                label="קטגורייה"
                // Handle the change event
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                {titles.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {console.log(globalQuestionArray)}
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
          onClick={() => setOpen(false)}
        >
          ביטול
        </Button>
        </DialogActions>

        </form>
      </DialogContent>
    </Dialog>
  );
}
