import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "./components/steper";
import SurveyForm from "./components/surveyForm";
import { StepperContext } from "context/globalVariables";



function QuestionnaireForm() {

    const [, dispatch] = useMaterialUIController();
    const mainState = useContext(MainStateContext)

    // Changing the direction to rtl
    useEffect(() => {
        setDirection(dispatch, "rtl");

        return () => setDirection(dispatch, "ltr");
    }, []);

const [currentStep,setCurrentStep] = useState(0)
    return (

        <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
            <StepperContext.Provider value={{currentStep,setCurrentStep}}>
            <CustomizedSteppers />
            </StepperContext.Provider>
            <SurveyForm />    
        </Container>

    );
}

export default QuestionnaireForm;
