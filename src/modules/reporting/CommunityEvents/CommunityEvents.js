import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Space,
  Button,
  Row,
  Col,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CommunityEventsDetails from "./CommunityEventsDetails";
import AddCommunityEvent from "./AddCommunityEvent";
import axios from "axios";
import "./CommunityEvents.css";

const { Title } = Typography;
const originData = [];
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const CommunityEvents = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.communityActivityId === editingKey;
  // edit an event
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.communityActivityId);
  };
  const cancel = () => {
    console.log("Cancel function");
    setEditingKey("");
  };
  const save = async (record) => {
    console.log("save function");
    try {
      const row = await form.validateFields();
      // Make Axios PUT request to update the record
      const updatedRecord = {
        communityEventName: row.communityActivityName,
        hours: row.hours,
        objectives: row.objectives,
        outcomes: row.outcomes,
        issueAreaID: record.issueAreaID,
        activityType: record.activityTypes.map(item => item.activityTypeID),
        primaryEntities: record.primaryEntities.map(item => item.primaryEntityId),
      };
      const response = await axios.put(
        `https://communityactivity-2e7ac5425e81.herokuapp.com/communityactivity/${record.communityActivityId}`,
        updatedRecord
      );
      if (response.status === 200) {
        console.log("Record updated successfully");
        fetchCommunityActivities();
      } else {
        console.error("Failed to update record");
      }
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // Open drawer on click of Event Name
  const [openedDrawerKey, setOpenedDrawerKey] = useState(null);
  const openDrawer = (key) => {
    setOpenedDrawerKey(key);
  };
  const closeDrawer = () => {
    setOpenedDrawerKey(null);
  };
  const columns = [
    {
      title: "Community Activity Name",
      dataIndex: "communityActivityName",
      width: "25%",
      editable: true,
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => openDrawer(record.communityActivityId)}
            >
              {record.communityActivityName}
            </Button>
            {openedDrawerKey === record.communityActivityId && (
              <CommunityEventsDetails
                setShowDetails={closeDrawer}
                record={record}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Hours",
      dataIndex: "hours",
      width: "15%",
      editable: true,
    },
    {
      title: "Objectives",
      dataIndex: "objectives",
      width: "40%",
      editable: true,
    },
    {
      title: "Outcomes",
      dataIndex: "outcomes",
      width: "40%",
      editable: true,
    },
    {
      title: "Issue Area ID",
      dataIndex: "issueAreaID",
      width: "40%",
      editable: true,
    },
    {
      title: "Issue Area Name",
      dataIndex: "issueAreaName",
      width: "40%",
      editable: true,
    },
    {
      title: "Primary Entities",
      dataIndex: "primaryEntities",
      width: "40%",
      editable: true,
      render: (_, record) => {
        return record.primaryEntities
          .map((entity) => entity.primaryEntityName)
          .join(", ");
      },
    },
    {
      title: "Activity Types",
      dataIndex: "activityTypes",
      width: "40%",
      editable: true,
      render: (_, record) => {
        return record.activityTypes
          .map((type) => type.activityTypeName)
          .join(", ");
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Typography.Link
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              {/* eslint-disable-next-line */}
              <a>Cancel</a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteRecord(record.communityActivityId)}
            >
              <Button icon={<DeleteOutlined />} type="link" danger />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (
      col.dataIndex === "communityActivityName" ||
      col.dataIndex === "hours" ||
      col.dataIndex === "objectives" ||
      col.dataIndex === "outcomes"
    ) {
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === "hours" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }
    return col;
  });

  const deleteRecord = async (key) => {
    try {
      const response = await axios.delete(
        `https://communityactivity-2e7ac5425e81.herokuapp.com/communityactivity/${key}`
      );

      if (response.status === 200) {
        // Successfully deleted the record
        console.log("Record deleted successfully");
        // Refresh the data after deletion
        fetchCommunityActivities();
      } else {
        console.error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Add event Drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const setCloseDrawer = () => {
    setOpen(false);
  };

  const fetchCommunityActivities = async () => {
    try {
      const response = await axios.get(
        "https://communityactivity-2e7ac5425e81.herokuapp.com/communityactivity"
      );
      const newData = response.data.communityActivities.map((item, index) => ({
        ...item,
        key: index.toString(), // You can replace this with the actual unique identifier from your data
      }));
      setData(newData);
      console.log(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchCommunityActivities();
  }, []);
  // Callback function to be passed to AddCommunityEvent
  const handleEventAdded = () => {
    // Fetch data again after adding a new event
    fetchCommunityActivities();
  };
  return (
    <>
      <div className="patient" style={{ padding: "20px" }}>
        <Row>
          <Col span={24}>
            <Title level={2}>Community Events</Title>
          </Col>
        </Row>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="addButton"
          onClick={showDrawer}
        >
          Add Event
        </Button>
        <AddCommunityEvent
          addEvent={open}
          setVisibility={setCloseDrawer}
          onEventAdded={handleEventAdded}
        />
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </>
  );
};
export default CommunityEvents;
