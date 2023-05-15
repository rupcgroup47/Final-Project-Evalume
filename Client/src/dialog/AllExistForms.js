import {
  Grid,
  Box,
  Card,
  Button, 
  Dialog, 
  Typography
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { EvalueContext } from "context/evalueVariables";

export default function AllExistForms({ //shows all the forms group by role type & group type 
  open,
  setOpen,
  questionnairesData

}) {
  const [selectedTestObject, setSelectedTestObject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [globalQuestionArray, setGlobalQuestionsArray] = useState([]);
  const { API } = useContext(EvalueContext);

  const handleFormClick = (form) => {
    setSelectedForm(form);

    { console.log(form) }
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

  // console.log(questionnairesData);


  return (
    <Dialog fullWidth maxWidth="lg" onClose={() => setOpen((e) => !e)} open={open}>
      <Typography sx={{ fontFamily: "Rubik", fontSize: "40px", textAlign: "center" , fontWeight: "bold"}}>
        תצוגת שאלונים{" "}
      </Typography>
      <Box
        display="inline"
        // justifyContent="center"
        // alignItems="center"
        margin="15px auto"
        // textAlign="center"
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
                      <a key={form.id} value={form.id} onClick={() => handleFormClick(form)}
                        style={{ cursor: "pointer" }}>
                        שאלון {form.year}
                      </a>
                    </div>

                  ))}
                </div>
              )}
            </div>
          ))}


          {selectedForm && (
            <Dialog open={openDialog} onClose={handleCloseDialog} style={{ padding: "20px" }}>
              <h2>שאלון {selectedForm.year}</h2>
              <p>להציג שאלות</p>
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
