import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../src/containers/HomePage";
import CareManagementDashboard from "./modules/careManagement/CareManagementDashboard";
import ReportingDashboard from "./modules/reporting/ReportingDashboard";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#1890ff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            hoverColor: '#40a9ff',
          },
          Input: {
            colorPrimary: '#52c41a',
            borderColor: '#1890ff',
            borderRadius: '8px',
            placeholderColor: '#8c8c8c',
            backgroundColor: '#001529',
          },
          Checkbox: {
            colorPrimary: '#faad14',
            checkedColor: '#faad14',
          },
        },
                        
        algorithm: [theme.compactAlgorithm],
      }}
    >
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/careManagement"
              component={CareManagementDashboard}
            />
            <Route
              path="/reporting"
              render={(props) => <ReportingDashboard {...props} />}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
