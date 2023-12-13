import React from "react";
import { Table, Typography, Row, Col, DatePicker, Space, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";


const { RangePicker } = DatePicker;


const { Title } = Typography;

const FundedServicesAndAchievements = () => {
  const columns = [
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Consumers Requesting Services",
      dataIndex: "requestingServices",
      key: "requestingServices",
    },
    {
      title: "Consumers Receiving Services",
      dataIndex: "receivingServices",
      key: "receivingServices",
    },
  ];

  const data = [
    {
      key: "1",
      services: "Advocacy/Legal Services",
      requestingServices: 1807,
      receivingServices: 1778,
    },
    {
      key: "2",
      services: "Assistive Technology",
      requestingServices: 222,
      receivingServices: 194,
    },
    {
      key: "3",
      services: "Children's Services",
      requestingServices: 17,
      receivingServices: 15,
    },
    {
      key: "4",
      services: "Communication Services",
      requestingServices: 90,
      receivingServices: 84,
    },
    {
      key: "5",
      services: "Counseling and related services",
      requestingServices: 38,
      receivingServices: 31,
    },
    {
      key: "6",
      services: "Family Services",
      requestingServices: 40,
      receivingServices: 39,
    },
    {
      key: "7",
      services: "Housing, Home Modification, and Shelter Services",
      requestingServices: 681,
      receivingServices: 627,
    },
    {
      key: "8",
      services: "IL Skills Training and Life Skills Training",
      requestingServices: 1682,
      receivingServices: 1662,
    },
    {
      key: "9",
      services: "Information and Referral Services",
      requestingServices: 5172,
      receivingServices: 5113,
    },
    {
      key: "10",
      services: "Mental Restoration Services",
      requestingServices: 16,
      receivingServices: 16,
    },
    {
      key: "11",
      services: "Mobility training",
      requestingServices: 32,
      receivingServices: 31,
    },
    {
      key: "12",
      services: "Peer Counseling Services",
      requestingServices: 995,
      receivingServices: 975,
    },
    {
      key: "13",
      services: "Personal Assistance Services",
      requestingServices: 126,
      receivingServices: 124,
    },
    {
      key: "14",
      services: "Physical Restoration Services",
      requestingServices: 12,
      receivingServices: 12,
    },
    {
      key: "15",
      services: "Preventive Services",
      requestingServices: 187,
      receivingServices: 182,
    },
    {
      key: "16",
      services: "Prostheses, Orthotics, and other appliances",
      requestingServices: 13,
      receivingServices: 13,
    },
    {
      key: "17",
      services: "Recreational Services",
      requestingServices: 63,
      receivingServices: 61,
    },
    {
      key: "18",
      services: "Rehabilitation Technology Services",
      requestingServices: 1,
      receivingServices: 1,
    },
    {
      key: "19",
      services: "Therapeutic Treatment",
      requestingServices: 4,
      receivingServices: 3,
    },
    {
      key: "20",
      services: "Transportation Services",
      requestingServices: 3474,
      receivingServices: 3467,
    },
    {
      key: "21",
      services: "Youth/Transition Services",
      requestingServices: 503,
      receivingServices: 503,
    },
    {
      key: "22",
      services: "Vocational Services",
      requestingServices: 390,
      receivingServices: 376,
    },
    {
      key: "23",
      services: "Other",
      requestingServices: 1126,
      receivingServices: 1107,
    },
    {
      key: "24",
      services: "TOTAL",
      requestingServices: 16691,
      receivingServices: 16414,
    },
  ];

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Title level={2}>Funded Individual Services and Achievements Report</Title>
        <div className="datepicker-container">
        <Row gutter={24}>
          <Col span={16}>
            <RangePicker/>
          </Col>
          <Col span={8}>
            <Space>
              <Button>Filter</Button>
              <Button danger>
                Reset
              </Button>
              <Button
                  style={{ marginLeft: "10px" }}
                  icon={<ExportOutlined />}
                >
                  Export
                </Button>
            </Space>
          </Col>
        </Row>
      </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default FundedServicesAndAchievements;
