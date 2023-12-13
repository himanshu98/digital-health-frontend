import React, { useState, useEffect } from "react";
import { Drawer, Rate, Row, Col, Typography } from "antd";
import { Tabs, Table } from "antd";
import moment from "moment";

const { Title } = Typography;

const ServiceProviderDetails = ({ setShowDetails, record }) => {
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
      key: "1",
      label: "History",
      children: <HistoryTabContent record={record} />,
    },
    {
      key: "2",
      label: "Ratings",
      children: <RatingsTabContent record={record} />,
    },
  ];
  return (
    <>
      <Drawer
        title={`Service Provider Details`}
        placement="right"
        onClose={onClose}
        open={open}
        size={"large"}
        closable={false}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Drawer>
    </>
  );
};

const HistoryTabContent = ({ record }) => {
  const columns = [
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (startTime) => moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
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
const RatingsTabContent = ({ record }) => {
  // Content for History Tab
  return (
    <>
      <Row gutter={[0, 24]}>
        <Col span={6} style={{ display: "flex", alignItems: "center" }}>
          <Title level={2}>Rating</Title>
        </Col>
        <Col span={18}>
          <Rate
            disabled
            defaultValue={Math.floor(record.rating)}
            style={{ marginTop: "30px" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default ServiceProviderDetails;
