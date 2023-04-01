import React from "react";
import { useState, useContext } from "react";
// Material Dashboard 2 React examples
import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import FormBuilder from "./components/FormBuilder";
import { Fade, IconButton, InputBase, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import HeaderFrom from "./components/header";
import CreateQuestionsDialog from "dialog/CreateQuestionsDialog";

export default function Evalues() {
  const [, dispatch] = useMaterialUIController();
  const [showFormComponent, setShowFormComponent] = useState(false);
  const [myCheckedArray, setMyArray] = useState([]);
  const [myFormTypes, setMyObject] = useState({});
  const myNewForm = { myCheckedArray, myFormTypes }; // The final form the user created - Object with roleType, groupType and the checked answers
  const [showCreateQuestionDialog, setShowCreateQuestionDialog] = useState(false);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  function updateArray(myCheckedArray) {
    // receive the checked answers
    setMyArray(myCheckedArray);
    console.log(myNewForm);
  }

  function updateObject(myFormTypes) {
    // receive the form user type
    setMyObject(myFormTypes);
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <h1 style={{ padding: "10px 20px", textAlign: "center", color: "black" }}>
        בניית טופס הערכה{" "}
      </h1>
      <Box style={{ display: "flex" }}>
        <Tooltip title="הוספה">
          <IconButton color="black" onClick={() => setShowCreateQuestionDialog((e) => !e)}>
            <AddIcon />
            הוספת שאלה
          </IconButton>
        </Tooltip>
      </Box>
      <CreateQuestionsDialog
        open={showCreateQuestionDialog}
        setOpen={setShowCreateQuestionDialog}
        // setQuestions={setQuestions}
        // setItems={setItems}
      />
      <HeaderFrom updateObject={updateObject} setShowFormComponent={setShowFormComponent} />
      {showFormComponent && <FormBuilder updateArray={updateArray} />}
    </Container>
  );
}
