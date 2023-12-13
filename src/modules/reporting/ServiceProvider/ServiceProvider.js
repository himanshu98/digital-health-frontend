import { Table, Row, Col, Button, Typography, notification, Spin } from "antd";
import React, { useState, useEffect, useRef } from "react";
import ServiceProviderDetails from "./ServiceProviderDetails";
import axios from "axios";
import "./ServiceProvider.css";

const { Title } = Typography;

const ServiceProvider = () => {
  // notification
  const [api, contextHolder] = notification.useNotification();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openNotificationWithIcon = (type, error) => {
    const statusCode = error.response?.status || "N/A";
    const statusText = error.response?.statusText || "N/A";
    const errorMessage = error.response?.data?.detail || "N/A";
    api[type]({
      message: "Server Error",
      description: (
        <>
          <div>
            <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
              Status Code:
            </span>{" "}
            {statusCode}
          </div>
          <div>
            <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
              Status Text:
            </span>{" "}
            {statusText}
          </div>
          <div>
            <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
              Error Message:
            </span>{" "}
            {errorMessage}
          </div>
        </>
      ),
    });
  };
  // Open drawer on click of name
  const [openedDrawerKey, setOpenedDrawerKey] = useState(null);
  const openDrawer = (key) => {
    setOpenedDrawerKey(key);
  };
  const closeDrawer = () => {
    setOpenedDrawerKey(null);
  };
  const columns = [
    {
      title: "Service Provider Name",
      dataIndex: "service_provider_name",
      key: "service_provider_name",
      render: (_, record) => {
        return (
          <>
            <Button type="link" onClick={() => openDrawer(record.id)}>
              {record.service_provider_name}
            </Button>
            {openedDrawerKey === record.id && (
              <ServiceProviderDetails
                setShowDetails={closeDrawer}
                record={record}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Service Type",
      dataIndex: "service_type",
      key: "service_type",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      key: "recentVisits",
    },
  ];
  let data = [];
  const [filteredData, setFilteredData] = useState(data);
  const notificationShownRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev-sdpm-reports-a58e8c221a46.herokuapp.com/serviceproviderreport"
        );
        const updatedData = response.data.services.map((service, index) => ({
          key: index + 1,
          id: index + 1,
          service_provider_name: service.serviceName,
          service_name: service.serviceName,
          description: service.description,
          service_type: service.serviceType,
          location: service.location,
          recentVisits: service.recentVisits,
        }));
        setFilteredData(updatedData);
      } catch (error) {
        if (!notificationShownRef.current) {
          openNotificationWithIcon("error", error);
          notificationShownRef.current = true;
        }
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  return (
    <>
      {contextHolder}
      <div className="patient" style={{ padding: "20px" }}>
        <Row>
          <Col span={24}>
            <Title level={2}>Services Provided Report</Title>
          </Col>
        </Row>
        <Row>
        {loading ? (
          <Spin size="large"  style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
        ) : (
          <Col span={24}>
          <Table columns={columns} dataSource={filteredData} size="large"/>
          </Col>
        )}
      </Row>
      </div>
    </>
  );
};

export default ServiceProvider;
