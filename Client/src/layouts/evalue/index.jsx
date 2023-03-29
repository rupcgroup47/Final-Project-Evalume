import React from "react";

// Material Dashboard 2 React examples
import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";

// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import HeaderFrom from "./components/header";

const questionsResp = [...Array(6).keys()].map((idx) => ({
  id: `id title-${idx}`,
  title: `title - ${idx}`,
  questions: [...Array(4).keys()].map((index) => ({
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

export default function Evalues() {
  const [expanded, setExpanded] = React.useState(questionsResp[0].id);
  const [, dispatch] = useMaterialUIController();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <HeaderFrom />
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
                  <Grid item xs={2} >
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeCheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                  {/* <Grid item xs={2}>

                  </Grid> */}
                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        <Button type={"submit"} label="סיים">
          סיום
        </Button>
      </Container>
    </Container>
  );
}