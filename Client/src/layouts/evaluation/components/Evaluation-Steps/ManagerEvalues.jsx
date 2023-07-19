/* eslint-disable */

import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";
import { Card, Container, CardMedia, CardContent, Typography } from "@mui/material";
import CustomizedSteppers from "../steper";
import SurveyForm from "../surveyForm";
import Feedback from "../feedback"

function ManagerEvalues() {
  const [, dispatch] = useMaterialUIController();
  const mainState = useContext(MainStateContext);
  const { chosenEmployee, API } = useContext(EvalueContext);
  const [questionsResp, setQuestionsResp] = useState([]);
  const [questionnaireNum, setQuestionnaireNum] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [finishState, setFinishState] = useState(false);
  const location = useLocation();
  const currentStep = location.state;
  const userId = mainState.mainState.userNum;// The employee who is now connected to the system

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  // GET the evaluation form of the user
  useEffect(() => {
    const abortController = new AbortController();
    if (mainState.mainState) {
      fetch(
        API.evaluationApi + chosenEmployee.userNum + "&evalu_Part_Type=" + currentStep,
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
            if (result.userNum === undefined && currentStep === 2) {
              setQuestionnaireNum(result.questionnaireNum);
            }
            else if (result.userNum === undefined && currentStep === 1) { //  once the list will be dynamic shouldn't be happened
              setFinishState(true);
            }
            else {
              console.log(result);
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
    return () => {
      abortController.abort();
      // stop the query by aborting on the AbortController on unmount
    };
  }, []);


  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <CustomizedSteppers currentStep={currentStep} />
      {currentStep === 1 && <SurveyForm userNum={chosenEmployee.userNum} employeesManager={userId} evalu_Part_Type={currentStep} questionsResp={questionsResp} questionnaireNum={questionnaireNum} showForm={showForm} />}
      {currentStep === 2 && <Feedback userNum={chosenEmployee.userNum} evalu_Part_Type={currentStep} questionnaireNum={questionnaireNum} />}
      <div>
        {
          finishState ? (
            <Container maxWidth="xl" sx={{ pt: 5, pb: 5, display: "flex" }}>
              <Card sx={{ maxWidth: 400, minHeight: "400px", margin: "auto" }}>
                <CardContent sx={{ padding: "8px" }}>
                  <Typography gutterBottom component="div" variant="h3" style={{ textAlign: "center" }}>
                    מילאת את ההערכה השנתית עבור שנה זאת
                  </Typography>
                </CardContent>
                <CardMedia
                  sx={{ height: "auto", minHeight: "350px", width: "auto", minWidth: "350px", mb: "10px" }}
                  image={require("../../../../assets/images/Thumbs-Up-cartoon-drawing.jpg")}
                  title="Thumbs-Up"
                />
              </Card>
            </Container>
          ) : null
        }
      </div>
    </Container>
  );
}

export default ManagerEvalues;
