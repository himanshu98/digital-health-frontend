import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Collapse,
  Button,
  Select,
  Modal,
  Form,
  Input,
  Slider,
} from "antd";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { message } from "antd";
import { DatePicker } from "antd";

const { Panel } = Collapse;

const { TextArea } = Input;
const { Content } = Layout;

const ServicesPage = (props) => {
  const [form] = Form.useForm();
  const [appointments, setAppointments] = useState([]);
  const [servicesList, setservicesList] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    id: "",
    date: "",
    serviceName: "",
    serviceID: "",
    patientName: "",
    location: "",
    serviceProvider: "",
    patientId: "",
  });
  const [isProgressNoteModalVisible, setIsProgressNoteModalVisible] =
    useState(false);
  const [progressNoteData, setProgressNoteData] = useState({
    appointmentId: null,
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    feedback: "",
  });
  const [patientOptions, setPatientOptions] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [serviceProviders, setServiceProviders] = useState();

  useEffect(() => {
    const dummyServiceProviders = [
      { id: 1, employeeName: "John trolor" },
      { id: 2, employeeName: "Jane Smith" },
      { id: 3, employeeName: "Alice Johnson" },
      { id: 4, employeeName: "Bob Brown" },
    ];

    setServiceProviders(dummyServiceProviders);
    const fetchServicesData = async () => {
      try {
        const serviceRequests = [
          {
            patientID: "4",
            patientName: "John Smith",
            vendorId: "1",
            goals: [],
          },
          {
            patientID: "6",
            patientName: "ZZFIRST ZZLAST",
            vendorId: "2",
            goals: [],
          },
          {
            patientID: "7",
            patientName: "ZZFIRST ZZLAST",
            vendorId: "1",
            goals: [
              {
                goalId: "1",
                goalName: "Improved Mobility",
                services: [
                  {
                    serviceID: "6",
                    serviceName: "Mobility Assistance",
                    numberOfSessions: "60",
                    frequency: "Twice a week",
                  },
                  {
                    serviceID: "8",
                    serviceName: "Transport Services",
                    numberOfSessions: "60",
                    frequency: "Twice a week",
                  },
                ],
              },
            ],
          },
          {
            patientID: "10",
            patientName: "Sam Smith",
            vendorId: "2",
            goals: [
              {
                goalId: "2",
                goalName: "Home Upkeep",
                services: [
                  {
                    serviceID: "1",
                    serviceName: "House Cleaning",
                    numberOfSessions: "30",
                    frequency: "Once a month",
                  },
                ],
              },
            ],
          },
          {
            patientID: "1",
            patientName: "John Smith",
            vendorId: "1",
            goals: [
              {
                goalId: "3",
                goalName: "Health Management",
                services: [
                  {
                    serviceID: "4",
                    serviceName: "Medication Reminder",
                    numberOfSessions: "45",
                    frequency: "Three times a week",
                  },
                  {
                    serviceID: "10",
                    serviceName: "Meal Preparation",
                    numberOfSessions: "10",
                    frequency: "Three times a week",
                  },
                  {
                    serviceID: "7",
                    serviceName: "Companion Care",
                    numberOfSessions: "25",
                    frequency: "Three times a week",
                  },
                  {
                    serviceID: "5",
                    serviceName: "Personal Care",
                    numberOfSessions: "90",
                    frequency: "Three times a week",
                  },
                ],
              },
            ],
          },
        ];

        setServiceRequests(serviceRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchServicesData();

    const fetchServicesAndPatientsData = async () => {
      try {
        const servicesResponse = await axios.get(
          "https://team3-598fa58116f6.herokuapp.com/api/servicesOffered"
        );
        setservicesList(servicesResponse.data);

        const patientResponse = await axios.get(
          "https://patient-intake-api-8ce23f3e5c62.herokuapp.com/"
        );
        const transformedPatientData = patientResponse.data.patients.map(
          (patient) => {
            // Combine first and last names
            let fullName = `${patient.first_name} ${patient.last_name}`;

            // Return the transformed object
            return {
              id: patient.id.toString(),
              name: fullName,
            };
          }
        );
        setPatientOptions(transformedPatientData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          "https://team3-598fa58116f6.herokuapp.com/api/bookings/all"
        );
        const transformedBookings = response.data.map((booking) =>
          transformBookingDetail(booking)
        );
        setAppointments(transformedBookings);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
    fetchServicesAndPatientsData();
  }, []);

  const handleEditClick = (appointment) => {
    const serviceName = servicesList.find(
      (service) => service.id === appointment.serviceID
    )?.serviceName;

    setEditingAppointment({
      ...appointment,
      service: serviceName || "",
    });

    setIsEditModalVisible(true);
  };

  const handleEditSave = async () => {
    // Check if the date is set
    if (!editingAppointment.date) {
      message.error("Please select a date!");
      return;
    }

    try {
      const dateTimeForApi = editingAppointment.date + "T21:00:00";
      const updatedAppointmentForApi = {
        ...editingAppointment,
        endTime: dateTimeForApi,
        serviceId: editingAppointment.serviceID,
        serviceProvider: editingAppointment.serviceProvider,
      };
      const appointmentId = editingAppointment.id;

      await axios.put(
        `https://team3-598fa58116f6.herokuapp.com/api/bookings/edit/${appointmentId}`,
        updatedAppointmentForApi
      );

      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingAppointment.id
          ? {
              ...appointment,
              date: editingAppointment.date,
            }
          : appointment
      );

      setAppointments(updatedAppointments);
      message.success("Appointment updated successfully.");
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
      message.error("Failed to update appointment.");
    }
  };

  const transformBookingDetail = (booking) => {
    let date = booking.endTime ? booking.endTime.split("T")[0] : "";
    if (!date && booking.startTime) {
      date = booking.startTime.split("T")[0];
    }
    return {
      id: booking.bookingId,
      date: date,
      serviceName: "",
      serviceID: booking.serviceId,
      patientName: "",
      location: "New Jersey",
      serviceProvider: booking.employeeName,
      patientId: booking.patientId,
    };
  };



  const onServiceSelectionChange = (selectedServiceIds) => {
    setSelectedServices(selectedServiceIds.map((id) => id.toString()));
  };
  const filteredServiceRequests = serviceRequests
    .filter((request) => {
      const patientMatch = selectedPatient
        ? request.patientID === selectedPatient
        : true;

      const serviceMatch =
        selectedServices.length > 0
          ? request.goals.some((goal) =>
              goal.services.some((service) =>
                selectedServices.includes(service.serviceID.toString())
              )
            )
          : true;

      return patientMatch && serviceMatch;
    })
    .map((request) => {
      if (selectedServices.length > 0) {
        const filteredGoals = request.goals.map((goal) => {
          return {
            ...goal,
            services: goal.services.filter((service) =>
              selectedServices.includes(service.serviceID.toString())
            ),
          };
        });

        return {
          ...request,
          goals: filteredGoals,
        };
      } else {
        return request;
      }
    });

  const onPatientSelectionChange = (selectedPatientId) => {
    setSelectedPatient(selectedPatientId);
  };

  const handleProgressNoteSave = () => {
    const progressNoteDataForApi = {
      bookingId: progressNoteData.appointmentId,

      goalId: progressNoteData.goalId || null,
      overallSessionQuality: progressNoteData.question1,
      serviceProviderPerformance: progressNoteData.question2,
      meetingElderlyNeeds: progressNoteData.question3,
      communicationResponsiveness: progressNoteData.question4,
    };

    axios
      .post(
        "https://team3-598fa58116f6.herokuapp.com/api/progress_notes/add",
        progressNoteDataForApi
      )
      .then((response) => {
        message.success("Progress note saved successfully.");

        setIsProgressNoteModalVisible(false);
      })
      .catch((error) => {
        message.error("Failed to save progress note.");
        console.error("Error saving progress note:", error);
      });

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
        <Form.Item label={<strong>Overall Session Quality</strong>}>
          <p>Rate the overall quality of this session on a scale of 1 to 5.</p>
          <Slider
            min={1}
            max={5}
            onChange={(value) =>
              setProgressNoteData({
                ...progressNoteData,
                question1: value,
              })
            }
            value={progressNoteData.question1}
          />
        </Form.Item>
        <Form.Item label={<strong>Service Provider's Performance</strong>}>
          <p>
            Rate your satisfaction with the caregiver's professionalism and
            care.
          </p>
          <Slider
            min={1}
            max={5}
            onChange={(value) =>
              setProgressNoteData({
                ...progressNoteData,
                question2: value,
              })
            }
            value={progressNoteData.question2}
          />
        </Form.Item>
        <Form.Item label={<strong>Meeting Elderly Needs</strong>}>
          <p>How well do our services meet the elderly individual's needs?</p>
          <Slider
            min={1}
            max={5}
            onChange={(value) =>
              setProgressNoteData({
                ...progressNoteData,
                question3: value,
              })
            }
            value={progressNoteData.question3}
          />
        </Form.Item>
        <Form.Item label={<strong>Communication and Responsiveness</strong>}>
          <p>
            Rate our staff's communication and responsiveness to your needs.
          </p>
          <Slider
            min={1}
            max={5}
            onChange={(value) =>
              setProgressNoteData({
                ...progressNoteData,
                question4: value,
              })
            }
            value={progressNoteData.question4}
          />
        </Form.Item>
        <Form.Item label={<strong>Additional Feedback</strong>}>
          <TextArea
            rows={4}
            onChange={(e) =>
              setProgressNoteData({
                ...progressNoteData,
                feedback: e.target.value,
              })
            }
            value={progressNoteData.feedback}
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  const showProgressNoteModal = async (appointmentId) => {
    try {
      const response = await axios.get(
        `https://team3-598fa58116f6.herokuapp.com/api/progress-notes/booking/${appointmentId}`
      );
      if (response?.data?.length > 0) {
        const noteData = response.data[0];
        setProgressNoteData({
          appointmentId: appointmentId,
          question1: noteData.overallSessionQuality || 0,
          question2: noteData.serviceProviderPerformance || 0,
          question3: noteData.meetingElderlyNeeds || 0,
          question4: noteData.communicationResponsiveness || 0,
          feedback: noteData.additionalFeedback || "",
        });
      } else {
        setProgressNoteData({
          appointmentId: appointmentId,
          question1: 0,
          question2: 0,
          question3: 0,
          question4: 0,
          feedback: "",
        });
      }
    } catch (error) {
      console.error("Error fetching progress note data:", error);

      setProgressNoteData({
        appointmentId: appointmentId,
        question1: 0,
        question2: 0,
        question3: 0,
        question4: 0,
        feedback: "",
      });
    }
    setIsProgressNoteModalVisible(true);
  };

  const handleAppointmentSave = () => {
    form
      .validateFields()
      .then(async (values) => {
        const newAppointmentRequest = {
          employeeId: appointmentData.employeeId,
          employeeName: appointmentData.serviceProvider,
          endTime: appointmentData.date + "T21:00:00",
          patientId: parseInt(appointmentData.patientId, 10),
          remarks: appointmentData.remarks || "No remarks",
          serviceId: parseInt(appointmentData.serviceID, 10),
          startTime: appointmentData.date + "T09:00:00",
          status: appointmentData.status || "Scheduled",
          serviceProvider: appointmentData.serviceProvider,
        };
        try {
          const response = await axios.post(
            "https://team3-598fa58116f6.herokuapp.com/api/bookings/add",
            newAppointmentRequest
          );

          if (response.data) {
            // Assuming the response data is the new appointment
            const newAppointment = transformBookingDetail(response.data);
            setAppointments([...appointments, newAppointment]);
          } else {
            console.error("No data returned from the post request");
          }

          message.success("Appointment saved successfully.");
          setIsModalVisible(false);
        } catch (error) {
          console.error("Error saving appointment:", error);
          message.error("Failed to save appointment.");
        }
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const renderFilters = () => (
    <div className="filter-container">
      <Select
        showSearch
        mode="multiple"
        allowClear
        onChange={onServiceSelectionChange}
        placeholder="Select services"
        data-testid="service-selector"
        style={{ width: "40%", margin: "10px" }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {servicesList.map((service) => (
          <Select.Option key={service.id} value={service.id.toString()}>
            {service.serviceName}
          </Select.Option>
        ))}
      </Select>

      <Select
        showSearch
        allowClear
        placeholder="Select patient"
        style={{ margin: "10px", width: "30%" }}
        onChange={onPatientSelectionChange} // Handle selection change
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {patientOptions.map((patient) => (
          <Select.Option key={patient.id} value={patient.id}>
            {patient.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );

  const renderServicesRequests = (patient, service, showProgressNoteModal) => {
    const filteredAppointments = appointments.filter((appointment) => {
      return (
        parseInt(appointment.patientId) === parseInt(patient.patientID) &&
        parseInt(appointment.serviceID) === parseInt(service.serviceID)
      );
    });
    const handleCreateAppointment = async (patientID, serviceName) => {
      const patient = serviceRequests.find((p) => p.patientID === patientID);

      let selectedService = null;
      for (const goal of patient.goals) {
        selectedService = goal.services.find(
          (s) => s.serviceName === serviceName
        );
        if (selectedService) break;
      }

      

      setAppointmentData({
        ...appointmentData,
        patientId: patientID,
        patientName: patient.patientName,
        serviceName: selectedService.serviceName,
        serviceID: selectedService?.serviceID,
      });

      setIsModalVisible(true);
    };

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
      {
        title: "Progress Note",
        dataIndex: "id",
        key: "progressNote",
        render: (text, appointment) => (
          <Button
            type="link"
            className="note-button"
            onClick={() => showProgressNoteModal(appointment.id)}
          >
            Progress Note
          </Button>
        ),
      },
      {
        title: "Edit",
        dataIndex: "",
        key: "edit",
        render: (_, appointment) => (
          <EditOutlined onClick={() => handleEditClick(appointment)} />
        ),
      },
    ];

    return (
      <div>
        <div
          className="service-info"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p>
              <strong>Patient Name:</strong> {patient.patientName}
            </p>
            <p>
              <strong>Patient ID:</strong> {patient.patientID}
            </p>
            <p>
              <strong>Service Name:</strong> {service.serviceName}
            </p>
            <p>
              <strong>Service ID:</strong> {service.serviceID}
            </p>
          </div>
          <div>
            <p>
              <strong>Number of Sessions:</strong> {service.numberOfSessions}
            </p>
            <p>
              <strong>Frequency:</strong> {service.frequency}
            </p>
          </div>
          <Button
            type="primary"
            onClick={() =>
              handleCreateAppointment(patient.patientID, service.serviceName)
            }
            style={{ margin: "10px" }}
          >
            Create Appointment
          </Button>
        </div>
        <Collapse>
          <Panel header="View Appointments" key="1">
            <Table
              dataSource={filteredAppointments}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </Panel>
        </Collapse>
      </div>
    );
  };

  const renderEditModal = () => {
    if (!editingAppointment) return null;
    return (
      <Modal
        title="Edit Appointment"
        visible={isEditModalVisible}
        onOk={handleEditSave}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Service Name">
            <Input value={editingAppointment?.service} disabled />
          </Form.Item>
          <Form.Item label="Patient Id">
            <Input value={editingAppointment?.patientId} disabled />
          </Form.Item>
          <input
            type="date"
            value={editingAppointment.date}
            onChange={(e) =>
              setEditingAppointment({
                ...editingAppointment,
                date: e.target.value,
              })
            }
          />

          <Form.Item label="Location">
            <Select
              value="New Jersey"
              disabled={true}
              style={{ width: "100%" }}
            >
              <Select.Option value="New Jersey">New Jersey</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Service Provider">
            <Select
              placeholder="Select Service Provider"
              value={editingAppointment?.serviceProvider}
              onChange={(value) =>
                setEditingAppointment({
                  ...editingAppointment,
                  serviceProvider: value,
                })
              }
            >
              {serviceProviders.map((provider) => (
                <Select.Option key={provider.id} value={provider.employeeName}>
                  {provider.employeeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <Layout className="layout" style={{ backgroundColor: "#f0f0f0" }}>
      <Content className="content">
        {renderFilters()}
        <div>
          {filteredServiceRequests.map((patient) =>
            patient.goals.flatMap((goal) =>
              goal.services.map((service) => (
                <Card
                  key={`${patient.patientID}-${service.serviceID}`}
                  style={{ marginBottom: 16 }}
                >
                  {renderServicesRequests(
                    patient,
                    service,
                    showProgressNoteModal
                  )}
                </Card>
              ))
            )
          )}
        </div>
        {console.log(serviceProviders)}
        <Modal
          title="Create Appointment"
          visible={isModalVisible}
          onOk={handleAppointmentSave}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form layout="vertical" form={form}>
            <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Service: {appointmentData.serviceName}
            </h3>
            <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Patient ID: {appointmentData.patientId}
            </h3>
            <Form.Item
              label="Date of Appointment"
              name="date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <input
                type="date"
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    date: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Location">
              <Select
                value="New Jersey"
                disabled={true}
                style={{ width: "100%" }}
              >
                <Select.Option value="New Jersey">New Jersey</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Service Provider">
              <Select
                placeholder="Select Service Provider"
                value={editingAppointment?.serviceProvider}
                onChange={(value) =>{
                  setAppointmentData({
                    ...appointmentData,
                    serviceProvider: value,
                  })}
                }
              >
                {serviceProviders?.map((provider) => (
                  <Select.Option
                    key={provider.id}
                    value={provider.employeeName}
                  >
                    {provider.employeeName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {renderProgressNoteModal()}
        {renderEditModal()}
      </Content>
    </Layout>
  );
};

export default ServicesPage;
