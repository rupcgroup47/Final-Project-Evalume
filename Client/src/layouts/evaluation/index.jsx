/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import { Container } from "@mui/material";


// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

import React, { useState, useEffect, useContext } from "react";
// import "survey-core/defaultV2.min.css";
// import { Model } from "survey-core";
// import { Survey } from "survey-react-ui";
import { useCallback } from "react";
// import { json } from "./json"
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
            <CustomizedSteppers/>
            <SurveyForm/>
        </Container>
    );
}

export default QuestionnaireForm;
