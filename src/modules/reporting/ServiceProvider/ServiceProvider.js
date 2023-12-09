import { Table, Input, Select, Row, Col, Button, Space, Typography } from "antd";
import React, { useState } from "react";
import ServiceProviderDetails from "./ServiceProviderDetails";

import "./ServiceProvider.css";

const { Option } = Select;
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
      title: "Cost per hour",
      dataIndex: "cost_per_hour",
      key: "cost_per_hour",
    },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Type Of Service",
      dataIndex: "type_of_service",
      key: "type_of_service",
    },
    {
      title: "Rating (1-5)",
      dataIndex: "rating_1_5",
      key: "rating_1_5",
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
    },
  ];

  const data = [
    {
      id: 1,
      service_provider_name: "IL Home Services",
      service_name: "Companionship",
      cost_per_hour: 30,
      staff: "1. William Morrison; 2. Steve Cornell",
      type_of_service: "In-Home Personal Care",
      rating_1_5: 5,
      reviews: [
        "1. William has been very helpful during my walks around the neighbourhood. -Customer1",
        "2. Steve has been keeping me company every day and engages me with his wit and humor. -Customer2",
      ],
    },
    {
      id: 2,
      service_provider_name: "IL Home Services",
      service_name: "Meal Planning and Preparation",
      cost_per_hour: 35,
      staff: "1. Johnathan Wick; 2. Winston Churchill",
      type_of_service: "In-Home Personal Care",
      rating_1_5: 4,
      reviews: [
        "1. Johnathan has been my cook for 3 months and he has been absolutely great considering my allergies to nuts and eggplant. -Customer1",
        "2. Winston takes care of my every meal need and plans my meals according to the doctor's orders with nutritious items to keep my arthritis at bay. -Customer2",
      ],
    },
    {
      id: 3,
      service_provider_name: "IL Home Services",
      service_name: "Shopper",
      cost_per_hour: 25,
      staff: "1. Daisy Maisie",
      type_of_service: "In-Home Personal Care",
      rating_1_5: 5,
      reviews: [
        "1. Daisy has been perfect for me. She picks up prescription right on time and runs errands for me. -Customer1",
      ],
    },
    {
      id: 4,
      service_provider_name: "IL Legal Services",
      service_name: "Legal Counsel",
      cost_per_hour: 50,
      staff: "1. Harvey Specter",
      type_of_service: "Legal",
      rating_1_5: 3,
      reviews: [
        "1. Harvey is good. He has helped me with my lawsuit against the home rental company for evicting me. -Customer5",
      ],
    },
    {
      id: 5,
      service_provider_name: "IL Transportation Services",
      service_name: "Transport",
      cost_per_hour: 40,
      staff: "1. Rachel Zane",
      type_of_service: "Transportation",
      rating_1_5: 3.5,
      reviews: [
        "1. Rachel is great at helping me make my appointments on time to the doctors. If she is not coming, she always finds me a replacement who is great. -Customer4",
      ],
    }
  ];
  const [filteredData, setFilteredData] = useState(data);
  const [nameFilter, setNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("null");

  const handleSearch = () => {
    const filteredResults = data.filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const phoneMatch = item.contact.includes(phoneFilter);
      const genderMatch =
        genderFilter === "null" || item.gender === genderFilter;

      return nameMatch && phoneMatch && genderMatch;
    });

    setFilteredData(filteredResults);
  };

  const clearFilters = () => {
    setNameFilter("");
    setPhoneFilter("");
    setGenderFilter("null");
    setFilteredData(data);
  };
  return (
    <>
      <div className="patient" style={{ padding: '20px' }}>
      <Row>
        <Col span={24}>
          <Title level={2}>Service Provider Reports</Title>
        </Col>
      </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
        </Row>
        <Row>
          <Table columns={columns} dataSource={filteredData} size="large" />
        </Row>
      </div>
    </>
  );
};

export default ServiceProvider;
