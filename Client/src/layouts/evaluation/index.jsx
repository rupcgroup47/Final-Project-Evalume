import { Card, Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import React, { useState, useEffect, useContext } from "react";
import { MainStateContext } from "App";
import CustomizedSteppers from "./components/steper";
import SurveyForm from "./components/surveyForm";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function QuestionnaireForm() {
  const [, dispatch] = useMaterialUIController();
  const mainState = useContext(MainStateContext);
  const evaluationApi = "https://localhost:7079/userNum?userNum=";
  const evalu_Part_Type = 0;
  const [questionsResp, setQuestionsResp] = useState([]);
  const [questionnaireNum, setQuestionnaireNum] = useState("");
  const [finishState, setFinishState] = useState(false);

  // GET the evaluation form of the user
  useEffect(() => {
    const abortController = new AbortController();
    if (mainState.mainState.userNum) {
      fetch(
        evaluationApi + mainState.mainState.userNum,
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
            if (result.exption === "user has already filled his survey") {
              setFinishState(true);
            }
            else {
              setQuestionnaireNum(result.questionnaireNum);
              setQuestionsResp(result.questionsList);
            }
          },
          (error) => {
            console.log(error);
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
  }, []);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  const userId = mainState.mainState.userNum;//The employee who is now connected to the system
  const userManagerId = mainState.mainState.userManagerNum;//The manager of the employee who is now connected to the system
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <CustomizedSteppers currentStep={evalu_Part_Type} />
      <SurveyForm userNum={userId} employeesManager={userManagerId} evalu_Part_Type={evalu_Part_Type} questionsResp={questionsResp} questionnaireNum={questionnaireNum} />
      <div>
        {
          finishState ? (
            <MDBox mt={1} mx={0.5} marginTop="50px">
              <MDBox mb={1}>
                <MDTypography variant="h2" textTransform="capitalize">
                  מילאת את ההערכה השנתית עבור שנה זאת
                </MDTypography>
              </MDBox>
            </MDBox>
          ) : null
        }
      </div>
    </Container>
  );
}

export default QuestionnaireForm;
