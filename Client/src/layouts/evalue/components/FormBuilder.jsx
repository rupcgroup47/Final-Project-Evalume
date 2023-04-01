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

const questionsResp = [...Array(2).keys()].map((idx) => ({
  id: `id title-${idx}`,
  title: `title - ${idx}`,
  questions: [...Array(2).keys()].map((index) => ({
    id: `question-${index}`,
    label: `שאלה מאוד מאוד מאוד אבל מאוד מעניינת - ${index}`,
  })),
}));

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

export default function FormBuilder({ updateArray }) {
  const [expanded, setExpanded] = useState(questionsResp[0].id);
  const [, dispatch] = useMaterialUIController();
  const [checkedItems, setCheckedItems] = useState([]);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [statusMsg, setMsg] = useState("");
  const [finishRouteMsg, setRouteMsg] = useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const handleChangeCheck = (event) => {
    const question = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, question]);
    } else {
      setCheckedItems(checkedItems.filter((q) => q !== question));
    }
  };

  const handleCheckedForm = () => {
    console.log(checkedItems);
    updateArray(checkedItems);
    setShowCloseDialog((e) => !e); // Error dialog message
      setMsg("סיימת למלא את טופס ההערכה");
      setRouteMsg("חזרה לדף הבית");
  };
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
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
                <Grid item xs={10}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Checkbox
                    name={"q-" + id + "-" + questionId}
                    checked={checkedItems.includes("q-" + id + "-" + questionId)}
                    onChange={handleChangeCheck}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button type={"submit"} label="סיים" onClick={handleCheckedForm}>
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
