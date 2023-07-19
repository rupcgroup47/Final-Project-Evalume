/* eslint-disable */

import React from "react";
import { Typography, Grid, Rating, Card } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const KPIRating = ({ selfKPI }) => {

  const selfRating = selfKPI?.find((rating) => rating.evalu_part_type === 0)?.rounded_avg || 0;
  const managerRating = selfKPI?.find((rating) => rating.evalu_part_type === 1)?.rounded_avg || 0;

  return (
    <Card sx={{ backgroundColor: "#effafb82", Width: "100%", flexDirection: "inherit", padding: "15px" }}>
      <Grid container spacing={2} alignItems="center" display={"contents"}>
        <Grid item xs={12} style={{ textAlign: "center", paddingRight: "0px" }}>
          <Typography variant="h4">דירוג שלי</Typography>
          <Rating
            name="self-rating"
            value={selfRating}
            readOnly
            icon={<StarIcon />}
            max={5}
            precision={1}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", paddingRight: "0px" }}>
          <Typography variant="h4">דירוג מנהל</Typography>
          <Rating
            name="manager-rating"
            value={managerRating}
            readOnly
            icon={<StarIcon />}
            max={5}
            precision={1}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default KPIRating;