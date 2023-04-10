import React from "react";
import { useState, useContext, useEffect } from "react";
// Material Dashboard 2 React examples
import { Container, Typography, Fade, IconButton, InputBase, Tooltip } from "@mui/material";
import FormBuilder from "./components/FormBuilder";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import HeaderFrom from "./components/header";
import CreateQuestionsDialog from "dialog/CreateQuestionsDialog";
import { QuestionsContext } from "context/globalVariables";
import { MainStateContext } from "App";
import swal from 'sweetalert';

export default function Evalues() {
  const [, dispatch] = useMaterialUIController();
  const [showFormComponent, setShowFormComponent] = useState(false);
  const [surveyId, setSurveyId] = useState("1")
  const [myCheckedArray, setMyArray] = useState([]);
  const [myFormTypes, setMyObject] = useState({});
  const myNewForm = { surveyId, myCheckedArray, myFormTypes }; // The final form the user created - Object with roleType, groupType and the checked answers
  const [showCreateQuestionDialog, setShowCreateQuestionDialog] = useState(false);
  const apiQuestionrUrl = "https://localhost:7079/api/Question";
  const { mainState, setMainState } = useContext(MainStateContext);
  const [globalQuestionArray, setGlobalQuestionsArray] = useState([]);
  const [tempQuestionArray, settempQuestionArray] = useState([]);
  const [postQuestion, setPostQuestion] = useState({});

  // Bring all questions using GET api
  useEffect(() => {
    const abortController = new AbortController()
    if (mainState.is_Admin) {
      fetch(
        apiQuestionrUrl,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          signal: abortController.signal,
        })
        .then(async response => {
          const data = await response.json();
          console.log(response);

          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          return data;
        })
        .then(
          (result) => {
            console.log("success");
            settempQuestionArray(result);
          },
          (error) => {
            if (error.name === 'AbortError') return;
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    };
  }, [mainState]);

  // Post a new questions using Post api
  useEffect(() => {
    const abortController = new AbortController()
    console.log("postQuestion",postQuestion);
    if (postQuestion.quesContent !== undefined) {
      fetch(
        apiQuestionrUrl,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(postQuestion),
          signal: abortController.signal,
        })
        .then(async response => {
          const data = await response.json();
          console.log(response);

          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          return data;
        })
        .then(
          (result) => {
            console.log("success");
            console.log(result);
            const index = tempQuestionArray.findIndex((obj) => obj.quesGroup_Desc === postQuestion.quesGroup_Desc);
            const newArray = [...tempQuestionArray];
            const newQuestion = {
              quesContent: postQuestion.quesContent,
              questionNum: result,
              is_Active: true,
            };
            newArray[index].questions.push(newQuestion);
            if (globalQuestionArray !== null) setGlobalQuestionsArray(newArray);
            else settempQuestionArray(newArray);
            swal({
              title: "הצלחנו!",
              text: "השאלה נוספה בהצלחה",
              icon: "success",
              button: "סגור"
            });
          },
          (error) => {
            if (error.name === 'AbortError') return;
            console.log("err get=", error);
            swal({
              title: "קרתה תקלה!",
              text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
              icon: "error",
              button: "סגור"
            });
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    };
  }, [postQuestion]);

  // set the globalQuestionArray with the relevant question by the user decision
  useEffect(() => {
    if (myFormTypes.roleType !== undefined) {
      if (myFormTypes.roleType === 0) {
        const filteredArray = tempQuestionArray.filter((item) => (item.groupType ? 1 : 0) === myFormTypes.roleType);
        setGlobalQuestionsArray(filteredArray);
      }
      else setGlobalQuestionsArray(tempQuestionArray)

      setShowFormComponent(true); // show form with questions only if all required fields
    }
  }, [myFormTypes]);

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
          tempQuestionArray={tempQuestionArray}
          settempQuestionArray={settempQuestionArray}
          setPostQuestion={setPostQuestion}
        />
        <HeaderFrom updateObject={updateObject} />
        {showFormComponent && <FormBuilder updateArray={updateArray} />}
      </QuestionsContext.Provider>

    </Container>
  );
}

