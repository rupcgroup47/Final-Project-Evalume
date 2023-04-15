import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import DialogSurvey from "./DialogSurvey";
import RadioButtons from "./survey-component/RadioButtons";

const questionsResp = [
  {
    quesGroup_ID: 1,
    quesGroup_Desc: "שירותיות", // Section name
    questions: [
      {
        questionNum: 1,
        quesContent: `אאא`, // Question name
      },
      {
        questionNum: 2,
        quesContent: `בבב`, // Question name
      },
    ],
  },
  {
    quesGroup_ID: 2,
    quesGroup_Desc: "איכותיות", // Section name
    questions: [
      {
        questionNum: 1,
        quesContent: `גג`, // Question name
      },
      {
        questionNum: 2,
        quesContent: `בבב`, // Question name
      },
    ],
  },
];


export default function surveyForm({employeeId,employeesManager, step}) {
  const [expanded, setExpanded] = useState(questionsResp[0].id);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [statusMsg, setMsg] = useState("");
  const [finishRouteMsg, setRouteMsg] = useState("");
  const flatQuestions = questionsResp.flatMap((group) => group.questions);
  const totalQuestions = flatQuestions.length;//Checking how many questions there are in the array to make sure all the questions were answered at the end
  const surveyId=1;
  const [finalSelfEvaluation,setFinalSelfEvaluation] = useState()
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
        console.log("item.name");
        return {
          ...item,
          selectedValue: value,
        };
      }
      return item;
    });
    setItems(updatedItems);
  }

  const handleselectedValueChange = (itemId, groupId, questionId, value) => {
    // Update radio button answer if the answer was marked allready in the same question  or add the answer to the questions array
    if (items.length > 0 && itemExists(itemId)) {
      console.log("items");
      updateItem(itemId, value);//If the question has already been answered then update the answer to the latest answer
    } else {
      console.log("here");
      const item = {
        id: itemId,
        title: groupId,
        question: questionId,
        selectedValue: value,
      };
      setItems((prevArray) => [...prevArray, item]);//Inserting a new answer into the array
    }

  };

  function handleTextFieldChange(id, event) {
    // Get text field value for answer
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, textFieldValue: event.target.value };
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
      console.log(selfEvaluationObj)
      setShowCloseDialog((e) => !e); // Error dialog message
      setMsg("ענית על כל השאלות, מנהל ייצור איתך קשר לפגישת הערכה");
      setRouteMsg("חזרה לדף הבית");
    }
  };


  function sendDataToServer() {
    if(step === 0) {//If the input is self evaluation then the object that will be returned is that the employee filled in and evalue himself
      return { surveyId, employeeId, employeeId,step, items };
    } else if(step===1){
      return { surveyId, employeesManager, employeeId,step, items };// employees manager is the current user which evalue the employee id 

    }
  }

  const onError = (errors, event) => {
    event.preventDefault();
    console.log(errors, event);
  };
  console.log(items);
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {questionsResp.map(({ quesGroup_ID, quesGroup_Desc, questions }) => (
        <Accordion
          key={"q" + quesGroup_ID}
          expanded={expanded === quesGroup_ID}
          onChange={handleChange(quesGroup_ID)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary id={`${quesGroup_ID}-header`}>
            <Typography>{quesGroup_Desc}</Typography>
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
                  <Typography style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
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
                    selectedValue={
                      items.length > 0
                        ? items?.find((item) => item.id === "q-" + quesGroup_ID + "-" + questionNum)
                            ?.selectedValue
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="הוסף הערה"
                    //   key={"q-" + id + "-" + questionId}
                    value={items.textFieldValue}
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
