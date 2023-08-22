import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TrainListPage from './TrainListPage';
import TrainDetailsPage from './TrainDetailsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TrainListPage} />
        <Route path="/train/:trainNumber" component={TrainDetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;
