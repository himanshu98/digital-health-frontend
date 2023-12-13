import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, Select, Checkbox, Row, Col, Button } from "antd";
import axios from "axios";

const { TextArea } = Input; // Import TextArea from Ant Design

const AddCommunityEvent = ({ addEvent, setVisibility, onEventAdded }) => {
  const [open, setOpen] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);
  const [issueAreas, setIssueAreas] = useState([]);
  const [primaryEntities, setPrimaryEntities] = useState([]);
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  const onClose = () => {
    form.resetFields(); // Reset form fields
    setOpen(false);
    setVisibility(false);
  };
  useEffect(() => {
    if (addEvent) {
      setOpen(true);
    }
    const fetchActivityTypes = async () => {
      try {
        const response = await axios.get(
          "https://communityactivity-2e7ac5425e81.herokuapp.com/activitytypes"
        );
        setActivityTypes(response.data.activityTypes);
      } catch (error) {
        console.error("Error fetching activity types:", error);
      }
    };
    const fetchIssueAreas = async () => {
      try {
        const response = await axios.get(
          "https://communityactivity-2e7ac5425e81.herokuapp.com/issueareas"
        );
        setIssueAreas(response.data.issueAreas);
      } catch (error) {
        console.error("Error fetching issue areas:", error);
      }
    };
    const fetchPrimaryEntities = async () => {
      try {
        const response = await axios.get(
          "https://communityactivity-2e7ac5425e81.herokuapp.com/primaryentities"
        );
        setPrimaryEntities(response.data.primaryEntities);
      } catch (error) {
        console.error("Error fetching issue areas:", error);
      }
    };
    fetchActivityTypes();
    fetchIssueAreas();
    fetchPrimaryEntities();
    // Make sure to validate fields after fetching data
    form.validateFields(
      {validateOnly: true}
    )
      .then(() => {
        setSubmittable(true);
      })
      .catch(() => {
        setSubmittable(false);
      });
  }, [addEvent, form, setVisibility, values]);
  const addCommunityEvent = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      // Convert selected values to integers
      const issueAreaID = parseInt(formData.issueArea, 10);
      const activityTypes = formData.activityTypes.map((type) => parseInt(type, 10));
      const primaryEntities = formData.primaryEntities.map((entity) => parseInt(entity, 10));
      const apiPayload = {
        communityEventName: formData.eventName,
        issueAreaID: issueAreaID,
        hours: formData.hours,
        objectives: formData.objectives,
        outcomes: formData.outcomes,
        activityType: activityTypes,
        primaryEntities: primaryEntities,
      };
      const response = await axios.post(
        "https://communityactivity-2e7ac5425e81.herokuapp.com/communityactivity",
        apiPayload
      );
      console.log("Community Event added successfully:", response.data);
      onClose();
      if (onEventAdded) {
        onEventAdded();
      }
    } catch (error) {
      console.error("Error adding community event:", error);
    }
  };
  return (
    <Drawer
      title="Add a Community Event"
      placement="right"
      onClose={onClose}
      visible={open}
      size="large"
      closable={false}
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Community Event Name"
              name="eventName"
              rules={[{ required: true }]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Choose Issue Area"
              name="issueArea"
              rules={[{ required: true }]}
            >
              <Select>
                {issueAreas.map((area) => (
                  <Select.Option
                    key={area.issueAreaID}
                    value={area.issueAreaID}
                  >
                    {area.issueAreaName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Activity Types" name="activityTypes" rules={[{ required: true }]}>
              <Checkbox.Group>
                {activityTypes.map((type) => (
                  <Col span={24} key={type.activityTypeID}>
                    <Checkbox value={type.activityTypeID}>
                      {type.activityTypeName}
                    </Checkbox>
                  </Col>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Primary Entities" name="primaryEntities" rules={[{ required: true }]}>
              <Checkbox.Group>
                {primaryEntities.map((entity) => (
                  <Checkbox
                    key={entity.primaryEntityID}
                    value={entity.primaryEntityID}
                  >
                    {entity.primaryEntityName}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Enter number of Hours" name="hours" rules={[{ required: true }]}>
              <Input type="number"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="Objectives" name="objectives" rules={[{ required: true }]}>
              <TextArea rows={4}/>
            </Form.Item>
          </Col>
        </Row>
        {/* New row for Outcomes */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="Outcomes" name="outcomes" rules={[{ required: true }]}>
              <TextArea rows={4}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={addCommunityEvent}
              disabled={!submittable}
              >
              Add
            </Button>
            <Button type="primary" danger onClick={onClose}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddCommunityEvent;
