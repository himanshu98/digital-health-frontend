import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from '../src/containers/HomePage';
import CareManagementDashboard from './modules/careManagement/CareManagementDashboard';
import ReportingDashboard from './modules/reporting/ReportingDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/careManagement" component={CareManagementDashboard} />
        <Route
            path="/reporting"
            render={(props) => <ReportingDashboard {...props} />}
        />
        <Route path='/' component={HomePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
