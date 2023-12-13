import { Table, Typography, Row, Col, Spin, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import CaseManagerUtilizationDetails from "./CaseManagerUtilizationDetails";

import "./CaseManagerUtilization.css";

const { Title } = Typography;

const CaseManagerUtilization = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openedDrawerKey, setOpenedDrawerKey] = useState(null);
  const openDrawer = (key) => {
    setOpenedDrawerKey(key);
  };
  const closeDrawer = () => {
    setOpenedDrawerKey(null);
  };
  const columns = [
    {
      title: "Case Manager Name",
      dataIndex: "CaseManagerName",
      key: "CaseManagerName",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => openDrawer(record.id)}
            >
              {record.CaseManagerName}
            </Button>
            {openedDrawerKey === record.id && (
              <CaseManagerUtilizationDetails
                setShowDetails={closeDrawer}
                record={record}
              />
            )}
          </>
        );
      },
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
    // Assuming PatientIds is an array and you want to display it as a string
    {
      title: "Patient IDs",
      dataIndex: "PatientIds",
      key: "PatientIds",
      render: (patientIds) => patientIds.join(", "),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sdpm-reports-138bfe3f755c.herokuapp.com/casemanagerutilizationreport"
      );
      setData(response.data.caseManagers);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="patient" style={{ padding: "20px" }}>
      <Row>
        <Col span={24}>
          <Title level={2}>Case Manager Utilization</Title>
        </Col>
      </Row>
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

export default CaseManagerUtilization;
