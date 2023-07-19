/* eslint-disable */

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { EvalueContext } from "context/evalueVariables";
import swal from "sweetalert";
import DialogSurvey from "./DialogSurvey";
import RadioButtons from "./survey-component/RadioButtons";

export default function surveyForm({ userNum, employeesManager, evalu_Part_Type, questionsResp, questionnaireNum, showForm, mainState, setMainState }) {
  const [expanded, setExpanded] = useState(1);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [statusMsg, setMsg] = useState("");
  const [finishRouteMsg, setRouteMsg] = useState("");
  const flatQuestions = questionsResp?.flatMap((group) => group.questions);
  const { API } = useContext(EvalueContext);
  const totalQuestions = flatQuestions?.length;// Checking how many questions there are in the array to make sure all the questions were answered at the end
  const [finalSelfEvaluation, setFinalSelfEvaluation] = useState();
  const criterias = [
    "לא רלוונטי לתפקיד",
    "לא עומד בציפיות",
    "עומד בחלק מהציפיות",
    "עומד כמעט בכל הציפיות",
    "עומד בציפיות",
    "עומד בכל הציפיות",
  ];
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function itemExists(itemId) {//Checking if the question has already been answered
    return items.some((item) => item.id === itemId);
  }

  function updateItem(itemId, value) {
    // Update radio button answer if the answer was marked allready in the same question
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          numericAnswer: value,
        };
      }
      return item;
    });
    setItems(updatedItems);
  }

  const handleselectedValueChange = (itemId, questionId, value) => {
    // Update radio button answer if the answer was marked allready in the same question  or add the answer to the questions array
    console.log(items)
    if (items.length > 0 && itemExists(itemId)) {
      updateItem(itemId, value);//If the question has already been answered then update the answer to the latest answer
    } else {
      const item = {
        id: itemId,
        questionNum: questionId,
        numericAnswer: value,
      };
      setItems((prevArray) => [...prevArray, item]);//Inserting a new answer into the array
    }

  };

  function handleTextFieldChange(id, event) {
    // Get text field value for answer
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, verbalAnswer: event.target.value };
      }
      return item;
    });
    setItems(newItems);
  }

  const { handleSubmit } = useForm();
  const onSubmit = (data, event) => {
    event.preventDefault();

    if (items.length !== totalQuestions) {
      // Checking weather the user answer all the questions
      setShowCloseDialog((e) => !e); // Error dialog message
      setMsg("לא ענית על כל השאלות");
      setRouteMsg("חזרה לשאלון");
    } else {
      const selfEvaluationObj = sendDataToServer();
      setFinalSelfEvaluation({ ...selfEvaluationObj });
    }
  };


  function sendDataToServer() {
    const answers = items.map(({ id, ...rest }) => rest);
    setItems(answers);
    if (evalu_Part_Type === 0) {//If the input is self evaluation then the object that will be returned is that the employee filled in and evalue himself
      return { questionnaireNum, userNum, userNum, evalu_Part_Type, answers };
    } else if (evalu_Part_Type === 1) {
      return { questionnaireNum, employeesManager, userNum, evalu_Part_Type, answers };// employees manager is the current user which evalue the employee id

    }
  }

  // Post a new finished Evaluation using Post api
  useEffect(() => {
    const abortController = new AbortController();
    if (finalSelfEvaluation !== undefined) {
      fetch(
        API.apiEvaluationQues,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(finalSelfEvaluation),
          signal: abortController.signal,
        })
        .then(async response => {
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
            console.log("success", result);
            if (evalu_Part_Type === 0) {
              updateLocalStorage();
              setMsg("ענית על כל השאלות, מנהל ייצור איתך קשר לפגישת הערכה");
              setRouteMsg("חזרה לדף הבית");
              setShowCloseDialog((e) => !e); // Error dialog message
            }
            if (evalu_Part_Type === 1) {
              setMsg("ענית על כל השאלות, זה הזמן לתאם פגישת הערכה");
              setRouteMsg("חזרה לדף הבית");
              setShowCloseDialog((e) => !e); // Error dialog message
            }
          },
          (error) => {
            if (error.name === 'AbortError') return;
            console.log("err get=", error);
            swal({
              title: "קרתה תקלה!",
              text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
              icon: "error",
              button: "סגור"
            });
            throw error;
          }
        );
      return () => {
        abortController.abort();
        // stop the query by aborting on the AbortController on unmount
      };
    };
  }, [finalSelfEvaluation]);

  const updateLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("Current User"));
    data.self_Evalu = 0;
    console.log(data);
    localStorage.setItem("Current User", JSON.stringify(data));
    setMainState(data);
  }

  const onError = (errors, event) => {
    event.preventDefault();
    console.log(errors, event);
  };

  return (
    <div>
      {
        showForm ? (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {questionsResp?.map(({ quesGroup_ID, quesGroup_Desc, questions }) => (
              <Accordion
                key={"q" + quesGroup_ID}
                expanded={expanded === quesGroup_ID}
                onChange={handleChange(quesGroup_ID)}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary id={`${quesGroup_ID}-header`}>
                  <Typography >{quesGroup_Desc}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="baseline"
                    spacing={3}
                    marginTop="-10px"
                  >
                    <Grid item xs={3}>
                      <Typography> </Typography>
                    </Grid>
                    <Grid item style={gridItems2} xs={7}>
                      {criterias.map((criteria) => (
                        <Typography key={criteria} style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
                          {criteria}{" "}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs={2}>
                      <Typography> </Typography>
                    </Grid>
                  </Grid>
                  {questions.map(({ questionNum, quesContent }) => (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="baseline"
                      spacing={3}
                      marginTop="-10px"
                      key={"q-" + quesGroup_ID + "-" + questionNum}
                    >
                      <Grid item xs={3}>
                        <Typography>{quesContent}</Typography>
                      </Grid>
                      <Grid item style={gridItems} xs={7}>
                        <RadioButtons
                          itemId={"q-" + quesGroup_ID + "-" + questionNum}
                          groupId={quesGroup_ID}
                          questionId={questionNum}
                          onselectedValueChange={handleselectedValueChange}
                          numericAnswer={
                            items.length > 0
                              ? items?.find((item) => item.id === "q-" + quesGroup_ID + "-" + questionNum)
                                ?.numericAnswer
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="הוסף הערה"
                          key={"q-" + quesGroup_ID + "-" + questionNum}
                          value={items.length > 0 ? items?.find((item) => item.id === "q-" + quesGroup_ID + "-" + questionNum)?.verbalAnswer : ""}
                          onChange={(event) =>
                            handleTextFieldChange("q-" + quesGroup_ID + "-" + questionNum, event)
                          }
                          multiline
                          maxRows={3}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
            <Stack
              direction="row"
              spacing={8}
              alignItems="baseline"
              justifyContent="space-evenly"
              marginTop={"20px"}
            >
              <Button type={"submit"} label="סיים" variant="contained" color="white">
                סיום
              </Button>
            </Stack>
            <DialogSurvey
              open={showCloseDialog}
              setOpen={setShowCloseDialog}
              msg={statusMsg}
              finishRouteMsg={finishRouteMsg}
              onClick={() => {
                setShowCloseDialog((e) => !e);
              }}
            />
          </form>
        ) : null
      }
    </div>
  );
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const gridItems = {
  justifyContent: "space-evenly",
  alignItems: "center",
  display: "flex",
  padding: "initial",
  alignSelf: "center",
};
const gridItems2 = {
  justifyContent: "space-evenly",
  alignItems: "center",
  display: "flex",
  padding: "initial",
  alignSelf: "center",
  textAlign: "center",
};
