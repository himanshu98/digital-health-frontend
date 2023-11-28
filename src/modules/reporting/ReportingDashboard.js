import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './Drawer/Drawer';
import Patient from './Patient/Patient';
import CaseManagersPerformance from './CaseManagersPerformance/CaseManagersPerformance';
import ServiceProvider from './ServiceProvider/ServiceProvider';
import Demographics from './Demographics/Demographics';
import CommunityEvents from './CommunityEvents/CommunityEvents';

const ReportingDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    console.log("abc");
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    console.log("def");
    setIsDrawerOpen(false);
  };
  const mainContentStyle = {
    transition: 'margin-left 0.3s',
    marginLeft: isDrawerOpen ? '378px' : '0',
  };

  return (
    <>
      <Sidebar onDrawerOpen={handleDrawerOpen} onDrawerClose={handleDrawerClose} />
      <div style={mainContentStyle}>
        <Switch>
          <Route path="/reporting/patient" component={Patient} />
          <Route path="/reporting/performance" component={CaseManagersPerformance} />
          <Route path="/reporting/serviceprovider" component={ServiceProvider} />
          <Route path="/reporting/demographics" component={Demographics} />
          <Route path="/reporting/communityevents" component={CommunityEvents} />
        </Switch>
      </div>
    </>
  )
}

export default ReportingDashboard