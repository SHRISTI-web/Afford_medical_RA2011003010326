import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TrainDetailsPage() {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch single train data using axios and API
    axios.get(`http://20.244.56.144/train/trains/${trainNumber}`, {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      },
    })
    .then(response => {
      setTrain(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      {/* Display train details */}
      <pre>{JSON.stringify(train, null, 2)}</pre>
    </div>
  );
}

export default TrainDetailsPage;
