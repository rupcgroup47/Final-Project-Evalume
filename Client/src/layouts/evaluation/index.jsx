import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "./components/steper";
import SurveyForm from "./components/surveyForm";

function QuestionnaireForm() {
  const [, dispatch] = useMaterialUIController();
  const mainState = useContext(MainStateContext);
const step=0;
  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
  const userId= mainState.mainState.userNum;//The employee who is now connected to the system
  const userManagerId=mainState.mainState.userManagerNum;//The manager of the employee who is now connected to the system
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <CustomizedSteppers currentStep={step} />
      <SurveyForm employeeId={userId} employeesManager={userManagerId} step={step} />
    </Container>
  );
}

export default QuestionnaireForm;
