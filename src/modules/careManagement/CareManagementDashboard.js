import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Divider,
  Menu,
  Layout,
  Card,
} from "antd";

const { Sider, Content } = Layout;

const CareManagementDashboard = () => {
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "name",
    },
    {
      title: "DOB",
      dataIndex: "dob",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "SSN",
      dataIndex: "ssn",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Zip Code",
      dataIndex: "zip_code",
    },
    {
      title: "Disability Type",
      dataIndex: "disability_type",
    },
    {
      title: "Race",
      dataIndex: "race",
    },
    {
      title: "Ethnicity",
      dataIndex: "ethnicity",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => openPatientModal(record)}>
          View & Update
        </Button>
      ),
    },
  ];

  const data = [
    // ... (previous data)

    // Additional sample data
    {
      key: "1",
      name: "John Doe",
      dob: "01/15/1980",
      status: "Active",
      goals: "Improve physical fitness",
      recentServiceVisits: [
        {
          date: "2023-01-10",
          notes: "Patient completed a 30-minute exercise session.",
          services: "30-minute exercise session",
          review: "3.5/5",
          // notes: "Patient showed improvement in stamina and strength.",
        },
        {
          date: "2023-01-15",
          review: "4/5",
          notes:
            "Patient had a follow-up consultation and discussed dietary changes.",
        },
      ],
      exitPlan: "Plan for gradual increase in exercise and dietary changes.",
      gender: "Male",
      ssn: 123456789,
      phone_number: "1234567890",
      email: "john.doe@example.com",
      city: "Newark",
      state: "NJ",
      zip_code: "07522",
      disability_type: "Blind",
      race: "African-American",
      ethnicity: "Hispanic",
    },
    {
      key: "2",
      name: "Jane Smith",
      dob: "05/20/1990",
      status: "Active",
      goals: "Weight loss and diet control",
      recentServiceVisits: [
        {
          date: "2023-01-12",
          notes: "Patient completed a nutrition counseling session.",
        },
        {
          date: "2023-01-20",
          notes: "Patient achieved a weight loss milestone.",
        },
      ],
      exitPlan: "Gradual reduction of calorie intake and continued exercise.",
      gender: "Female",
      ssn: 987654321,
      phone_number: "9876543210",
      email: "jane.smith@example.com",
      city: "New York",
      state: "NY",
      zip_code: "10001",
      disability_type: "None",
      race: "Caucasian",
      ethnicity: "Non-Hispanic",
    },
    {
      key: "3",
      name: "Mike Johnson",
      dob: "09/03/1975",
      status: "Active",
      goals: "Stress management and mental health",
      recentServiceVisits: [
        {
          date: "2023-01-11",
          notes: "Patient attended a stress management workshop.",
        },
        {
          date: "2023-01-18",
          notes: "Patient had a therapy session for mental health.",
        },
      ],
      exitPlan: "Continued therapy and stress management techniques.",
      gender: "Male",
      ssn: 555555555,
      phone_number: "5555555555",
      email: "mike.johnson@example.com",
      city: "Los Angeles",
      state: "CA",
      zip_code: "90001",
      disability_type: "None",
      race: "Asian",
      ethnicity: "Non-Hispanic",
    },
    {
      key: "4",
      name: "Emily White",
      dob: "03/12/1988",
      status: "Active",
      goals: "Rehabilitation after surgery",
      recentServiceVisits: [
        {
          date: "2023-01-09",
          notes: "Patient completed physical therapy session.",
        },
        {
          date: "2023-01-14",
          notes: `Patient's progress in post-surgery recovery.`,
        },
      ],
      exitPlan: "Gradual return to daily activities and monitoring.",
      gender: "Female",
      ssn: 111223344,
      phone_number: "1112233444",
      email: "emily.white@example.com",
      city: "Chicago",
      state: "IL",
      zip_code: "60601",
      disability_type: "Physical",
      race: "Caucasian",
      ethnicity: "Hispanic",
    },
    {
      key: "5",
      name: "Daniel Brown",
      dob: "11/27/1992",
      status: "Active",
      goals: "Smoking cessation",
      recentServiceVisits: [
        {
          date: "2023-01-16",
          notes: "Patient attended a smoking cessation program.",
        },
        {
          date: "2023-01-21",
          notes: `Patient's progress in quitting smoking.`,
        },
      ],
      exitPlan: "Continuous support for staying smoke-free.",
      gender: "Male",
      ssn: 999888777,
      phone_number: "9998887777",
      email: "daniel.brown@example.com",
      city: "Houston",
      state: "TX",
      zip_code: "77001",
      disability_type: "None",
      race: "African-American",
      ethnicity: "Non-Hispanic",
    },
    {
      key: "6",
      name: "Olivia Wilson",
      dob: "07/10/1985",
      status: "Active",
      goals: "Diabetes management",
      recentServiceVisits: [
        {
          date: "2023-01-13",
          notes: "Patient received diabetic education.",
        },
        {
          date: "2023-01-19",
          notes: `Patient's blood sugar levels monitored and controlled.`,
        },
      ],
      exitPlan: "Maintain healthy diet and regular check-ups.",
      gender: "Female",
      ssn: 666777888,
      phone_number: "6667778888",
      email: "olivia.wilson@example.com",
      city: "Miami",
      state: "FL",
      zip_code: "33101",
      disability_type: "None",
      race: "Caucasian",
      ethnicity: "Non-Hispanic",
    },
    {
      key: "7",
      name: "Sophia Clark",
      dob: "02/18/1972",
      status: "Active",
      goals: "Pain management",
      recentServiceVisits: [
        {
          date: "2023-01-17",
          notes: "Patient had a pain management consultation.",
        },
        {
          date: "2023-01-22",
          notes: `Patient's pain levels and relief measures discussed.`,
        },
      ],
      exitPlan: "Regular medication and therapy for pain management.",
      gender: "Female",
      ssn: 123123123,
      phone_number: "9876543210",
      email: "sophia.clark@example.com",
      created_at: "2023-11-28T20:28:40.133Z",
      updated_at: "2023-12-04T02:43:07.194Z",
      city: "Newark",
      state: "NJ",
      zip_code: "07522",
      disability_type: "None",
      race: "African-American",
      ethnicity: "Hispanic",
    },
    {
      key: "8",
      name: "David Lee",
      dob: "06/08/1995",
      status: "Active",
      goals: "Substance abuse recovery",
      recentServiceVisits: [
        {
          date: "2023-01-10",
          notes: "Patient attended a substance abuse group therapy session.",
        },
        {
          date: "2023-01-25",
          notes: `Patient's progress in recovery and staying substance-free.`,
        },
      ],
      exitPlan: "Ongoing support and counseling for a substance-free life.",
      gender: "Male",
      ssn: 987654321,
      phone_number: "9876543210",
      email: "david.lee@example.com",
      created_at: "2023-11-14T17:06:45.811Z",
      updated_at: "2023-12-04T02:42:41.040Z",
      city: "Newark",
      state: "NJ",
      zip_code: "07522",
      disability_type: "Blind",
      race: "African-American",
      ethnicity: "Hispanic",
    },
    // Add more sample data as needed
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [progressDetails, setProgressDetails] = useState([]);

  const openPatientModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalVisible(true);
  };

  // const openProgressForm = () => {
  //   setIsFormVisible(true);
  // };

  const closeProgressForm = () => {
    setIsFormVisible(false);
  };

  const addProgressDetails = (values) => {
    setProgressDetails([...progressDetails, values]);
    closeProgressForm();
    // updateChartData();
  };

  // const deleteProgressDetails = (index) => {
  //   const updatedProgressDetails = [...progressDetails];
  //   updatedProgressDetails.splice(index, 1);
  //   setProgressDetails(updatedProgressDetails);
  //   updateChartData();
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Updated Progress:", values);
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Sider width={300} style={{ background: "#fff", padding: "20px" }}>
        <h2>Patients</h2>
        <Menu mode="vertical" theme="light">
          {data?.map((patient) => (
            <Menu.Item
              key={patient.key}
              onClick={() => openPatientModal(patient)}
            >
              {patient.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: "20px" }}>
        <h1>Patient Selection</h1>
        <Table columns={columns} dataSource={data} />
      </Content>
      <Modal
        title={`Patient: ${selectedPatient ? selectedPatient.name : ""}`}
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedPatient && (
          <div>
            <h2>Progress Tracking for {selectedPatient.name}</h2>
            <p>
              <strong>Goals:</strong> {selectedPatient.goals}
            </p>
            <Divider />

            <h2>Eye checkup Service</h2>
            {selectedPatient.recentServiceVisits.map((visit, index) => (
              <Card
                key={index}
                title={`Service Visit - ${visit.date}`}
                style={{ margin: "16px 0" }}
              >
                <p>
                  <strong>Review:</strong> {visit.review}
                </p>
                <p>
                  <strong>Notes:</strong> {visit.notes}
                </p>
              </Card>
            ))}

            <Divider />

            <h2>Progress Update</h2>
            <Form name="patientProgress" onFinish={onFinish}>
              <Form.Item
                name="progressUpdate"
                label="Progress Update"
                rules={[
                  {
                    required: true,
                    message: "Please enter progress update!",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Progress
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <h2>Prescription Update</h2>
            <Form name="prescriptionUpdate">
              <Form.Item
                name="prescriptionName"
                label="Prescription Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the prescription name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="labelNumber"
                label="Label Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the label number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="prescriptionDate"
                label="Prescription Date"
                rules={[
                  {
                    required: true,
                    message: "Please enter the prescription date!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="patientComments"
                label="Patient Comments"
                rules={[
                  {
                    required: true,
                    message: "Please enter patient comments!",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              {/* Add more fields for prescription details here */}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Prescription
                </Button>
              </Form.Item>
            </Form>
            <h2>Exit Plan</h2>
            <Form name="exitPlan">
              <Form.Item
                name="participantObjectives"
                label="Participant Objectives and Goals"
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="resources"
                label="Resources, Referrals, or Prescriptions"
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Exit Plan
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>

      <Modal
        title="Progress Details"
        visible={isFormVisible}
        onOk={closeProgressForm}
        onCancel={closeProgressForm}
        width={600}
      >
        <Form name="progressDetailsForm" onFinish={addProgressDetails}>
          <Form.Item
            name="patientName"
            label="Patient Name"
            rules={[
              {
                required: true,
                message: "Please enter the patient name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="timeSpent"
            label="Time Spent on Case Management Activities (hours)"
            rules={[
              {
                required: true,
                message: "Please enter the time spent!",
              },
            ]}
          >
            <Input type="number" step="0.1" />
          </Form.Item>
          {/* Add more fields for progress details here */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Progress Details
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default CareManagementDashboard;
