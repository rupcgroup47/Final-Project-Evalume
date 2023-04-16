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
// import { MainStateContext } from "App";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import FinishDialog from "./components/FinishDialog";
import { EvalueContext } from "context/evalueVariables";
// import {featchAPI} from "fetchAPI";

export default function Evalues() {
  const [, dispatch] = useMaterialUIController();
  const [showFormComponent, setShowFormComponent] = useState(false);
  const [myCheckedArray, setMyArray] = useState([]);
  const [myFormTypes, setMyObject] = useState({});
  const myNewForm = { myCheckedArray, myFormTypes }; // The final form the user created - Object with roleType, groupType and the checked answers
  const [showCreateQuestionDialog, setShowCreateQuestionDialog] = useState(false);
  const { API } = useContext(EvalueContext);
  const [globalQuestionArray, setGlobalQuestionsArray] = useState([]);
  const [tempQuestionArray, settempQuestionArray] = useState([]);
  const [postQuestion, setPostQuestion] = useState({});
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [statusMsg, setMsg] = useState("");
  const [finishRouteMsg, setRouteMsg] = useState("");
  const [showAddQuestion, setShowAddQuestion] = useState(false);//Adjustments according to the type of form - existing or new
  const [existForms, setExistForms] = useState([])//Questionnaires that are adapted to the type of roletype and rolegrouptype
  const [sendExistForms, setSendExistForms] = useState(false)//An indication that we can get questionnaires from the server that are adapted to the type of roletype and rolegrouptype
  const [chosenParameters, setChosenParameters] = useState({});
  const location = useLocation();
  const isOldForms = location.state;

  // Bring all questions using GET api
  useEffect(() => {
    const abortController = new AbortController();
    if (!isOldForms) {
      fetch(
        API.apiQuestionrUrl,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          signal: abortController.signal,
        })
        .then(async (response) => {
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
            if (error.name === "AbortError") return;
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    }
  }, [isOldForms]);

  // Post a new questions using Post api
  useEffect(() => {
    const abortController = new AbortController();
    if (postQuestion.quesContent !== undefined) {
      fetch(
        API.apiQuestionrUrl,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(postQuestion),
          signal: abortController.signal,
        })
        .then(async (response) => {
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
            const index = tempQuestionArray.findIndex(
              (obj) => obj.quesGroup_Desc === postQuestion.quesGroup_Desc
            );
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
              button: "סגור",
            });
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err get=", error);
            swal({
              title: "קרתה תקלה!",
              text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
              icon: "error",
              button: "סגור",
            });
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    }
  }, [postQuestion]);

  // Post a new Evaluation using Post api
  useEffect(() => {
    const abortController = new AbortController();
    if (myCheckedArray.length !== 0) {
      fetch(
        API.apinewEvaluationQues,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(myNewForm),
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
            setMyArray([]);
            setMsg("סיימת למלא את טופס ההערכה");
            setRouteMsg("חזרה לדף הבית");
            setShowCloseDialog((e) => !e); // Error dialog message
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
  }, [myNewForm]);

  // Gat all questionnaires that fit the roletype and grouptype using GET api
  useEffect(() => {
    const abortController = new AbortController();
    if (chosenParameters.roleType !== undefined) {
      fetch(
        API.apiQuestionnaire + (chosenParameters.roleType === 1 ? true : false) + "&roleGroup_Type=" + chosenParameters.groupType,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          signal: abortController.signal,
        })
        .then(async (response) => {
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
            // console.log(result);
            setExistForms(result);
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    }
  }, [chosenParameters]);

  // Bring all questions of a specific questionnaire using GET api
  useEffect(() => {
    const abortController = new AbortController();
    if (myFormTypes.chosenForm !== undefined && isOldForms) {
      fetch(
        API.apiQuestionnaireQuestiones + myFormTypes.chosenForm,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          signal: abortController.signal,
        })
        .then(async (response) => {
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
            console.log("bani");
            console.log("success");
            if (result.questionnaireNum === myFormTypes.chosenForm) // make sure the correct questionnaire arrived
            {
              console.log(result.questionsList);
              setGlobalQuestionsArray(result.questionsList);
            }
            else console.log("something went wrong");
          },
          (error) => {
            if (error.name === "AbortError") return;
            console.log("err get=", error);
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    }
  }, [myFormTypes]);

  // set the globalQuestionArray with the relevant question by the user decision
  useEffect(() => {
    if (!isOldForms && myFormTypes.roleType !== undefined) {
      if (myFormTypes.roleType === 0) {
        const filteredArray = tempQuestionArray.filter(
          (item) => (item.groupType ? 1 : 0) === myFormTypes.roleType
        );
        setGlobalQuestionsArray(filteredArray);
      } else setGlobalQuestionsArray(tempQuestionArray);

      setShowFormComponent(true); // show form with questions only if all required fields
    }
  }, [myFormTypes]);

  // set the globalQuestionArray with the relevant questions
  useEffect(() => {
    if (isOldForms && globalQuestionArray.length !== 0) {
      setShowFormComponent(true); // show form with questions only if all required fields
    }
  }, [globalQuestionArray]);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  console.log(globalQuestionArray);
  console.log(JSON.stringify(myNewForm));

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <h1
        style={{ padding: "10px 20px", textAlign: "center", color: "black", fontFamily: "Rubik" }}
      >
        הקמת טופס הערכה{" "}
      </h1>
      {!isOldForms && (//hide and show according to the type of questionnaire constructed
        <Box style={{ display: "flex" }}>
          <Tooltip title="הוספה">
            <IconButton color="black" onClick={() => setShowCreateQuestionDialog((e) => !e)}>
              <AddIcon />
              הוספת שאלה
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {isOldForms && showAddQuestion && (//hide and show according to the type of questionnaire constructed
        <Box style={{ display: "flex" }}>
          <Tooltip title="הוספה">
            <IconButton color="black" onClick={() => setShowCreateQuestionDialog((e) => !e)}>
              <AddIcon />
              הוספת שאלה
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <QuestionsContext.Provider value={{ globalQuestionArray, setGlobalQuestionsArray }}>
        {/* {console.log(isOldForms)} */}

        <CreateQuestionsDialog
          open={showCreateQuestionDialog}//Open the add question dialog
          setOpen={setShowCreateQuestionDialog}
          tempQuestionArray={tempQuestionArray}
          settempQuestionArray={settempQuestionArray}
          setPostQuestion={setPostQuestion}
        />
        <HeaderFrom
          setMyObject={setMyObject}//receiving from the header roletype & rolegroup type 
          isOld={isOldForms}
          // showAddQuestion={showAddQuestion}
          setShowAddQuestion={setShowAddQuestion}
          existForms={existForms}
          setSendExistForms={setSendExistForms}//An indication that you can receive questionnaires from the server that are adapted to the type of position and rank
          setChosenParameters={setChosenParameters}
        />
        {/* {console.log(sendExistForms)} */}
        {showFormComponent && <FormBuilder setMyArray={setMyArray} />}
      </QuestionsContext.Provider>
      <FinishDialog
        open={showCloseDialog}
        setOpen={setShowCloseDialog}
        msg={statusMsg}
        finishRouteMsg={finishRouteMsg}
        onClick={() => {
          setShowCloseDialog((e) => !e);
        }}
      />
    </Container>
  );
}
