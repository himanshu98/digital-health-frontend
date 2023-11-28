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
import "./Demographics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const Demographics = () => {
  // patients by race
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
    },
  };
  const data = {
    labels: [],
    datasets: [
      {
        label: "Number of Patients",
        data: [],
        borderWidth: 1,
      },
    ],
  };
  // common patient data
  const patientData = [
    {
      patient_id: 1,
      first_name: "Kaye",
      last_name: "Durham",
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

  // Patients by age band
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
  const countByRace = {};
  patientData.forEach((patient) => {
    const race = patient.race;
    countByRace[race] = (countByRace[race] || 0) + 1;
  });
  const raceLabels = Object.keys(countByRace);
  const patientCounts = raceLabels.map((race) => countByRace[race]);

  data.labels = raceLabels;
  data.datasets[0].data = patientCounts;

  const categorizePatientsByAgeBands = (data) => {
    const ageBands = {};

    // Initialize age bands
    for (let i = 0; i < 100; i += 10) {
      ageBands[`${i}-${i + 9}`] = 0;
    }

    // Categorize patients into age bands
    data.forEach((patient) => {
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
  console.log(ageBandData);
  return (
    <div className="chart-container">
      <div className="chart">
        <h4># of Patients by Race</h4>
        <Bar data={data} options={options} />
      </div>
      <div className="chart">
        <h4>Patients by Age band</h4>
        <Bar data={ageBandBarData} options={options} />
      </div>
    </div>
  );
};

export default Demographics;
