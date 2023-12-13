import React, { useState, useEffect } from "react";
import { Table, Typography, Spin, Row, Col } from "antd";
import axios from "axios";

const { Title } = Typography;

const CaseManagerPerformance = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Case Manager Name",
      dataIndex: "CaseManagerName",
      key: "CaseManagerName",
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
    },
    {
      title: "Contact Number",
      dataIndex: "ContactNumber",
      key: "ContactNumber",
    },
    {
      title: "Cases Assigned",
      dataIndex: "casesAssigned",
      key: "casesAssigned",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sdpm-reports-138bfe3f755c.herokuapp.com/casemanagerperformancereport"
        );
        setData(response.data.caseManagers); // Assuming the API response is an object with a 'caseManagers' property
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="patient" style={{ padding: "20px" }}>
      <Row>
        <Col span={24}>
          <Title level={2}>Case Manager Performance</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {loading ? (
            <Spin
              size="large"
              style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            />
          ) : (
            <Table columns={columns} dataSource={data} tableLayout="fixed" />
          )}
        </Col>
      </Row>
      </div>
    </>
  );
};

export default CaseManagerPerformance;
