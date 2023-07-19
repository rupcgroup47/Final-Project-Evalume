/* eslint-disable */

import { Container, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import { useMaterialUIController, setDirection } from "context";
import { EvalueContext } from "context/evalueVariables";
import ApiFetcher from "components/ApiFetcher";


export default function UserInfo() {
  const { API } = useContext(EvalueContext);
  const [expanded, setExpanded] = useState(1);
  const [, dispatch] = useMaterialUIController();
  const [FAQ, setFAQ] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  //  API calls
  useEffect(() => {
    let isMounted = true;

    // Get all details needed for the user guide
    const getUserGuidedetails = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiUserGuideDetails, "GET", null);
        if (isMounted) {
          console.log("success");
          setFAQ(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }
    getUserGuidedetails();


    return () => {
      isMounted = false;
    }
  }, []);



  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <h1
        style={{ padding: "10px 20px", textAlign: "center", color: "black", fontFamily: "Rubik" }}
      >
        מאגר שאלות ותשובות{" "}
      </h1>

      {FAQ?.map(({ id, question }) => (
        <Accordion
          key={"q" + id}
          expanded={expanded === id}
          onChange={handleChange(id)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary id={`${id}-header`}>
            <Typography>{question}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {FAQ
              .filter(item => item.id === expanded) // Filter FAQ based on expanded question ID
              .map(({ id1, answer }) => (
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="baseline"
                  spacing={3}
                  marginTop="-10px"
                  key={"q-" + id1}
                >
                  <Grid item xs={10}>
                    <Typography>{answer}</Typography>
                  </Grid>
                </Grid>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
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
