import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "../steper";
import SurveyForm from "../surveyForm";
import { useLocation } from "react-router-dom";
import Feedback from "../feedback"

function ManagerEvalues() {
  const [, dispatch] = useMaterialUIController();
  const mainState = useContext(MainStateContext);
  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  const location = useLocation();
  const currentStep = location.state;
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <CustomizedSteppers currentStep={currentStep} />
      {currentStep === 1 && <SurveyForm/>}
      {currentStep === 2 && <Feedback/>}
      {/* <SurveyForm /> */}
    </Container>
  );
}

export default ManagerEvalues;
