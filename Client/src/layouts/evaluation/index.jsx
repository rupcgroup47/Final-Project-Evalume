import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "./components/steper";
import SurveyForm from "./components/surveyForm";
import PDFFile from "./components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
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
            <PDFDownloadLink document={<PDFFile/>} fileName="טופס הערכה">
                {({loading}) => loading ? (<Button>טעינת קובץ</Button>) : (<Button>הורד קובץ כPFD</Button>)}
            </PDFDownloadLink>
    
        </Container>

    );
}

export default QuestionnaireForm;
