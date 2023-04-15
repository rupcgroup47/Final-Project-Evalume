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
  const { chosenEmployee } = useContext(EvalueContext);
  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  const location = useLocation();
  const currentStep = location.state;
  const userId= mainState.mainState.userNum;//The employee who is now connected to the system
  // const userManagerId=mainState.mainState.userManagerNum;//The manager of the employee who is now connected to the system
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <CustomizedSteppers currentStep={currentStep}/>
      {currentStep === 1 && <SurveyForm employeeId={chosenEmployee} employeesManager={userId} step={currentStep}/>}
      {currentStep === 2 && <Feedback employeeId={chosenEmployee} managerId={userId}/>}
      {/* <SurveyForm /> */}
    </Container>
  );
}

export default ManagerEvalues;
