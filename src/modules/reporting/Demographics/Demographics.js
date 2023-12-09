import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  DoughnutController,
  ArcElement,
} from "chart.js";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { Colors } from "chart.js";
import {
  DatePicker,
  Space as AntSpace,
  Button,
  Row,
  Col,
  Typography,
  Select,
} from "antd";
import "./Demographics.css";

// register chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  PieController,
  DoughnutController,
  ArcElement,
);

// Declare datepicker
const { RangePicker } = DatePicker;

const { Title: AntTitle } = Typography;

const { Option } = Select;

const Demographics = () => {
  // common patient data static
  const patientData = [
    {
      patient_id: 1,
      first_name: "Kaye",
      last_name: "Durham",
      hasDisability: true,
      sex: "Male",
      age: 58,
      city: "Aurora",
      state: "Florida",
      race: "White (Non-Hispanic)",
      marital_status: "Married",
      education_level: "High School Graduate",
      diagnosed_for: "Hypertension",
      services_used: "Meal Preparation",
    },
    {
      patient_id: 2,
      first_name: "Clayton",
      last_name: "Grant",
      hasDisability: false,
      sex: "Male",
      age: 52,
      city: "Wichita",
      state: "Indiana",
      race: "African American",
      marital_status: "Divorced",
      education_level: "Bachelor's Degree",
      diagnosed_for: "Type 2 Diabetes",
      services_used: "Medication Management",
    },
    {
      patient_id: 3,
      first_name: "Shea",
      last_name: "Maddox",
      hasDisability: false,
      sex: "Female",
      age: 46,
      city: "Frankfort",
      state: "Illinois",
      race: "Hispanic or Latino",
      marital_status: "Single",
      education_level: "Master's Degree",
      diagnosed_for: "Migraine",
      services_used: "Transportation Assistance",
    },
    {
      patient_id: 4,
      first_name: "Hedley",
      last_name: "Hoover",
      hasDisability: true,
      sex: "Male",
      age: 83,
      city: "Wilmington",
      state: "Texas",
      race: "Asian",
      marital_status: "Married",
      education_level: "Bachelor's Degree",
      diagnosed_for: "Influenza",
      services_used: "Transportation Assistance",
    },
    {
      patient_id: 5,
      first_name: "Emma",
      last_name: "Stephenson",
      hasDisability: true,
      sex: "Male",
      age: 51,
      city: "Stamford",
      state: "Montana",
      race: "Native American or American Indian",
      marital_status: "Divorced",
      education_level: "Less than High School",
      diagnosed_for: "Asthma",
      services_used: "Personal Care Assistance",
    },
    {
      patient_id: 6,
      first_name: "Hector",
      last_name: "Sandoval",
      hasDisability: true,
      sex: "Male",
      age: 93,
      city: "Hattiesburg",
      state: "Florida",
      race: "Other",
      marital_status: "Widowed",
      education_level: "Less than High School",
      diagnosed_for: "Osteoarthritis",
      services_used: "Home Maintenance",
    },
    {
      patient_id: 7,
      first_name: "Eric",
      last_name: "Bowen",
      hasDisability: true,
      sex: "Male",
      age: 78,
      city: "Bellevue",
      state: "Colorado",
      race: "Other",
      marital_status: "Single",
      education_level: "High School Graduate",
      diagnosed_for: "Depression",
      services_used: "Medication Management",
    },
    {
      patient_id: 8,
      first_name: "Anastasia",
      last_name: "Gibbs",
      hasDisability: false,
      sex: "Female",
      age: 75,
      city: "Cincinnati",
      state: "Ohio",
      race: "African American",
      marital_status: "Married",
      education_level: "Less than High School",
      diagnosed_for: "Bronchitis",
      services_used: "Medication Management",
    },
    {
      patient_id: 9,
      first_name: "Arsenio",
      last_name: "Francis",
      hasDisability: false,
      sex: "Male",
      age: 62,
      city: "Chandler",
      state: "Pennsylvania",
      race: "White (Non-Hispanic)",
      marital_status: "Married",
      education_level: "Some College",
      diagnosed_for: "Hypertension",
      services_used: "Transportation Assistance",
    },
    {
      patient_id: 10,
      first_name: "Libby",
      last_name: "Mcpherson",
      hasDisability: true,
      sex: "Female",
      age: 82,
      city: "Omaha",
      state: "Louisiana",
      race: "Hispanic or Latino",
      marital_status: "Widowed",
      education_level: "Some College",
      diagnosed_for: "Hypertension",
      services_used: "Exercise and Fitness Training",
    },
  ];

  // chart options
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        formatter: (value, context) => {
          return value > 0 ? value : "";
        },
      },
    },
  };
  // Count data for charts
  const countByRace = {};
  const countBySex = { Male: 0, Female: 0 };
  const countByDisability = { Yes: 0, No: 0 };

  // operation on data except for age
  patientData.forEach((patient) => {
    // Add counts for race
    const race = patient.race;
    countByRace[race] = (countByRace[race] || 0) + 1;

    // Add counts for sex
    const sex = patient.sex;
    countBySex[sex] = (countBySex[sex] || 0) + 1;

    // Add counts for disability
    const hasDisability = patient.hasDisability;
    countByDisability[hasDisability ? "Yes" : "No"]++;
  });

  // Race chart
  const raceLabels = Object.keys(countByRace);
  const patientCounts = raceLabels.map((race) => countByRace[race]);
  const raceData = {
    labels: [],
    datasets: [
      {
        label: "Number of Patients",
        data: [],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255,99,132,0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        hoverBackgroundColor: [
          "rgba(255,99,132,0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
        ],
        hoverBorderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  raceData.labels = raceLabels;
  raceData.datasets[0].data = patientCounts;

  // Age Chart
  const ageBandBarData = {
    labels: [],
    datasets: [
      {
        label: "Patients by Age",
        data: [],
        borderWidth: 1,
        backgroundColor: "rgba(153, 255, 153, 0.4)",
        borderColor: "rgba(153, 255, 153, 1)",
        hoverBackgroundColor: "rgba(153, 255, 153, 0.6)",
        hoverBorderColor: "rgba(153, 255, 153, 1)",
      },
    ],
  };
  const ageBands = {};
  const categorizePatientsByAgeBands = (item) => {
    // Initialize age bands
    for (let i = 0; i < 100; i += 10) {
      ageBands[`${i}-${i + 9}`] = 0;
    }
    // Categorize patients into age bands
    item.forEach((patient) => {
      const age = patient.age;
      for (let i = 0; i < 100; i += 10) {
        if (age >= i && age <= i + 9) {
          ageBands[`${i}-${i + 9}`]++;
          break;
        }
      }
    });
    // Convert age band data into labels and data arrays
    const labels = Object.keys(ageBands);
    const dataValues = Object.values(ageBands);

    return { labels, dataValues };
  };
  const ageBandData = categorizePatientsByAgeBands(patientData);
  ageBandBarData.labels = ageBandData.labels;
  ageBandBarData.datasets[0].data = ageBandData.dataValues;

  // Sex Chart
  const sexBarData = {
    labels: Object.keys(countBySex),
    datasets: [
      {
        label: "Patients by Sex",
        data: Object.values(countBySex),
        borderWidth: 1,
        backgroundColor: [
          "rgba(204, 153, 255, 0.4)",
          "rgba(255, 153, 204, 0.4)",
        ],
        borderColor: [
          "rgba(204, 153, 255, 1)",
          "rgba(255, 153, 204, 1)",
        ],
        hoverBackgroundColor: [
          "rgba(204, 153, 255, 0.6)",
          "rgba(255, 153, 204, 0.6)",
        ],
        hoverBorderColor: [
          "rgba(204, 153, 255, 1)",
          "rgba(255, 153, 204, 1)",
        ],
      },
    ],
  };

  // Disability chart

  const disabilityBarData = {
    labels: Object.keys(countByDisability),
    datasets: [
      {
        label: "Patients by Disability",
        data: Object.values(countByDisability),
        borderWidth: 1,
        backgroundColor: "rgba(153, 204, 255, 0.2)",
        borderColor: "rgba(153, 204, 255, 1)",
        hoverBackgroundColor: "rgba(153, 204, 255, 0.4)",
        hoverBorderColor: "rgba(153, 204, 255, 1)",
      },
    ],
  };

  // dynamic charts

  const [chartType, setChartType] = useState("bar");
  const getChartData = () => {
    switch (chartType) {
      case "bar":
        return raceData;
      case "pie":
        return {
          labels: raceData.labels,
          datasets: [{ data: raceData.datasets[0].data }],
        };
      case "doughnut":
        return {
          labels: raceData.labels,
          datasets: [{ data: raceData.datasets[0].data }],
        };
      default:
        return {};
    }
  };
  const chartTypes = ["bar", "pie", "doughnut"];

  const handleChartTypeChange = (value) => {
    setChartType(value);
  };


  const selectedChartData = getChartData();

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={raceData} options={options} />;
      case "pie":
        return <Pie data={raceData} options={options} />;
      case "doughnut":
        return <Doughnut data={raceData} options={options} />;
      default:
        return null;
    }
  };



  return (
    <>
      <div className="patient" style={{ padding: "20px" }}>
        <Row>
          <Col span={24}>
            <AntTitle level={2} style={{ marginLeft: "100px" }}>
              Patient Demographics
            </AntTitle>
          </Col>
        </Row>
        <div className="chart-container">
          <div className="datepicker-container">
            <AntSpace direction="vertical" size={12}>
              <RangePicker />
            </AntSpace>
            <Button>Filter</Button>
          </div>
          <div className="chart-row">
            {/* <div className="chart">
              <h4># of Patients by Race</h4>
              <Bar data={raceData} options={options} />
            </div> */}
            <div className="chart">
              <h4>
                Patients by{" "}
                {chartType === "line"
                  ? "Age"
                  : chartType.charAt(0).toUpperCase() + chartType.slice(1)}
              </h4>
              <Select
                defaultValue={chartType}
                style={{ width: 120 }}
                onChange={handleChartTypeChange}
              >
                {chartTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Option>
                ))}
              </Select>
              {renderChart()}
            </div>
            <div className="chart">
              <h4>Patients by Age band</h4>
              <Bar data={ageBandBarData} options={options} />
            </div>
            <div className="chart">
              <h4>Patients by Sex</h4>
              <Bar data={sexBarData} options={options} />
            </div>
            <div className="chart">
              <h4>Patients by Disability</h4>
              <Bar data={disabilityBarData} options={options} />
              {/* <Pie data={disabilityBarData} options={options} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demographics;
