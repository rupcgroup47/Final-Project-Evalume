import { React, useState, useEffect } from "react";
import { Card, Grid, CardContent, Paper } from "@mui/material";
import { useMaterialUIController, setDirection } from "context";
import { Link } from "react-router-dom";
export default function BuildEvaluation() {
  const [isOldForms, setIsOldForms] = useState(true);
  const [isNotOldForms, setIsNotOldForms] = useState(true);//change it
  const [, dispatch] = useMaterialUIController();
  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
  return (
    <Paper sx={{ padding: "5%", paddingTop: "50px" }}>
      <h1
        style={{ paddingBottom: "inherit", textAlign: "center", color: "black", fontFamily: "Rubik" }}
      >
        הקמת טופס הערכה{" "}
      </h1>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Link to="/evalue" state={isNotOldForms}>
            <Card sx={{ height: "500px", backgroundColor:"whitesmoke" }}>
              <CardContent sx={{textAlign: "center", fontSize:"90px", fontFamily: "Rubik"}}>יצירת טופס חדש ממאגר השאלות</CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/evalue" state={isOldForms}>
            <Card sx={{ height: "500px",backgroundColor:"whitesmoke"  }}>
              <CardContent sx={{textAlign: "center", fontSize:"90px", fontFamily: "Rubik"}}>יצירת טופס חדש מבוסס על שאלונים קיימים</CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}
