
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalGoals from "components/ProfileTables/PersonalGoals";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MeetingCalendar from "layouts/meetings/Calendar";
import MyEvalues from "./MyEvalues";
const myGoalsData = [
  {id:1, name:"קורס אקסל", date:"22-2-2022", isDone:"בוצע"},
  {id:2, name:"קורס נגרות", date:"22-2-2023", isDone:"בוצע"},
  {id:3, name:"קורס נגרות", date:"22-2-2023", isDone:"לא בוצע"}
]
function ProfileGrid({ title, description, action }) {
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
        backgroundColor: "transparent",
        // boxShadow: "none",
        overflow: "visible",
        textAlign: "center",
        height: 200,
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5} marginTop="50px">
        <MDBox mb={1}>
          {action.type === "evalues" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h2"
              textTransform="capitalize"
            >

              {title}
            </MDTypography>
          ) : action.type === "goals" ? (
            <>
              <MDTypography onClick={handleTypographyClick} variant="h2" textTransform="capitalize">
                {title}
              </MDTypography>
              <Dialog open={isPopupOpen} onClose={handleCloseDialog}>
                <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
                <DialogContent><PersonalGoals myGoalsData={myGoalsData}/> </DialogContent>
              </Dialog>
            </>
          ) : (
            <><MDTypography onClick={handleTypographyClick} variant="h2" textTransform="capitalize">
                  {title}
                </MDTypography><Dialog open={isPopupOpen} onClose={handleCloseDialog}>
                    <Button onClick={handleCloseDialog}>חזרה לדף הבית</Button>
                    <DialogContent><MeetingCalendar /> </DialogContent>
                  </Dialog></>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        {/* <MDBox display="flex" justifyContent="space-between" alignItems="center" margin="40px">
          {action.type === "evalues" ? (
            <MDButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
        </MDBox> */}
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultProjectCard
ProfileGrid.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["goals", "evalues"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileGrid;
