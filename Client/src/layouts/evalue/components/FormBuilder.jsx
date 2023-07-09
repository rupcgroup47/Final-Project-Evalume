import React, { useEffect, useState, useContext } from "react";
import { Container, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import { useMaterialUIController, setDirection } from "context";
import { QuestionsContext } from "context/globalVariables";

export default function FormBuilder({ setMyArray }) {
  const { globalQuestionArray } = useContext(QuestionsContext);
  const [expanded, setExpanded] = useState(globalQuestionArray[0].quesGroup_ID);
  const [, dispatch] = useMaterialUIController();
  const [checkedItems, setCheckedItems] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  useEffect(() => {
    const defaultCheckedItems = [];
    globalQuestionArray.forEach((group) => {
      group.questions.forEach((question) => {
        const newCheck = {
          quesGroup_ID: group.quesGroup_ID,
          questionNum: question.questionNum,
        };
        defaultCheckedItems.push(newCheck);
      });
    });
    setCheckedItems(defaultCheckedItems);
  }, []);

  const handleChangeCheck = (event, id, questionId) => {
    const isChecked = event.target.checked;
    const question = event.target.name;
    const newCheck = {
      quesGroup_ID: id,
      questionNum: questionId,
    };
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, newCheck]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter(
          (field) => field.quesGroup_ID !== id || field.questionNum !== questionId
        )
      );
    }
  };

  const handleCheckedForm = () => {
    const groupedData = Array.from(new Set(checkedItems.map((item) => item.quesGroup_ID))).map(
      (quesGroup_ID) => ({
        quesGroup_ID,
        questionNum: checkedItems
          .filter((item) => item.quesGroup_ID === quesGroup_ID)
          .map((item) => item.questionNum),
      })
    );

    console.log(groupedData);
    setMyArray(groupedData);
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
                <Grid item xs={10}>
                  <Typography>{quesContent}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Checkbox
                    name={"q-" + quesGroup_ID + "-" + questionNum}
                    checked={checkedItems.some(
                      (item) =>
                        item.quesGroup_ID === quesGroup_ID && item.questionNum === questionNum
                    )}
                    onChange={(event) => handleChangeCheck(event, quesGroup_ID, questionNum)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        type={"submit"}
        label="סיים"
        onClick={handleCheckedForm}
        style={{fontSize:"large", position:"absolute", left:"50px"}}>
        סיום
      </Button>
    </Container>
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
