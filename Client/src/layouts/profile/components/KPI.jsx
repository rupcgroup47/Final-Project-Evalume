import React from 'react';
import { Typography, Grid, Rating ,Card} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const KPIRating = () => {
  const ratings = [//We need to validate who is the user
    {
      userNum: 14,
      evalu_part_type: 0,
      rounded_avg: 4,
    },
    {
      userNum: 14,
      evalu_part_type: 1,
      rounded_avg: 3,
    },
  ];

  const selfRating = ratings.find((rating) => rating.evalu_part_type === 0)?.rounded_avg || 0;
  const managerRating = ratings.find((rating) => rating.evalu_part_type === 1)?.rounded_avg || 0;

  return (
    <Card sx={{ backgroundColor: "#effafb82", Width: "100%" }}>

    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">דירוג שלי </Typography>
        <Rating
          name="self-rating"
          value={selfRating}
          readOnly
          icon={<StarIcon />}
          max={5}
          precision={1}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">דירוג מנהל</Typography>
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