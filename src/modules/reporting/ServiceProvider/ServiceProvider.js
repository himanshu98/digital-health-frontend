import {
  Table,
  // Input,
  // Select,
  Row,
  Col,
  Button,
  // Space,
  Typography,
} from "antd";
import React, { useState, useEffect } from "react";
import ServiceProviderDetails from "./ServiceProviderDetails";
import axios from "axios"; // Import Axios

import "./ServiceProvider.css";

// const { Option } = Select;
const { Title } = Typography;

const ServiceProvider = () => {
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
      key: 'recentVisits'
    }
  ];
  let data = [];
  const [filteredData, setFilteredData] = useState(data);
  // const [nameFilter, setNameFilter] = useState("");
  // const [phoneFilter, setPhoneFilter] = useState("");
  // const [genderFilter, setGenderFilter] = useState("null");

  // const handleSearch = () => {
  //   const filteredResults = data.filter((item) => {
  //     const nameMatch = item.name
  //       .toLowerCase()
  //       .includes(nameFilter.toLowerCase());
  //     const phoneMatch = item.contact.includes(phoneFilter);
  //     const genderMatch =
  //       genderFilter === "null" || item.gender === genderFilter;

  //     return nameMatch && phoneMatch && genderMatch;
  //   });

  //   setFilteredData(filteredResults);
  // };

  // const clearFilters = () => {
  //   setNameFilter("");
  //   setPhoneFilter("");
  //   setGenderFilter("null");
  //   setFilteredData(data);
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev-sdpm-reports-a58e8c221a46.herokuapp.com/serviceproviderreport"
        );
        console.log(response.data); // Log the API response
        const updatedData = response.data.services.map((service, index) => ({
          key: index + 1,
          id: index + 1,
          service_provider_name: service.serviceName,
          service_name: service.serviceName,
          description: service.description,
          service_type: service.serviceType,
          location: service.location,
          recentVisits: service.recentVisits
        }));
        setFilteredData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="patient" style={{ padding: "20px" }}>
        <Row>
          <Col span={24}>
            <Title level={2}>Service Provider Reports</Title>
          </Col>
        </Row>
        {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col>
            <h3 className="sub-heading">Filters</h3>
          </Col>
          <Col>
            <Input
              placeholder="Search by name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              placeholder="Search by Phone #"
              value={phoneFilter}
              onChange={(e) => setPhoneFilter(e.target.value)}
            />
          </Col>
          <Col>
            <Select
              defaultValue="Gender"
              value={genderFilter}
              onChange={(value) => setGenderFilter(value)}
            >
              <Option value="null" disabled>
                Gender
              </Option>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Col>
          <Col>
            <Space wrap>
              <Button type="primary" onClick={handleSearch}>
                Search
              </Button>
              <Button onClick={clearFilters}>Clear</Button>
            </Space>
          </Col>
        </Row> */}
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={filteredData} size="large" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ServiceProvider;
