import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import RadioButtons from "./survey-component/RadioButtons";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import DialogSurvey from "./DialogSurvey";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questionsResp = [...Array(2).keys()].map((idx) => ({
  id: `id title-${idx}`,
  title: `title - ${idx}`, // Section name
  questions: [...Array(4).keys()].map((index) => ({
    id: `question-${index}`,
    label: `שאלה מאוד מאוד מאוד אבל מאוד מעניינת - ${index}`, // Question name
  })),
}));
console.log(questionsResp.length + " length");
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

export default function surveyForm() {
  const [expanded, setExpanded] = useState(questionsResp[0].id);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [statusMsg, setMsg] = useState("");
  const [finishRouteMsg, setRouteMsg] = useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function itemExists(itemId) {
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

  const handleselectedValueChange = (itemId, value) => {
    // Update radio button answer if the answer was marked allready in the same question  or add the answer to the questions array
    if (items.length > 0 && itemExists(itemId)) {
      console.log("items");
      updateItem(itemId, value);
    } else {
      console.log("here");
      const item = {
        id: itemId,
        name: itemId,
        selectedValue: value,
      };
      setItems((prevArray) => [...prevArray, item]);
    }
    // Save all the answers from the form - Need to check if the question answered
  };

  function handleTextFieldChange(id, event) {
    // Get text field value for answer
    const newItems = items.map((item) => {
      if (item.name === id) {
        return { ...item, textFieldValue: event.target.value };
      } else {
        return item;
      }
    });
    setItems(newItems);
  }

  const { handleSubmit } = useForm();
  const onSubmit = (data, event) => {
    event.preventDefault();

    if (items.length != questionsResp.length * 4) {
      // Checking weather the user answer all the questions
      setShowCloseDialog((e) => !e); // Error dialog message
      setMsg("לא ענית על כל השאלות");
      setRouteMsg("חזרה לשאלון");
    } else {
      setShowCloseDialog((e) => !e); // Error dialog message
      setMsg("ענית על כל השאלות, מנהל ייצור איתך קשר לפגישת הערכה");
      setRouteMsg("חזרה לדף הבית");
    }
  };
  const onError = (errors, event) => {
    event.preventDefault();
    console.log(errors, event);
  };

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
  console.log(items);
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {questionsResp.map(({ id, title, questions }) => (
        <Accordion
          key={"q" + id}
          expanded={expanded === id}
          onChange={handleChange(id)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary id={`${id}-header`}>
            <Typography>{title}</Typography>
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
                <Typography></Typography>
              </Grid>
              <Grid item style={gridItems2} xs={7}>
                <Typography style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
                  לא רלוונטי לתפקיד
                </Typography>
                <Typography style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
                  לא עומד בציפיות
                </Typography>
                <Typography style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
                  עומד בחלק מהציפיות
                </Typography>
                <Typography style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
                  עומד כמעט בכל הציפיות
                </Typography>
                <Typography style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
                  עומד בציפיות
                </Typography>
                <Typography style={{ maxWidth: "50px", fontSize: "14px", fontWeight: "600" }}>
                  עומד בציפיות טוב מאוד
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography></Typography>
              </Grid>
            </Grid>
            {questions.map(({ id: questionId, label }, idx) => (
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="baseline"
                spacing={3}
                marginTop="-10px"
                key={"q-" + id + "-" + questionId}
              >
                <Grid item xs={3}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item style={gridItems} xs={7}>
                  <RadioButtons
                    itemId={"q-" + id + "-" + questionId}
                    onselectedValueChange={handleselectedValueChange}
                    selectedValue={
                      items.length > 0
                        ? items?.find((item) => item.name === "q-" + id + "-" + questionId)
                            ?.selectedValue
                        : ""
                    }
                    // style={{}}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="הוסף הערה"
                    //   key={"q-" + id + "-" + questionId}
                    value={items.textFieldValue}
                    onChange={(event) => handleTextFieldChange("q-" + id + "-" + questionId, event)}
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
        <Button type={"button"} label="שמור" onClick={()=> navigate("layouts\evaluation\components\feedback")}>
          שמור
        </Button>
        <Button type={"submit"} label="סיים">
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
