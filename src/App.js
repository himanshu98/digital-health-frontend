import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './shared/containers/HomePage';
import CareManagementDashboard from './modules/careManagement/containers/CareManagementDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path='/' component={HomePage}/>
          <Route exact path="/careManagement" component={CareManagementDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
