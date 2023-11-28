import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './Drawer/Drawer';
import Patient from './Patient/Patient';
import CaseManagersPerformance from './CaseManagersPerformance/CaseManagersPerformance';
import ServiceProvider from './ServiceProvider/ServiceProvider';
import Demographics from './Demographics/Demographics';

const ReportingDashboard = () => {
  return (
    <>
    {/* <div>Reporting Dashboard</div> */}
    <Sidebar></Sidebar>
      <Switch>
        <Route path="/reporting/patient" component={Patient} />
        <Route path="/reporting/performance" component={CaseManagersPerformance} />
        <Route path="/reporting/serviceprovider" component={ServiceProvider} />
        <Route path="/reporting/demographics" component={Demographics} />
      </Switch>
    </>
  )
}

export default ReportingDashboard