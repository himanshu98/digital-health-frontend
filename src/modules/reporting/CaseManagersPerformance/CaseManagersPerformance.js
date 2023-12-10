import React, { useState } from 'react';
import { Row, Col, Typography, Select, Button } from 'antd';
import { Bar } from 'react-chartjs-2';

const { Title } = Typography;
const { Option } = Select;

const CaseManagerPerformance = () => {
  const chartData1 = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    datasets: [
      {
        label: 'Performance 1',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const chartData2 = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
    datasets: [
      {
        label: 'Performance 2',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [45, 72, 68, 34, 80],
      },
    ],
  };

  const [selectedCaseManager, setSelectedCaseManager] = useState('');

  const handleCaseManagerChange = (value) => {
    setSelectedCaseManager(value);
  };

  const handleSearch = () => {
    console.log(`Searching for ${selectedCaseManager}`);
  };

  const handleReset = () => {
    setSelectedCaseManager('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row>
        <Col span={24}>
          <Title level={2}>Case Manager Performance</Title>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <Select
            placeholder="Select Case Manager"
            style={{ width: '100%' }}
            onChange={handleCaseManagerChange}
            value={selectedCaseManager}
          >
            <Option value="CaseManager1">Case Manager 1</Option>
            <Option value="CaseManager2">Case Manager 2</Option>
            <Option value="CaseManager3">Case Manager 3</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>
            Search
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Bar data={chartData1} />
        </Col>
        <Col span={12}>
          <Bar data={chartData2} />
        </Col>
      </Row>
    </div>
  );
};

export default CaseManagerPerformance;
