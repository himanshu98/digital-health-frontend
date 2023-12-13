import React, { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Drawer.css";

const Sidebar = ({onDrawerClose, onDrawerOpen}) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
    onDrawerOpen(); 
  };
  const onClose = () => {
    setOpen(false);
    onDrawerClose();
  };
  return (
    <>
      <MenuOutlined style={{ margin: "20px" }} onClick={showDrawer} />
      <Drawer
        title="Reports"
        placement="left"
        onClose={onClose}
        open={open}
        closable={false}
      >
        <ul className="menu">
          <li>
            <a href="/reporting/patient">Patient Disability Reports</a>
          </li>
          <li>
            <a href="/reporting/demographics">Patients Demographics Report</a>
          </li>
          <li>
            <a href="/reporting/serviceprovider">Service Provider Report</a>
          </li>
          <li>
            <a href="/reporting/performance">Case Manager Performance Report</a>
          </li>
          <li>
            <a href="/reporting/utilization">Case Manager Utilization</a>
          </li>
          <li>
            <a href="/reporting/communityevents">Community Events</a>
          </li>
          <li>
            <a href="/reporting/communityeventreports">Community Event Reports</a>
          </li>
          <li>
            <a href="/reporting/fsap">Funded Services And Achievements Reports</a>
          </li>
        </ul>
      </Drawer>
    </>
  );
};
export default Sidebar;
