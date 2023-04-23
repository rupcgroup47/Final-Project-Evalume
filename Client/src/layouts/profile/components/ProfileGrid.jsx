import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalGoals from "./ProfileTables/PersonalGoals";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MeetingCalendar from "layouts/meetings/Calendar";
import MyEvalues from "./MyEvalues";

// const myGoalsData = [
//   { id: 1, name: "קורס אקסל", date: "22-2-2022", isDone: "בוצע" },
//   { id: 2, name: "קורס נגרות", date: "22-2-2023", isDone: "בוצע" },
//   { id: 3, name: "קורס נגרות", date: "22-2-2023", isDone: "לא בוצע" },
// ];

function ProfileGrid({ title, description, type, evalus, goals }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
 

  const handleTypographyClick = () => {
    setIsPopupOpen(true);
  };
  const handleCloseDialog = () => {
    setIsPopupOpen(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#effafb82",
        overflow: "visible",
        textAlign: "center",
      }}
    >
      <MDBox >
        <MDBox>
          {type === "evalues" ? (
            <>
              <MDTypography onClick={handleTypographyClick} variant="h2" textTransform="capitalize" style={{ cursor: "pointer" }}>
                {title}
              </MDTypography>
              <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
                <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
                <DialogContent>
                  <MyEvalues evalus={evalus}/>{" "}
                </DialogContent>
              </Dialog>
            </>
          ) : type === "goals" ? (
            <>
              <MDTypography onClick={handleTypographyClick} variant="h2" textTransform="capitalize" style={{ cursor: "pointer" }}>
                {title}
              </MDTypography>
              <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
                <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
                <DialogContent>
                  <PersonalGoals goals={goals} />{" "}
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <MDTypography onClick={handleTypographyClick} variant="h2" textTransform="capitalize" style={{ cursor: "pointer" }}>
                {title}
              </MDTypography>
              <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
                <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
                <DialogContent>
                  <MeetingCalendar />{" "}
                </DialogContent>
              </Dialog>
            </>
          )}
        </MDBox>
        <MDBox m={2} lineHeight={0}>
          <MDTypography variant="h6" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ProfileGrid;
