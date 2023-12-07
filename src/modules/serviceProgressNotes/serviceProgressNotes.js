import React, { useState, useEffect } from "react";
import {
  Layout,
  Tabs,
  Collapse,
  Button,
  Select,
  DatePicker,
  Modal,
  Form,
  Input,
  Slider,

} from "antd";
import axios from "axios"; 
import moment from "moment";
import { Table } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons'; 



const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Header, Content } = Layout;


const servicesProgressNotes = () => {
  const [isAddServiceModalVisible, setIsAddServiceModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [appointments, setAppointments] = useState([]);
  const [servicesRequested, setServicesRequested] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    serviceName: "",
    patientName: "",
    location: "",
    serviceProvider: "",
    patientId : ""
  });
  const [isProgressNoteModalVisible, setIsProgressNoteModalVisible] = useState(false);
  const [progressNoteData, setProgressNoteData] = useState({
    appointmentId: null,
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    feedback: "",
  });
  const [serviceOptions, setServiceOptions] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);


  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);

  useEffect(() => {
    // Simulate fetching services and appointments data from APIs
    const fetchServicesData = async () => {

      try {
        const servicesData = [
          {
            id: 1,
            name: "Service 1",
            patient: "Patient A",
            sessions: 5,
            goal: "Goal A",
            description: "Description A",
            frequency: "once a week",
            patientId: "123",
          },
          {
            id: 2,
            name: "Service 2",
            patient: "Patient B",
            sessions: 3,
            goal: "Goal B",
            description: "Description B",
            patientId: "234",
          },
        ];
      
        const appointmentsData = [
          {
            id: 1,
            patientId: "123",
            service: "Service 1",
            date: moment(),
            patient: "Patient A",
            serviceProvider: "Provider 1",
            location: "Location A",
          },
          {
            id: 2,
            patientId: "123",
            service: "Service 1",
            date: moment(),
            patient: "Patient A",
            serviceProvider: "Provider 2",
            location: "Location B",
          },
        ];



        
        // Set data in state
        setServicesRequested(servicesData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


  
    // Fetch data when the component mounts
    fetchServicesData();

    const fetchServicesAndPatientsData = async () => {
      try {
        // Fetch services data
        const servicesResponse = await axios.get('/api/services');
        setServiceOptions(servicesResponse.data.map(service => ({ 
          id: service.id, 
          name: service.name 
        })));

        // Fetch patients data
        const patientsResponse = await axios.get('/api/patients');
        setPatientOptions(patientsResponse.data.map(patient => ({ 
          id: patient.id, 
          name: patient.name 
        })));

        // ... existing data fetching logic for services and appointments ...

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchServicesAndPatientsData();

  }, []);

  const onServiceSelectionChange = (selectedServiceIds) => {
    setSelectedServices(selectedServiceIds);
  };

  const onPatientSelectionChange = (selectedPatientIds) => {
    setSelectedPatients(selectedPatientIds);
  };

  const filteredServices = servicesRequested.filter(
    service => selectedServices.length === 0 || selectedServices.includes(service.id.toString())
  );

  const filteredAppointments = appointments.filter(
    appointment => selectedPatients.length === 0 || selectedPatients.includes(appointment.patientId)
  );

  const handleAddService = (values) => {
    console.log('Received values of form: ', values);
    setIsAddServiceModalVisible(false);
    // Here you would typically send data to the backend or update the state
  };

  const showAddServiceModal = () => {
    setIsAddServiceModalVisible(true);
  };

  const handleProgressNoteSave = () => {
    // Replace with your actual API endpoint

    // axios.post('your_api_endpoint_here', progressNoteData)
    //   .then((response) => {
    //     // Handle successful save
    //     setIsProgressNoteModalVisible(false);
    //     // Optionally reset progressNoteData or update state based on response
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error("Error saving progress note:", error);
    //   });

      console.log(progressNoteData)
      setIsProgressNoteModalVisible(false);
  };
  const renderProgressNoteModal = () => (
    <Modal
      title="Progress Note"
      visible={isProgressNoteModalVisible}
      onOk={handleProgressNoteSave}
      onCancel={() => setIsProgressNoteModalVisible(false)}
    >
      <Form layout="vertical">
        {[1, 2, 3, 4].map((num) => (
          <Form.Item label={`Question ${num}`} key={num}>
            <Slider
              min={0}
              max={10}
              onChange={(value) =>
                setProgressNoteData({ ...progressNoteData, [`question${num}`]: value })
              }
              value={progressNoteData[`question${num}`]}
            />
          </Form.Item>
        ))}
        <Form.Item label="Feedback">
          <TextArea
            rows={4}
            onChange={(e) =>
              setProgressNoteData({ ...progressNoteData, feedback: e.target.value })
            }
            value={progressNoteData.feedback}
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  const showProgressNoteModal = (appointmentId) => {
    // API call to fetch existing data (if any) using appointmentId
    // axios.get(`/api/progressNote/${appointmentId}`).then((response) => {
    //   setProgressNoteData(response.data);
    // });
    setProgressNoteData({ ...progressNoteData, appointmentId });
    setIsProgressNoteModalVisible(true);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const showCreateAppointmentModal = (service) => {
    setAppointmentData({
      serviceName: service.name,
      patientName: service.patient,
      patientId: service.patientId,
      location: "",
      serviceProvider: "",
    });
    setIsModalVisible(true);
  };
  const dummyServiceOptions = [
    { id: '1', name: 'Service 1' },
    { id: '2', name: 'Service 2' },
    { id: '3', name: 'Service 3' },
    // ... more dummy services ...
  ];

  const dummyPatientOptions = [
    { id: '1', name: 'Patient A' },
    { id: '2', name: 'Patient B' },
    { id: '3', name: 'Patient C' },
    // ... more dummy patients ...
  ];

  const handleAppointmentSave = () => {
    const newAppointment = {
      id: appointments.length + 1,
      service: appointmentData.serviceName,
      date: moment(appointmentData.date, "YYYY-MM-DD"),
      patient: appointmentData.patientName,
      serviceProvider: appointmentData.serviceProvider,
      location: appointmentData.location,
      patientId : appointmentData.patientId
    };

    setAppointments([...appointments, newAppointment]);

    setTimeout(() => {
      setIsModalVisible(false);
      setAppointmentData({
        date: "",
        serviceProvider: "",
        serviceName: "",
        patientName: "",
        location: "",
        patientId : ""
      });
    }, 500);
  };
  const renderFilters = () => (
    <div className="filter-container">
      <Select
        showSearch
        mode="multiple"
        allowClear
        placeholder="Select services"
        data-testid="service-selector"
        style={{ width: "40%", margin: "10px" }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {servicesRequested.map((service) => (
          <Select.Option key={service.id} value={service.name}>
            {service.name}
          </Select.Option>
        ))}
      </Select>
  
      <Select
        showSearch
        allowClear
        placeholder="Select patient"
        data-testid="patient-selector"
        style={{ margin: "10px", width: "30%" }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {servicesRequested.map((service) => (
          <Select.Option key={service.patientId} value={service.patient}>
            {service.patient}
          </Select.Option>
        ))}
      </Select>
  
      {/* Conditional rendering for the date range picker */}
      {activeTab === "2" && (
        <DatePicker.RangePicker data-testid="date-range-picker" />
      )}


    </div>
  );
  
  

  const renderServiceInfo = (service) => {
    const filteredAppointments = appointments.filter(
      (appointment) =>
        appointment.patientId === service.patientId &&
        appointment.service === service.name
    );

    const columns = [
      {
        title: "Appointment ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Date of Appointment",
        dataIndex: "date",
        key: "date",
        render: (date) => moment(date).format("YYYY-MM-DD"),
      },
      {
        title: "Service Provider",
        dataIndex: "serviceProvider",
        key: "serviceProvider",
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
      },
    ];

    return (
      <div className="service-info">
        <p>Patient Name: {service.patient}</p>
        <p>Patient Id: {service.patientId}</p>
        <p>Number of Sessions: {service.sessions}</p>
        <p>Goal of the Patient: {service.goal}</p>
        <p>Frequency of the service: {service.frequency}</p>

        <Table
          dataSource={filteredAppointments}
          columns={columns}
          rowKey="id"
          pagination={false}
        />

        <Button
          type="primary"
          onClick={() => showCreateAppointmentModal(service)}
          style={{ margin: "10px" }}
        >
          Create Appointment
        </Button>
      </div>
    );
  };

  const renderAppointmentInfo = (appointment) => (
    <div className="appointment-info">
      <p>Appointment ID: {appointment.id}</p>
      <p>Patient Name: {appointment.patient}</p>
      <p>Date of Appointment: {appointment.date.format("YYYY-MM-DD")}</p>
      <p>Location: {appointment.location}</p>
      <Button
        type="link"
        className="note-button"
        onClick={() => showProgressNoteModal(appointment.id)}
      >
        Progress Note
      </Button>
    </div>
  );

  return (
    <Layout className="layout">
      <Content className="content">
        <Tabs defaultActiveKey="1" onChange={handleTabChange} className="tabs">
          <TabPane tab="Services" key="1">
            {renderFilters()}
            <Collapse>
              {servicesRequested.map((service, index) => (
                <Panel
                  header={`${service.name} - ${service.patient} - ${service.id}`}
                  key={service.id}
                >
                  {renderServiceInfo(service)}
                </Panel>
              ))}
            </Collapse>
          </TabPane>
          <TabPane tab="Appointments" key="2">
            {renderFilters()}
            <Collapse>
              {appointments.map((appointment, index) => (
                <Panel
                  header={`${appointment.id} - ${appointment.service
                    } - ${appointment.date.format("YYYY-MM-DD")}`}
                  key={appointment.id}
                >
                  {renderAppointmentInfo(appointment)}
                </Panel>
              ))}
            </Collapse>
          </TabPane>
        </Tabs>

        <Modal
          title="Create Appointment"
          visible={isModalVisible}
          onOk={handleAppointmentSave}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form layout="vertical">
            <Form.Item label="Service Name">
              <Input value={appointmentData.serviceName} disabled />
            </Form.Item>
            <Form.Item label="Patient Id">
              <Input value={appointmentData.patientId} disabled />
            </Form.Item>
            <Form.Item label="Date of Appointment">
              <DatePicker
                onChange={(date, dateString) =>
                  setAppointmentData({ ...appointmentData, date: dateString })
                }
              />
            </Form.Item>
            <Form.Item label="Location">
              <Select
                value={appointmentData.location}
                onChange={(value) =>
                  setAppointmentData({ ...appointmentData, location: value })
                }
                style={{ width: "100%" }}
              >
                <Select.Option value="Location A">Location A</Select.Option>
                <Select.Option value="Location B">Location B</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Service Provider">
              <Select
                value={appointmentData.serviceProvider}
                onChange={(value) =>
                  setAppointmentData({ ...appointmentData, serviceProvider: value })
                }
              >
                <Select.Option value="provider1">Provider 1</Select.Option>
                <Select.Option value="provider2">Provider 2</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {renderProgressNoteModal()}

        {/* Conditional rendering of the add button at the bottom right corner */}
        {activeTab === "1" && (
          <Button 
            icon={<PlusCircleOutlined />} 
            style={{ 
              position: 'absolute', 
              bottom: '20px', 
              right: '20px',
              backgroundColor: 'white', 
              borderColor: 'gray' 
            }}
            onClick={showAddServiceModal} 

          >
            Add Service
          </Button>
        )}
  <Modal
          title="Add New Service"
          visible={isAddServiceModalVisible}
          onCancel={() => setIsAddServiceModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleAddService}>
            <Form.Item
              name="serviceName"
              label="Service Name"
              rules={[{ required: true, message: 'Please input the service name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="employees"
              label="Employees"
              rules={[{ required: true, message: 'Please add at least one employee!' }]}
            >
              <Select mode="multiple" placeholder="Select employees">
                {/* Options for employees */}
              </Select>
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please input the location of the service!' }]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default servicesProgressNotes;






  // // Make a POST request to save the new appointment
  // axios
  // .post("your_api_endpoint_here", newAppointment) // Replace with your actual API endpoint
  // .then((response) => {
  //   // Assuming the response contains the updated list of appointments
  //   const updatedAppointments = response.data;

  //   // Update the state with the updated appointments
  //   setAppointments(updatedAppointments);

  //   // Set a half-second delay before closing the modal
    
  // })
  // .catch((error) => {
  //   console.error("Error saving appointment:", error);
  //   // Handle any error that may occur during the API call
  // });
  