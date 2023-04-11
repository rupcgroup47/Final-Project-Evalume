import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "../steper";
import { StepperContext } from "context/globalVariables";
import SurveyForm from "../surveyForm";
import { useLocation } from 'react-router-dom';

function ManagerEvalues() {
  const [, dispatch] = useMaterialUIController();
  const mainState = useContext(MainStateContext);
  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
  // const myValue = useContext(StepperContext)
  // const [currentStep, setCurrentStep] = useState(0)
  const location = useLocation();
  const currentStep = location.state;
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      {console.log(currentStep)}
      {/* <StepperContext.Provider value={{ currentStep, setCurrentStep }}> */}
        <CustomizedSteppers currentStep={currentStep} />
      {/* </StepperContext.Provider> */}

      <SurveyForm />
    </Container>
  );
}

export default ManagerEvalues;
