import React, { useState } from 'react';
import { Table, Button, Modal, Menu, Dropdown, Form, Input } from 'antd';
import { Card } from 'antd';

const CaseManagerSelectionPage = () => {
  const [selectedCaseManager, setSelectedCaseManager] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('viewPatients');
  const [exitPlanForm] = Form.useForm(); // Create a form instance

  const columns = [
    {
      title: 'Case Manager Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Contact No.',
      dataIndex: 'contactNo',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <Dropdown
          overlay={menu(record)}
          trigger={['click']}
        >
          <Button type="primary">
            Actions
          </Button>
        </Dropdown>
      ),
    },
  ];
// Mock data for patient visit
  const visitsData = [
    {
      id: 1,
      patientName: 'John Doe',
      doctor: 'Dr. Smith',
      time: '2023-10-26 14:30',
      type: 'Follow-up',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctor: 'Dr. Johnson',
      time: '2023-11-05 10:00',
      type: 'Check-up',
    },
    // Add more visit data here
  ];

  const data = [
    {
      key: '1',
      name: 'Case Manager 1',
      email: 'manager1@example.com',
      contactNo:"8623810102",
      status: 'Active',
    },
    {
      key: '2',
      name: 'Case Manager 2',
      email: 'manager2@example.com',
      contactNo:"8623810102",
      status: 'Active',
    },
    {
      key: '3',
      name: 'Case Manager 3',
      email: 'manager3@example.com',
      contactNo:"8623810102",
      status: 'Active',
    },
    // Add more case manager data here
  ];

  const menu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(record, key)}>
      <Menu.Item key="viewPatients">View Patients</Menu.Item>
      <Menu.Item key="viewExitPlan">View Exit Plan</Menu.Item>
      <Menu.Item key="viewDemographics">View Demographics</Menu.Item>
      <Menu.Item key="viewVisits">View Visits</Menu.Item>
      <Menu.Item key="viewGeneralAccount">General Account View</Menu.Item>
    </Menu>
  );

  const handleMenuClick = (record, key) => {
    setSelectedMenuItem(key);
    setSelectedCaseManager(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedCaseManager(null);
    setIsModalVisible(false);
    exitPlanForm.resetFields(); // Clear form fields on cancel
  };

  const saveExitPlan = (values) => {
    // Save the exit plan to the database
    console.log('Exit Plan Saved:', values);
    setIsModalVisible(false);
    exitPlanForm.resetFields(); // Clear form fields on save
  };

  const renderExitPlanForm = () => {
    return (
      <Form form={exitPlanForm} name="exitPlanForm" onFinish={saveExitPlan}>
        <Form.Item name="participantObjectives" label="Participant Objectives and Goals">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="resources" label="Resources, Referrals, and Prescriptions">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Exit Plan
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
const renderVisits = () => {
    if (selectedMenuItem === 'viewVisits' && selectedCaseManager) {
      // Display the patient's recent and upcoming visits
      return (
        <div>
          <h2>Visits for {selectedCaseManager.name}'s Patients:</h2>
          <Table
            columns={[
              {
                title: 'Patient Name',
                dataIndex: 'patientName',
              },
              {
                title: 'Doctor',
                dataIndex: 'doctor',
              },
              {
                title: 'Time',
                dataIndex: 'time',
              },
              {
                title: 'Type',
                dataIndex: 'type',
              },
            ]}
            dataSource={visitsData}
          />
        </div>
      );
    }
  };

  const renderGeneralAccountView = () => {
    if (selectedMenuItem === 'viewGeneralAccount' && selectedCaseManager) {
      return (
        <div>
          <h2>General Account View for {selectedCaseManager.name}'s Patients:</h2>
          <p><strong>Social:</strong> Active in community events and volunteers at a local shelter.</p>
          <p><strong>Family:</strong> Lives with a partner and three children, all attending school.</p>
          <p><strong>Health History:</strong> No significant health issues, maintains a balanced diet and exercise routine.</p>
          <p><strong>Clinical Quality Management Measures:</strong> All clinical quality measures are within normal ranges.</p>
          <p><strong>General View Item:</strong> Some additional information relevant to the patient's general account.</p>
        </div>
      );
    }
  };



const renderViewPatients = () => {
  if (selectedMenuItem === 'viewPatients' && selectedCaseManager) {
    const patientsData = [
      {
        ID: 'P001',
        Name: 'Alice Johnson',
        Age: 25,
        Gender: 'Female',
        'Contact Information': '123 Elm Street, Anytown, USA\nPhone: (555) 123-4567',
        'Type of Disability': 'Cerebral Palsy',
        'Case Manager ID': 'CM001',
        'Case Manager Name': 'Case Manager 1',
        "Case Manager's Assigned Patients": ['P001', 'P002', 'P003'],
        'Case Manager Contact Information': 'Email: cm1@example.com\nPhone: (555) 987-6543',
        'Care Given Service Type': 'Mobility Training, Speech Therapy',
        'Frequency and Duration of Services': '3 times a week for 45 minutes',
        'Progress and Outcomes': 'Improved mobility and communication skills.',
      },
      {
        ID: 'P002',
        Name: 'Bob Smith',
        Age: 32,
        Gender: 'Male',
        'Contact Information': '456 Oak Avenue, Smalltown, USA\nPhone: (555) 987-6543',
        'Type of Disability': 'Visual Impairment',
        'Case Manager ID': 'CM001',
        'Case Manager Name': 'Case Manager 1',
        "Case Manager's Assigned Patients": ['P001', 'P002', 'P003'],
        'Case Manager Contact Information': 'Email: cm1@example.com\nPhone: (555) 987-6543',
        'Care Given Service Type': 'Mobility Training, Visual Assistance',
        'Frequency and Duration of Services': '2 times a week for 60 minutes',
        'Progress and Outcomes': 'Improved mobility and independent living skills.',
      },
      // Add more patient data here
    ];

    return (
      <div>
        <h2>Patients Assigned to {selectedCaseManager.name}:</h2>
        {patientsData.map((patient, index) => (
          <Card key={index} title={patient.Name} style={{ marginBottom: '16px' }}>
            <p><strong>ID:</strong> {patient.ID}</p>
            <p><strong>Patient's Age:</strong> {patient.Age} years</p>
            <p><strong>Gender:</strong> {patient.Gender}</p>
            <p><strong>Contact Information:</strong> {patient['Contact Information']}</p>
            <p><strong>Type of Disability:</strong> {patient['Type of Disability']}</p>
            <p><strong>Case Manager ID:</strong> {patient['Case Manager ID']}</p>
            <p><strong>Case Manager Name:</strong> {patient['Case Manager Name']}</p>
            <p><strong>Case Manager's Assigned Patients:</strong> {patient["Case Manager's Assigned Patients"].join(', ')}</p>
            <p><strong>Case Manager Contact Information:</strong> {patient['Case Manager Contact Information']}</p>
            <p><strong>Care Given Service Type:</strong> {patient['Care Given Service Type']}</p>
            <p><strong>Frequency and Duration of Services:</strong> {patient['Frequency and Duration of Services']}</p>
            <p><strong>Progress and Outcomes:</strong> {patient['Progress and Outcomes']}</p>
          </Card>
        ))}
      </div>
    );
  }
};

  
  const renderDemographics = () => {
    if (selectedMenuItem === 'viewDemographics' && selectedCaseManager) {
      return (
        <div>
          <h2>Demographics for {selectedCaseManager.name}'s Patients:</h2>
          <p><strong>PatientID:</strong> 12345</p>
          <p><strong>FirstName:</strong> John</p>
          <p><strong>LastName:</strong> Doe</p>
          <p><strong>Age:</strong> 38 years</p>
          <p><strong>City:</strong> Anytown</p>
          <p><strong>Race:</strong> Caucasian</p>
          <p><strong>VerifiedByDocuments:</strong> True</p>
          <p><strong>MaritalStatus:</strong> Married</p>
          <p><strong>EmploymentStatus:</strong> Employed</p>
          <p><strong>EducationLevel:</strong> Bachelor's Degree</p>
          <p><strong>HealthcareInformation:</strong> Regular check-ups</p>
          <p><strong>MedicalHistory:</strong> No significant issues</p>
          <p><strong>DiagnosedFor:</strong> Normal</p>
          <p>...</p>
          <p>...</p>
          <p><strong>Services Incurred:</strong> None</p>
          <p><strong>ServiceRequestID:</strong> 98765</p>
        </div>
      );
    }
  };
  

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'viewPatients':
        // Existing code to view patients
        break;
      case 'viewExitPlan':
        return (
          <div>
            <h2>Exit Plan for {selectedCaseManager.name}'s Patients:</h2>
            {renderExitPlanForm()}
          </div>
        );
      case 'viewDemographics':
        // Existing code to view demographics
        break;
      case 'viewVisits':
        // Existing code to view visits
        break;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Case Manager Selection</h1>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={`Case Manager: ${selectedCaseManager ? selectedCaseManager.name : ''}`}
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedCaseManager && renderContent()}
        {renderVisits()}
        {renderGeneralAccountView()}
        {renderDemographics()}
        {renderViewPatients ()}
      </Modal>
    </div>
  );
};

export default CaseManagerSelectionPage;
