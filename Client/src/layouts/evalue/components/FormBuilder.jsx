import React from "react";

// Material Dashboard 2 React examples
import { Container, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import FinishDialog from "./FinishDialog";
import { QuestionsContext } from "context/globalVariables";

// const questionsResp = [...Array(2).keys()].map((idx) => ({
//   quesGroup_ID: `id title-${idx}`,
//   quesGroup_Desc: `title - ${idx}`,
//   groupType: 0,
//   questions: [...Array(2).keys()].map((index) => ({
//     questionNum: `question-${index}`,
//     quesContent: `שאלה מאוד מאוד מאוד אבל מאוד מעניינת - ${index}`,
//     is_Active: 1,
//   })),
// }));

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

export default function FormBuilder({ setMyArray }) {
  const { globalQuestionArray } = useContext(QuestionsContext);
  const [expanded, setExpanded] = useState(globalQuestionArray[0].quesGroup_ID);
  const [, dispatch] = useMaterialUIController();
  const [checkedItems, setCheckedItems] = useState([]);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [statusMsg, setMsg] = useState("");
  const [finishRouteMsg, setRouteMsg] = useState("");
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const handleChangeCheck = (event, id, questionId) => {//Perception and insertion or removal from the array of the questions marked in the check box
    const isChecked = event.target.checked;
    const question = event.target.name;
    const newCheck = {
      quesGroup_ID: id,
      questionNum: questionId,
    };
    if (isChecked) {
      setCheckedBoxes([...checkedBoxes, question]);
      const newCheckedItems = checkedItems.includes(newCheck)
        ? checkedItems
        : [...checkedItems, newCheck];
      setCheckedItems(newCheckedItems);
      console.log(checkedItems);
    } else {
      setCheckedBoxes(checkedBoxes.filter((q) => q !== question));
      setCheckedItems(
        checkedItems.filter((field) => JSON.stringify(field) !== JSON.stringify(newCheck))// remove object from questions form if object removed from check box
      );
    }

  };

  const handleCheckedForm = () => {
    const groupedData = Array.from(new Set(checkedItems.map((item) => item.quesGroup_ID))).map(
      (quesGroup_ID) => ({
        quesGroup_ID,
        questionNum: checkedItems.filter((item) => item.quesGroup_ID === quesGroup_ID).map((item) => item.questionNum),
      })
    ); // group by titles and questions
    console.log(groupedData);
    setMyArray(groupedData);
    setShowCloseDialog((e) => !e); // Error dialog message
    setMsg("סיימת למלא את טופס ההערכה");
    setRouteMsg("חזרה לדף הבית");
  };
  
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      {globalQuestionArray?.map(({ quesGroup_ID, quesGroup_Desc, questions }) => (
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
            {questions.map(({ questionNum, quesContent }) => (//show the questions inside the title
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="baseline"
                spacing={3}
                marginTop="-10px"
                key={"q-" + quesGroup_ID + "-" + questionNum}
              >
                <Grid item xs={10}>
                  <Typography>{quesContent}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Checkbox
                    name={"q-" + quesGroup_ID + "-" + questionNum}
                    checked={checkedBoxes.includes("q-" + quesGroup_ID + "-" + questionNum)}//check if allready checked
                    onChange={(event) => handleChangeCheck(event, quesGroup_ID, questionNum)}//create new object of the qustion and title the user just checked
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button type={"submit"} label="סיים" onClick={handleCheckedForm} style={{fontSize:"large", position:"absolute", left:"50px"}}>
        סיום
      </Button>
      <FinishDialog
        open={showCloseDialog}
        setOpen={setShowCloseDialog}
        msg={statusMsg}
        finishRouteMsg={finishRouteMsg}
        onClick={() => {
          setShowCloseDialog((e) => !e);
        }}
      />
    </Container>
  );
}
