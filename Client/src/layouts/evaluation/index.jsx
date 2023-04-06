import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "./components/steper";
import SurveyForm from "./components/surveyForm";
function QuestionnaireForm() {

    const [, dispatch] = useMaterialUIController();
    const mainState = useContext(MainStateContext)
    const [count, setCount] = useState(0);

    // Changing the direction to rtl
    useEffect(() => {
        setDirection(dispatch, "rtl");

        return () => setDirection(dispatch, "ltr");
    }, []);


    return (
        <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
            <CustomizedSteppers />
            <SurveyForm />    
        </Container>

    );
}

export default QuestionnaireForm;
