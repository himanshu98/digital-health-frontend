import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { Tabs, Table } from 'antd';
import moment from 'moment';

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
      </Drawer>
    </>
  );
};

const HistoryTabContent = ({record}) => {
  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime) => moment(startTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (startTime) => moment(startTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];

  const data = record.recentVisits.map((visit, index) => ({
    ...visit,
    index: index + 1,
  }));

  // Content for History Tab
  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
    />
  );
};

export default ServiceProviderDetails;