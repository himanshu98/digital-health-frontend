import {
  Table,
  // Input,
  // Select,
  Row,
  Col,
  // Button,
  // Space,
  Typography,
} from "antd";
import { useState } from "react";

import "./Patient.css";

// const { Option } = Select;
const { Title } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Patient's Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Contact Information",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Type of disability",
    dataIndex: "disability",
    key: "disability",
  },
  {
    title: "Case manager ID",
    dataIndex: "case_manager_id",
    key: "case_manager_id",
  },
  {
    title: "Case manager Name",
    dataIndex: "case_manager_name",
    key: "case_manager_name",
  },
  {
    title: "Case manager contact information",
    dataIndex: "case_manager_contact_information",
    key: "case_manager_contact_information",
  },
  {
    title: "Care Given service type",
    dataIndex: "care_given_service_type",
    key: "care_given_service_type",
  },
  {
    title: "Frequency and duration of services",
    dataIndex: "f_and_d_of_service",
    key: "f_and_d_of_service",
  },
  {
    title: "Progress and outcomes of care provided",
    dataIndex: "progress_and_outcomes",
    key: "progress_and_outcomes",
  },
  {
    title: "Case Manager's Assigned Patients",
    dataIndex: "case_manager_assigned_patients",
    key: "case_manager_assigned_patients",
  },
];

const data = [
  {
    key: "1",
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "555-123-4567",
    disability: "Spinal Cord Injury (Paraplegia)",
    case_manager_id: "CM001",
    case_manager_name: "Sarah Johnson",
    case_manager_contact_information: "555-987-6543",
    care_given_service_type: "Mobility Training, Health Care Referrals",
    f_and_d_of_service: "3 times a week, 1 hour per session",
    progress_and_outcomes: "Improved mobility and health awareness.",
    case_manager_assigned_patients: 2,
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 60,
    gender: "Female",
    contact: "555-987-6543",
    disability: "Visual Impairment (Macular Degeneration)",
    case_manager_id: "CM002",
    case_manager_name: "Michael Brown",
    case_manager_contact_information: "555-123-4567",
    care_given_service_type: "Assistive Technology Training",
    f_and_d_of_service: "2 times a week, 45 minutes per session",
    progress_and_outcomes: "Enhanced independence through technology.",
    case_manager_assigned_patients: 3,
  },
  {
    key: "3",
    name: "Emily Johnson",
    age: 25,
    gender: "Female",
    contact: "555-234-5678",
    disability: "Autism Spectrum Disorder",
    case_manager_id: "CM003",
    case_manager_name: "David Wilson",
    case_manager_contact_information: "555-345-6789",
    care_given_service_type: "Behavioral Therapy",
    f_and_d_of_service: "Once a week, 1.5 hours per session",
    progress_and_outcomes: "Improved social interaction and communication.",
    case_manager_assigned_patients: 5,
  },
  {
    key: "4",
    name: "Robert Black",
    age: 70,
    gender: "Male",
    contact: "555-456-7890",
    disability: "Dementia",
    case_manager_id: "CM004",
    case_manager_name: "Emma Garcia",
    case_manager_contact_information: "555-567-8901",
    care_given_service_type: "Memory Stimulation Activities",
    f_and_d_of_service: "5 times a week, 30 minutes per session",
    progress_and_outcomes: "Maintained cognitive function and memory.",
    case_manager_assigned_patients: 4,
  },
  {
    key: "5",
    name: "Sarah Lee",
    age: 40,
    gender: "Female",
    contact: "555-678-9012",
    disability: "Cerebral Palsy",
    case_manager_id: "CM005",
    case_manager_name: "Andrew Davis",
    case_manager_contact_information: "555-789-0123",
    care_given_service_type: "Physical Therapy",
    f_and_d_of_service: "4 times a week, 45 minutes per session",
    progress_and_outcomes: "Increased muscle strength and improved motor",
    case_manager_assigned_patients: 1,
  },
  {
    key: "6",
    name: "Lisa Garcia",
    age: 35,
    gender: "Female",
    contact: "555-890-1234",
    disability: "Intellectual Disability",
    case_manager_id: "CM006",
    case_manager_name: "Jessica Martinez",
    case_manager_contact_information: "555-901-2345",
    care_given_service_type: "Life Skills Training",
    f_and_d_of_service: "3 times a week, 1 hour per session",
    progress_and_outcomes: "Improved daily living and social skills.",
    case_manager_assigned_patients: 1,
  },
  {
    key: "7",
    name: "James White",
    age: 50,
    gender: "Male",
    contact: "555-901-2345",
    disability: "Hearing Impairment",
    case_manager_id: "CM007",
    case_manager_name: "Samantha Lee",
    case_manager_contact_information: "555-012-3456",
    care_given_service_type: "Sign Language Training",
    f_and_d_of_service: "2 times a week, 45 minutes per session",
    progress_and_outcomes: "Enhanced communication through sign",
    case_manager_assigned_patients: 2,
  },
  {
    key: "8",
    name: "William Miller",
    age: 55,
    gender: "Male",
    contact: "555-345-6789",
    disability: "Amputation (Lower Limb)",
    case_manager_id: "CM008",
    case_manager_name: "Olivia Brown",
    case_manager_contact_information: "555-234-5678",
    care_given_service_type: "Prosthetic Fitting and Training",
    f_and_d_of_service: "Once a week, 1 hour per session",
    progress_and_outcomes: "Successful adaptation to the prosthetic limb.",
    case_manager_assigned_patients: 4,
  },
  {
    key: "9",
    name: "Michael Taylor",
    age: 60,
    gender: "Male",
    contact: "555-456-7890",
    disability: "Alzheimer's Disease",
    case_manager_id: "CM009",
    case_manager_name: "Ethan Johnson",
    case_manager_contact_information: "555-567-8901",
    care_given_service_type: "Cognitive Stimulation Therapy",
    f_and_d_of_service: "3 times a week, 30 minutes per session",
    progress_and_outcomes: "Delayed progression of cognitive decline.",
    case_manager_assigned_patients: 4,
  },
  {
    key: "10",
    name: "Amanda Harris",
    age: 30,
    gender: "Female",
    contact: "555-567-8901",
    disability: "Multiple Sclerosis",
    case_manager_id: "CM010",
    case_manager_name: "Christopher Smith",
    case_manager_contact_information: "555-678-9012",
    care_given_service_type: "Symptomatic Management Therapy",
    f_and_d_of_service: "4 times a week, 45 minutes per session",
    progress_and_outcomes:
      "Alleviation of symptoms and improved quality of life.",
    case_manager_assigned_patients: 1,
  },
];

const Patient = () => {
  const [filteredData] = useState(data);
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
  return (
    <>
      <div className="patient" style={{ padding: "20px" }}>
        <Row>
          <Col span={24}>
            <Title level={2}>Patient Disability Report</Title>
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
          <Table columns={columns} dataSource={filteredData} size="large" />
        </Row>
      </div>
    </>
  );
};

export default Patient;
