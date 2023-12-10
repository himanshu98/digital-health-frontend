import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Divider, Menu, Layout } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Sider, Content } = Layout;

const CareManagementDashboard = () => {
  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'name',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => openPatientModal(record)}>
          View & Update
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Doe',
      dob: '01/15/1980',
      status: 'Active',
      goals: 'Improve physical fitness',
      recentServiceVisits: [
        {
          date: '2023-01-10',
          notes: 'Patient completed a 30-minute exercise session.',
        },
        {
          date: '2023-01-15',
          notes: 'Patient had a follow-up consultation and discussed dietary changes.',
        },
      ],
      exitPlan: 'Plan for gradual increase in exercise and dietary changes.',
    },
    {
      key: '2',
      name: 'Jane Smith',
      dob: '05/20/1990',
      status: 'Active',
      goals: 'Weight loss and diet control',
      recentServiceVisits: [
        {
          date: '2023-01-12',
          notes: 'Patient completed a nutrition counseling session.',
        },
        {
          date: '2023-01-20',
          notes: 'Patient achieved a weight loss milestone.',
        },
      ],
      exitPlan: 'Gradual reduction of calorie intake and continued exercise.',
    },
    {
      key: '3',
      name: 'Mike Johnson',
      dob: '09/03/1975',
      status: 'Active',
      goals: 'Stress management and mental health',
      recentServiceVisits: [
        {
          date: '2023-01-11',
          notes: 'Patient attended a stress management workshop.',
        },
        {
          date: '2023-01-18',
          notes: 'Patient had a therapy session for mental health.',
        },
      ],
      exitPlan: 'Continued therapy and stress management techniques.',
    },
    {
      key: '4',
      name: 'Emily White',
      dob: '03/12/1988',
      status: 'Active',
      goals: 'Rehabilitation after surgery',
      recentServiceVisits: [
        {
          date: '2023-01-09',
          notes: 'Patient completed physical therapy session.',
        },
        {
          date: '2023-01-14',
          notes: `Patient's progress in post-surgery recovery.`,
        },
      ],
      exitPlan: 'Gradual return to daily activities and monitoring.',
    },
    {
      key: '5',
      name: 'Daniel Brown',
      dob: '11/27/1992',
      status: 'Active',
      goals: 'Smoking cessation',
      recentServiceVisits: [
        {
          date: '2023-01-16',
          notes: 'Patient attended a smoking cessation program.',
        },
        {
          date: '2023-01-21',
          notes: `Patient's progress in quitting smoking.`,
        },
      ],
      exitPlan: 'Continuous support for staying smoke-free.',
    },
    {
      key: '6',
      name: 'Olivia Wilson',
      dob: '07/10/1985',
      status: 'Active',
      goals: 'Diabetes management',
      recentServiceVisits: [
        {
          date: '2023-01-13',
          notes: 'Patient received diabetic education.',
        },
        {
          date: '2023-01-19',
          notes: `Patient's blood sugar levels monitored and controlled.`,
        },
      ],
      exitPlan: 'Maintain healthy diet and regular check-ups.',
    },
    {
      key: '7',
      name: 'Sophia Clark',
      dob: '02/18/1972',
      status: 'Active',
      goals: 'Pain management',
      recentServiceVisits: [
        {
          date: '2023-01-17',
          notes: 'Patient had a pain management consultation.',
        },
        {
          date: '2023-01-22',
          notes: `Patient's pain levels and relief measures discussed.`,
        },
      ],
      exitPlan: 'Regular medication and therapy for pain management.',
    },
    {
      key: '8',
      name: 'David Lee',
      dob: '06/08/1995',
      status: 'Active',
      goals: 'Substance abuse recovery',
      recentServiceVisits: [
        {
          date: '2023-01-10',
          notes: 'Patient attended a substance abuse group therapy session.',
        },
        {
          date: '2023-01-25',
          notes: `Patient's progress in recovery and staying substance-free.`,
        },
      ],
      exitPlan: 'Ongoing support and counseling for substance-free life.',
    },
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [progressDetails, setProgressDetails] = useState([]);
  const [chartData, setChartData] = useState([
    // Sample data for the progress chart
    { name: 'Entry 1', timeSpent: 4.5 },
    { name: 'Entry 2', timeSpent: 6.2 },
    { name: 'Entry 3', timeSpent: 5.1 },
    // Add more data entries here
  ]);

  const openPatientModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalVisible(true);
  };

  const openProgressForm = () => {
    setIsFormVisible(true);
  };

  const closeProgressForm = () => {
    setIsFormVisible(false);
  };

  const addProgressDetails = (values) => {
    setProgressDetails([...progressDetails, values]);
    closeProgressForm();
    updateChartData();
  };

  const deleteProgressDetails = (index) => {
    const updatedProgressDetails = [...progressDetails];
    updatedProgressDetails.splice(index, 1);
    setProgressDetails(updatedProgressDetails);
    updateChartData();
  };

  const updateChartData = () => {
    const newData = progressDetails.map((entry, index) => ({
      name: `Entry ${index + 1}`,
      timeSpent: entry.timeSpent,
    }));
    setChartData(newData);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Updated Progress:', values);
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Sider width={300} style={{ background: '#fff', padding: '20px' }}>
        <h2>Patients</h2>
        <Menu mode="vertical" theme="light">
          {data.map((patient) => (
            <Menu.Item key={patient.key} onClick={() => openPatientModal(patient)}>
              {patient.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: '20px' }}>
        <h1>Patient Selection</h1>
        <Table columns={columns} dataSource={data} />
      </Content>
      <Modal
        title={`Patient: ${selectedPatient ? selectedPatient.name : ''}`}
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

            <h2>Recent Service Visits</h2>
            <ul>
              {selectedPatient.recentServiceVisits.map((visit, index) => (
                <li key={index}>
                  <strong>Date:</strong> {visit.date} <br />
                  <strong>Notes:</strong> {visit.notes}
                </li>
              ))}
            </ul>

            <Divider />

            <h2>Progress Update</h2>
            <Form name="patientProgress" onFinish={onFinish}>
              <Form.Item
                name="progressUpdate"
                label="Progress Update"
                rules={[
                  {
                    required: true,
                    message: 'Please enter progress update!',
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
            <Form
              name="prescriptionUpdate"
              
            >
              <Form.Item
                name="prescriptionName"
                label="Prescription Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the prescription name!',
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
                    message: 'Please enter the label number!',
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
                    message: 'Please enter the prescription date!',
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
                    message: 'Please enter patient comments!',
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
            <Form
              name="exitPlan"
            >
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
                message: 'Please enter the patient name!',
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
                message: 'Please enter the time spent!',
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

      <div style={{ margin: '20px' }}>
        <h1>Progress Chart</h1>
        <LineChart width={600} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="timeSpent" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </Layout>
  );
};

export default CareManagementDashboard;
