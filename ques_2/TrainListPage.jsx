import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from './TrainCard';
import { Container, Grid } from '@mui/material';

function TrainListPage() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch train data using axios and API
    axios
      .get('http://20.244.56.144/train/trains', {
        headers: {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
      })
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <h1>All Trains</h1>
      <Grid container spacing={2}>
        {trains.map((train) => (
          <Grid key={train.trainNumber} item xs={12} sm={6} md={4}>
            <TrainCard train={train} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TrainListPage;
