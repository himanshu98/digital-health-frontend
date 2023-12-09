import { Table, Input, Select, Row, Col, Button, Space } from "antd";
import { useState } from "react";

import "./CaseManagersPerformance.css";

const { Option } = Select;
const columns = [
  {
    title: "Case Manager First Name",
    dataIndex: "case_manager_first_name",
    key: "case_manager_first_name",
  },
  {
    title: "Case Manager Last Name",
    dataIndex: "case_manager_last_name",
    key: "case_manager_last_name",
  },
  {
    title: "Patient Name",
    dataIndex: "patient_name",
    key: "patient_name",
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Service Duration",
    dataIndex: "service_duration",
    key: "service_duration",
  },
  {
    title: "Service Start Date",
    dataIndex: "service_start_date",
    key: "service_start_date",
  },
  {
    title: "Service End Date",
    dataIndex: "service_end_date",
    key: "service_end_date",
  },
];

const data = [
  {
    case_manager_first_name: "Mike",
    case_manager_last_name: "Ross",
    patient_name: "Anthony Stark",
    service: "Meal Planning and Preparation",
    service_duration: "7 months",
    service_start_date: "3/1/23 10:00",
    service_end_date: "Present",
  },
  {
    case_manager_first_name: "Steve",
    case_manager_last_name: "Rodgers",
    patient_name: "Transportation",
    service: "2 years",
    service_duration: "7/10/20 19:07",
    service_start_date: "7/12/22 7:07",
    service_end_date: "",
  },
  {
    case_manager_first_name: "Jessica",
    case_manager_last_name: "Pearson",
    patient_name: "Natasha",
    service: "Shopper",
    service_duration: "5 years",
    service_start_date: "8/10/14 19:07",
    service_end_date: "7/12/19 7:07",
  },
  {
    case_manager_first_name: "Robert",
    case_manager_last_name: "Zane",
    patient_name: "Bruce Banner",
    service: "Companionship",
    service_duration: "4 months",
    service_start_date: "6/15/23 12:23",
    service_end_date: "Present",
  },
  {
    case_manager_first_name: "Louis",
    case_manager_last_name: "Litt",
    patient_name: "Clint Barton",
    service: "Legal Counsel",
    service_duration: "5 days",
    service_start_date: "10/14/23 13:46",
    service_end_date: "Present",
  },
  {
    case_manager_first_name: "Donna",
    case_manager_last_name: "Paulson",
    patient_name: "Kate Bishop",
    service: "Meal Planning and Preparation",
    service_duration: "3 months",
    service_start_date: "7/13/23 14:05",
    service_end_date: "Present",
  },
];

const CaseManagersPerformance = () => {
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
      <div className="patient">
        <h1 className="heading">Case Manager Utilization</h1>
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
          <Table columns={columns} dataSource={filteredData} tableLayout="fixed" />
        </Row>
      </div>
    </>
  );
};

export default CaseManagersPerformance;
