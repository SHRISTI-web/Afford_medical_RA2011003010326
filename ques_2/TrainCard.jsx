import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function TrainCard({ train }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{train.trainName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Train Number: {train.trainNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Departure Time: {train.departureTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {train.price.sleeper} (Sleeper), {train.price.AC} (AC)
        </Typography>
        {/* Add more train details */}
      </CardContent>
    </Card>
  );
}

export default TrainCard;
