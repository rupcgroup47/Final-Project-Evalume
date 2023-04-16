import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "../steper";
import SurveyForm from "../surveyForm";
import { useLocation } from "react-router-dom";
import Feedback from "../feedback"
import { EvalueContext } from "context/evalueVariables";

function ManagerEvalues() {
  const [, dispatch] = useMaterialUIController();
  const mainState = useContext(MainStateContext);
  const { chosenEmployee, API } = useContext(EvalueContext);
  const [questionsResp, setQuestionsResp] = useState([]);
  const [questionnaireNum, setQuestionnaireNum] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  // GET the evaluation form of the user
  useEffect(() => {
    const abortController = new AbortController();
    console.log(mainState);
    if (currentStep === 1) {
      fetch(
        API.evaluationApi + mainState.mainState.userNum + "&evalu_Part_Type=" + currentStep,
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
            if (result.exption === "user has already filled his survey") {
              console.log("pue");
            }
            else {
              setQuestionnaireNum(result.questionnaireNum);
              setQuestionsResp(result.questionsList);
              setShowForm(true);
            }
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
  }, []);

  const location = useLocation();
  const currentStep = location.state;
  console.log(currentStep);
  const userId = mainState.mainState.userNum;//The employee who is now connected to the system
  // const userManagerId=mainState.mainState.userManagerNum;//The manager of the employee who is now connected to the system
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <CustomizedSteppers currentStep={currentStep} />
      {currentStep === 1 && <SurveyForm userNum={chosenEmployee} employeesManager={userId} evalu_Part_Type={currentStep} questionsResp={questionsResp} questionnaireNum={questionnaireNum} showForm={showForm} />}
      {currentStep === 2 && <Feedback userNum={chosenEmployee} managerId={userId} />}
      {/* <SurveyForm /> */}
    </Container>
  );
}

export default ManagerEvalues;
