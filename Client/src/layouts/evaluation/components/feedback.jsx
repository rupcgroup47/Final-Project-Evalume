import React, { useState, useEffect, useContext } from "react";
import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material";
export default function Feedback() {
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5, background: "white", borderRadius: "15px" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="baseline"
        spacing={3}
        marginTop="-10px"
      >
        <Grid item xs={12}>
          <Typography>חוות דעת מנהל</Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="הוסף מלל"
            // value={items.textFieldValue}
            multiline
            maxRows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>חוות דעת עובד</Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="הוסף מלל"
            // value={items.textFieldValue}
            multiline
            maxRows={3}
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <Typography>הצבת יעדים</Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="הוסף מלל"
            // value={items.textFieldValue}
            multiline
            maxRows={3}
          />
        </Grid>
      </Grid>
      <button>סיום הערכה שנתית</button>
    </Container>
  );
}
