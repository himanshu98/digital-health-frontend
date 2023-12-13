import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../src/containers/HomePage";
import CareManagementDashboard from "./modules/careManagement/CareManagementDashboard";
import ReportingDashboard from "./modules/reporting/ReportingDashboard";
import serviceProgressNotes from './modules/serviceProgressNotes/serviceProgressNotes';
import CaseManagerSelectionPage from "./modules/careManagement/CaseManagerSelectionPage";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.compactAlgorithm],
      }}
    >
      <div className="App">
        <Router>
          <Switch>
            <Route path="/casemanager" component={CaseManagerSelectionPage} />
            <Route exact path="/careManagement" component={CareManagementDashboard} />
            <Route path="/reporting" render={(props) => <ReportingDashboard {...props} />} />
            <Route exact path="/services" component={serviceProgressNotes} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
