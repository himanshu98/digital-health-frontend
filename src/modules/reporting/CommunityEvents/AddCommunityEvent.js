import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, Select, Checkbox, Row, Col, Button } from "antd";

const AddCommunityEvent = ({ addEvent, setVisibility }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    setVisibility(false);
  };

  useEffect(() => {
    if (addEvent) {
      setOpen(true);
    }
  }, [addEvent, setVisibility]);

  const addCommunityEvent = () => {
    console.log("Add clicked");
  }
  return (
    <Drawer
      title="Add a Community Event"
      placement="right"
      onClose={onClose}
      visible={open}
      size="large"
      closable={false}
    >
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Community Event Name"
              name="eventName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Choose Issue Area"
              name="dropdown"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Access to Social/Recreational Opportunities">
                  Access to Social/Recreational Opportunities
                </Select.Option>
                <Select.Option value="Vocational/Employment">
                  Vocational/Employment
                </Select.Option>
                <Select.Option value="Healthcare">Healthcare</Select.Option>
                <Select.Option value="Transportation">
                  Transportation
                </Select.Option>
                <Select.Option value="Housing">Housing</Select.Option>
                <Select.Option value="Assistive Technology">
                  Assistive Technology
                </Select.Option>
                <Select.Option value="Youth Transitioning">
                  Youth Transitioning
                </Select.Option>
                <Select.Option value="Education">Education</Select.Option>
                <Select.Option value="Emergency Management">
                  Emergency Management
                </Select.Option>
                <Select.Option value="ADA Compliance">
                  ADA Compliance
                </Select.Option>
                <Select.Option value="Outreach Related Needs">
                  Outreach Related Needs
                </Select.Option>
                <Select.Option value="Staff Training">
                  Staff Training
                </Select.Option>
                <Select.Option value="Increasing Access to Community Programs">
                  Increasing Access to Community Programs
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Activity Types" name="activityTypes">
              <Checkbox.Group>
                <Col span={24}>
                  <Checkbox value="CollaboratingNetworking">
                    Collaborating & Networking
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="StaffEducationTraining">
                    Staff Education/Training
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="OutreachEfforts">Outreach Efforts</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="TechicalAssistance">
                    Techical Assistance
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="CommunityEducationPublicInformation">
                    Community Education & Public Information
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="ProfessionalDevelopment">
                    Professional Development
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="CommunitySystemsAdvocacy">
                    Community & Systems Advocacy
                  </Checkbox>
                </Col>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Primary Entities" name="primaryEntities">
              <Checkbox.Group>
                <Checkbox value="CILs">CILs</Checkbox>
                <Checkbox value="SILC">SILC</Checkbox>
                <Checkbox value="DSU">DSU</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Enter number of Hours" name="hours">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button type="primary" style={{ marginRight: 8 }} onClick={addCommunityEvent}>
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
