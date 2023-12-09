import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { Tabs } from 'antd';

const ServiceProviderDetails = ({setShowDetails, record}) => {
  // Drawer
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    setShowDetails(false);
  };
  useEffect(() => {
    if (setShowDetails && record) {
      setOpen(true);
    }
  }, [setShowDetails, record]);

  // Tabs
  const items = [
    {
      key: '1',
      label: 'Reviews',
      children: <ReviewsTabContent record={record}/>
    },
    {
      key: '2',
      label: 'History',
      children: <HistoryTabContent record={record}/>
    }
  ];
  return (
    <>
      <Drawer
        title={`Service Provider Details`}
        placement="right"
        onClose={onClose}
        open={open}
        size={'large'}
        closable={false}
      >
        <Tabs defaultActiveKey="1" items={items}/>
        {/* <p>{record.service_provider_name}</p> */}
      </Drawer>
    </>
  );
};

const ReviewsTabContent = ({record}) => {
  // Content for Reviews Tab
  return (
    <div>
      <h2>Reviews Tab Content</h2>
      {record?.service_provider_name}
    </div>
  );
};

const HistoryTabContent = ({record}) => {
  // Content for History Tab
  return (
    <div>
      
      <h2>History Tab Content</h2>
      {record?.service_provider_name}
    </div>
  );
};

export default ServiceProviderDetails;