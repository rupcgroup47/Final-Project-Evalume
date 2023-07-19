/* eslint-disable */

import {
  Grid,
  Box,
  Card,
  Button,
  Dialog,
  Typography,
  Container
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useState, useContext } from "react";
import { EvalueContext } from "context/evalueVariables";

export default function AllExistForms({ //  shows all the forms group by role type & group type
  open,
  setOpen,
  questionnairesData

}) {
  const [selectedTestObject, setSelectedTestObject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [globalQuestionArray, setGlobalQuestionsArray] = useState([]);
  const { API } = useContext(EvalueContext);
  const [expanded, setExpanded] = useState(1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleFormClick = (form) => {
    setSelectedForm(form);

    console.log(form);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Bring all questions of a specific questionnaire using GET api
  useEffect(() => {
    const abortController = new AbortController();
    if (selectedForm !== null) {
      console.log("selectedForm");
      console.log(selectedForm);
      fetch(
        API.apiQuestionnaireQuestiones + selectedForm.id,
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
            if (result.questionnaireNum === selectedForm.id) // make sure the correct questionnaire arrived
            {
              console.log(result.questionsList);
              setGlobalQuestionsArray(result.questionsList);
              // setSelectedForm(null);
              setOpenDialog(true);
            }
            else console.log("something went wrong");
          },
          (error) => {
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
  }, [selectedForm]);


  return (
    <Dialog fullWidth maxWidth="lg" onClose={() => setOpen((e) => !e)} open={open}>
      <Typography sx={{ fontFamily: "Rubik", fontSize: "40px", textAlign: "center", fontWeight: "bold" }}>
        תצוגת שאלונים{" "}
      </Typography>
      <Box
        display="inline"
        margin="15px auto"
        width="60%"
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "whitesmoke",
            overflow: "visible",
            textAlign: "center",
            padding: "30px"
          }}
        >
          {questionnairesData?.map((testObject, index) => (
            <div key={index}>
              <h4
                onClick={() =>
                  setSelectedTestObject(
                    selectedTestObject === testObject ? null : testObject
                  )
                }
                style={{ cursor: "pointer" }}

              >{` > ${testObject.roleGrouptype} - ${testObject.roletype}`}</h4>
              {selectedTestObject === testObject && (
                <div>
                  {testObject.forms.map((form) => (
                    <div key={form.id}>
                      <a key={form.id} value={form.id} role="button" onClick={() => handleFormClick(form)}
                        style={{ cursor: "pointer" }}>
                        שאלון {form.year}-{form.id}
                      </a>
                    </div>

                  ))}
                </div>
              )}
            </div>
          ))}


          {selectedForm && (
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
              <Box style={{minWidth:"50%"}}>
                <h2 style={{ textAlign: "center" }}>שאלון {selectedForm.year}</h2>
                <Container maxWidth="xl" sx={{ pt: 2, pb: 5, minWidth: "50%" }}>
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
                        {questions.map(({ questionNum, quesContent }) => (//  show the questions inside the title
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
                          </Grid>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Container>
              </Box>
            </Dialog>
          )}
        </Card>
      </Box>
      <Box textAlign="center" marginBottom={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="white" size="large" onClick={() => setOpen(false)}>
              יציאה{" "}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
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