import { Button, Dialog, Typography } from "@mui/material";
import {
  Grid,
  Box,
  Card
} from "@mui/material";
import { useEffect, useState, useContext } from "react";

export default function AllExistForms({ //shows all the forms group by role type & group type 
  open,
  setOpen,
  questionnairesData

}) {
const [selectedTestObject, setSelectedTestObject] = useState(null);
const [openDialog, setOpenDialog] = useState(false);
const [selectedForm, setSelectedForm] = useState(null);

const handleFormClick = (form) => {
  setSelectedForm(form);
  setOpenDialog(true);
  {console.log(form)}
};

const handleCloseDialog = () => {
  setOpenDialog(false);
};
 console.log(questionnairesData);


  return (
    <Dialog fullWidth maxWidth="lg" onClose={() => setOpen((e) => !e)} open={open}>
      <Typography sx={{ fontFamily: "Rubik", fontSize: "50px", textAlign: "center" }}>
        תצוגת שאלונים{" "}
      </Typography>
      <Box
        display="inline"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        marginBottom={10}
        marginLeft="20%"
        textAlign="center"
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

                <a key={form.id} value={form.id}   onClick={() => handleFormClick(form)}
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
        <Dialog open={openDialog} onClose={handleCloseDialog} style={{padding:"20px"}}>
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
