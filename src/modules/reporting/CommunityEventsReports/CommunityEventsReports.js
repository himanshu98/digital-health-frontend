import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Spin,
  Row,
  Col,
  Button,
  Space,
  DatePicker,
} from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const CommunityEventsReports = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const columns = [
    {
      title: "Issue Area",
      dataIndex: "issueAreaName",
      key: "issueAreaName",
    },
    {
      title: "Activity Types",
      dataIndex: "activityTypes",
      key: "activityTypes",
      render: (activityTypes) => activityTypes.join(", "),
    },
    {
      title: "Primary Entities",
      dataIndex: "primaryEntities",
      key: "primaryEntities",
      render: (primaryEntities) => primaryEntities.join(", "),
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
    },
  ];

  const filterEvents = async () => {
    try {
      console.log("Selected Dates:", selectedDates);
      let startDate = moment(selectedDates[0]?.$d).format("YYYY-MM-DD HH:mm:ss");
      let endDate = moment(selectedDates[1]?.$d).format("YYYY-MM-DD HH:mm:ss");      
      console.log(startDate, endDate);
      const response = await axios.get(
        `https://communityactivity-2e7ac5425e81.herokuapp.com/communityactivityeventreport?startDt=${(
          startDate
        )}&endDt=${(endDate)}`
      );
      setData(response.data.communityActivityReportData);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://communityactivity-2e7ac5425e81.herokuapp.com/communityactivityeventreport"
        );
        setData(
          response.data.communityActivityReportData.map((item, index) => ({
            ...item,
            key: index,
          }))
        );
        // setData(response.data.communityActivityReportData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col span={24}>
          <Title level={2}>Community Events Report</Title>
        </Col>
      </Row>
      <div className="datepicker-container">
        <Space direction="vertical" size={12}>
          <RangePicker onChange={handleDateChange} />
        </Space>
        <Button onClick={filterEvents}>Filter</Button>
      </div>
      <Row>
        {loading ? (
          <Spin
            size="large"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <Col span={24}>
            <Table columns={columns} dataSource={data} tableLayout="fixed" />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CommunityEventsReports;
