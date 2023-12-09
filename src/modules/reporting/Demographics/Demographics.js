import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Colors } from "chart.js";
import { DatePicker, Space as AntSpace, Button } from "antd";
import "./Demographics.css";

// register chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

// Declare datepicker
const { RangePicker } = DatePicker;

const Demographics = () => {
  // common patient data static
  const patientData = [
    {
      patient_id: 1,
      first_name: "Kaye",
      last_name: "Durham",
      hasDisability: true,
      sex: 'Male',
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
      sex: 'Male',
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
      sex: 'Female',
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
      sex: 'Male',
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
      sex: 'Male',
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
      sex: 'Male',
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
      sex: 'Male',
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
      sex: 'Female',
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
      sex: 'Male',
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
      sex: 'Female',
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
      colors: {
        enabled: true,
        forceOverride: true,
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
        backgroundColor: [],
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
      },
    ],
  };

  return (
    <>
      <div className="chart-container">
        <div className="datepicker-container">
          <AntSpace direction="vertical" size={12}>
            <RangePicker />
          </AntSpace>
          <Button>Filter</Button>
        </div>
        <div className="chart-row">
          <div className="chart">
            <h4># of Patients by Race</h4>
            <Bar data={raceData} options={options} />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Demographics;
