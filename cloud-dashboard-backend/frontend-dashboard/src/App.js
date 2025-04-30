import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function App() {
  const [awsData, setAwsData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March 2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/aws-usage")
      .then((response) => response.json())
      .then((data) => {
        setAwsData(data.aws_data);
      })
      .catch((error) => {
        console.error("Failed to load AWS data:", error);
        alert("Failed to load AWS data. Please check backend server!");
      });
  }, []);

  const months = [
    "March 2024", "April 2024", "May 2024", "June 2024", "July 2024",
    "August 2024", "September 2024", "October 2024", "November 2024", "December 2024",
    "January 2025", "February 2025", "March 2025"
  ];

  const filteredData = awsData
    .filter((item) => item.month === selectedMonth)
    .filter((item) => item.service.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalSpend = filteredData.reduce((acc, item) => acc + (item.cost_usd || 0), 0).toFixed(2);

  const pieData = {
    labels: filteredData.map((item) => item.service),
    datasets: [{
      label: "Service Cost (USD)",
      data: filteredData.map((item) => item.cost_usd),
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)"
      ],
      borderWidth: 1,
    }],
  };

  const barData = {
    labels: filteredData.map((item) => item.service),
    datasets: [{
      label: "Service Cost (USD)",
      data: filteredData.map((item) => item.cost_usd),
      backgroundColor: "rgba(75, 192, 192, 0.7)"
    }],
  };

  const monthlyBreakdown = months.map((month) => {
    const monthSpend = awsData
      .filter((item) => item.month === month)
      .reduce((acc, item) => acc + (item.cost_usd || 0), 0);
    return { month, total: monthSpend.toFixed(2) };
  });

  return (
    <div style={{
      backgroundColor: darkMode ? "#121212" : "#f9f9f9",
      color: darkMode ? "#fff" : "#000",
      minHeight: "100vh",
      padding: "20px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000"
            }}
          >
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search Service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "300px",
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000"
            }}
          />
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: darkMode ? "#0d6efd" : "#0d6efd",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none"
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>AWS Usage Dashboard</h1>

      <div style={{
        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
        padding: "15px",
        marginBottom: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>Total AWS Spend for {selectedMonth}: ${totalSpend}</h2>
      </div>

      <h2>Service Cost Table</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Service</th>
            <th style={tableHeaderStyle}>Region</th>
            <th style={tableHeaderStyle}>Month</th>
            <th style={tableHeaderStyle}>Cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{item.service}</td>
              <td style={tableCellStyle}>{item.region}</td>
              <td style={tableCellStyle}>{item.month}</td>
              <td style={tableCellStyle}>${item.cost_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Service Cost Pie Chart</h2>
      <div style={{ width: "50%", margin: "0 auto", marginBottom: "50px" }}>
        <Pie data={pieData} />
      </div>

      <h2>Service Cost Bar Chart</h2>
      <div style={{ width: "80%", margin: "0 auto", marginBottom: "50px" }}>
        <Bar data={barData} />
      </div>

      <h2>Monthly Breakdown</h2>
      <table style={{ width: "60%", margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Month</th>
            <th style={tableHeaderStyle}>Total Spend (USD)</th>
          </tr>
        </thead>
        <tbody>
          {monthlyBreakdown.map((entry, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{entry.month}</td>
              <td style={tableCellStyle}>${entry.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px",
  textAlign: "left",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default App;