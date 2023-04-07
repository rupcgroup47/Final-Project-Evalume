
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
import { ArrayContext } from "context/questions";


export default function CreateQuestionsDialog({ open, setOpen }) {
  const titles = ["שירתיות", "אכפתיות"]; // Add all the sections of the questions!!
  const [title, setTitle] = useState("");
  const [newQuestion1,setQuestion] = useState("")//// Need to insert question content
  const [questions, setQuestions] = useState([]);
  const{globalQuestionArray, setGlobalQuestionsArray} = useContext(ArrayContext);//Global variable

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionContent: "",
      title: "",
    },
  });

  // useEffect(() => {
  //   if (open === true) {
  //     setValue("questionContent", goal?.goalName);
  //   }
  // }, [goal, open]);

  const onSubmit = () => {
    
    console.log(newQuestion1)
    const newQuestion = {
      id: Math.random().toString(36).substr(2, 9),
      questionContent: newQuestion1,
      questionTitle:title
    };

    // Add new question at the end of the array
    setGlobalQuestionsArray([...globalQuestionArray, newQuestion]);
    setOpen((e) => !e);
    reset();
    console.log(newQuestion);
    console.log(globalQuestionArray)
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
          onSubmit={handleSubmit(onSubmit)}
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
            error={errors.questionContent}
              helperText={errors.questionContent && "שם השאלה הוא שדה חובה"}
              {...register("questionContent", { required: true, maxLength: 200 })}
              onChange={(newValue) => setQuestion(newValue.target.value)}      

              sx={{ m: 0, width: "100%" }}
            />
            <FormControl sx={{ m: 0, width: "100%",height:"100%" }}>
              <InputLabel id="title-label">קטגורייה</InputLabel>
              <Select
                labelId="title-label"
                id="title"
                label="קטגורייה"
                {...register("title", { required: true })}
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
          <button id="submitButton" type="submit" style={{ display: "none" }}>
            יצירה
          </button>
        </form>
      </DialogContent>

      <DialogActions sx={{ mr: 2, mb: 2, p: 1, display: "flex", gap: 1 }}>
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
          onClick={() => document.getElementById("submitButton").click()}
          autoFocus
        >
          יצירת שאלה{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}