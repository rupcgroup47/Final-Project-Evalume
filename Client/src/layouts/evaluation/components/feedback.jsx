import React, { useState, useEffect, useContext } from "react";
import { Container } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Paper, Box, Button } from "@mui/material";

export default function Feedback() {
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <Paper
      sx={{ boxShadow: "none", minWidth: 300, maxWidth: 1200, margin: "auto", marginTop: "50px" }}
    >
      <Grid container direction="row" spacing={3} marginTop="-10px">
        <Grid item xs={12}>
          <Typography textAlign="center">חוות דעת מנהל</Typography>
          <Box textAlign="center">
            <TextField
              label="הוסף מלל"
              InputProps={{
                style: { fontSize: 20, height: "150px", width: "550px" },
              }}
              multiline
              maxRows={3}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign="center">חוות דעת עובד</Typography>
          <Box textAlign="center">
            <TextField
              label="הוסף מלל"
              InputProps={{
                style: { fontSize: 20, height: "150px", width: "550px" },
              }}
              multiline
              maxRows={3}
            />
          </Box>
        </Grid>{" "}
        <Grid item xs={12}>
          <Typography textAlign="center">הצבת יעדים</Typography>
          <Box textAlign="center">
            <TextField
              label="הוסף מלל"
              InputProps={{
                style: { fontSize: 20, height: "150px", width: "550px" },
              }}
              multiline
              maxRows={3}
            />
          </Box>
        </Grid>
      </Grid>
      <br/>
      <Box textAlign="center">
        <Button variant="contained" color="white">סיום הערכה שנתית</Button>
      </Box>
      <br/>
    </Paper>
  );
}
