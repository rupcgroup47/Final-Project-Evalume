import React from "react";
import { useState, useContext } from "react";
// Material Dashboard 2 React examples
import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import FormBuilder from "./components/FormBuilder";
import { Fade, IconButton, InputBase, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import HeaderFrom from "./components/header";
import CreateQuestionsDialog from "dialog/CreateQuestionsDialog";
import { QuestionsContext } from "context/globalVariables";

export default function Evalues() {
  const [, dispatch] = useMaterialUIController();
  const [showFormComponent, setShowFormComponent] = useState(false);
  const [surveyId, setSurveyId] = useState("1")
  const [myCheckedArray, setMyArray] = useState([]);
  const [myFormTypes, setMyObject] = useState({});
  const myNewForm = { surveyId, myCheckedArray, myFormTypes }; // The final form the user created - Object with roleType, groupType and the checked answers
  const [showCreateQuestionDialog, setShowCreateQuestionDialog] = useState(false);
  const [globalQuestionArray, setGlobalQuestionsArray] = useState([{
    id: 1,
    title: "אכפתיות",
    questions: [
      {
        questionId: 1,
        name: "Question Name 1"
      },
      {
        questionId: 2,
        name: "Question Name 2"
      }
    ]
  }, {id:2, title:"שירותיות", questions:[]}]);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  function updateArray(myCheckedArray) {
    // receive the checked answers
    setMyArray(myCheckedArray);
    setSurveyId(Math.random().toString(36).substr(2, 9))
    console.log(myNewForm);
  }

  function updateObject(myFormTypes) {
    // receive the form user type
    setMyObject(myFormTypes);
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <h1 style={{ padding: "10px 20px", textAlign: "center", color: "black" }}>
        בניית טופס הערכה{" "}
      </h1>
      <Box style={{ display: "flex" }}>
        <Tooltip title="הוספה">
          <IconButton color="black" onClick={() => setShowCreateQuestionDialog((e) => !e)}>
            <AddIcon />
            הוספת שאלה
          </IconButton>
        </Tooltip>
      </Box>
      <QuestionsContext.Provider value={{ globalQuestionArray, setGlobalQuestionsArray }}>
        <CreateQuestionsDialog
          open={showCreateQuestionDialog}
          setOpen={setShowCreateQuestionDialog}
        />
        <HeaderFrom updateObject={updateObject} setShowFormComponent={setShowFormComponent} />
        {showFormComponent && <FormBuilder updateArray={updateArray} />}
      </QuestionsContext.Provider>
      
    </Container>
  );
}
