import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "./components/steper";
import SurveyForm from "./components/surveyForm";

function QuestionnaireForm() {
  const [, dispatch] = useMaterialUIController();
  const mainState = useContext(MainStateContext);
  // const evaluationApi = "https://localhost:7079/api/";
  const step = 0;

  // GET the evaluation form of the user
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   console.log("ani");
  //   // console.log(myFormTypes.chosenForm);
  //   if (myFormTypes.chosenForm !== undefined && isOldForms) {
  //     fetch(
  //       apiQuestionnaireQuestiones + myFormTypes.chosenForm,
  //       {
  //         method: "GET",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Accept: "application/json; charset=UTF-8",
  //         }),
  //         signal: abortController.signal,
  //       })
  //       .then(async (response) => {
  //         const data = await response.json();
  //         console.log(response);

  //         if (!response.ok) {
  //           // get error message from body or default to response statusText
  //           const error = (data && data.message) || response.statusText;
  //           return Promise.reject(error);
  //         }

  //         return data;
  //       })
  //       .then(
  //         (result) => {
  //           console.log("bani");
  //           console.log("success");
  //           if (result.questionnaireNum === myFormTypes.chosenForm) // make sure the correct questionnaire arrived
  //           {
  //             console.log(result.questionsList);
  //             setGlobalQuestionsArray(result.questionsList);
  //           }
  //           else console.log("something went wrong");
  //         },
  //         (error) => {
  //           if (error.name === "AbortError") return;
  //           console.log("err get=", error);
  //           throw error;
  //         }
  //       );
  //     return () => {
  //       abortController.abort();
  //       // stop the query by aborting on the AbortController on unmount
  //     };
  //   }
  // }, [myFormTypes]);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
  const userId = mainState.mainState.userNum;//The employee who is now connected to the system
  const userManagerId = mainState.mainState.userManagerNum;//The manager of the employee who is now connected to the system
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <CustomizedSteppers currentStep={step} />
      <SurveyForm employeeId={userId} employeesManager={userManagerId} step={step} />
    </Container>
  );
}

export default QuestionnaireForm;
