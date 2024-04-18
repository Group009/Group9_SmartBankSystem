import React, { useState } from 'react';

const ReportsGeneration = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    try {
      // Implement report generation logic here
      // Make an API call to the backend to generate the report
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate, reportType }),
      });

      if (response.ok) {
        const report = await response.json();
        setReportData(report);
      } else {
        // Display an error message
        alert('Failed to generate the report. Please try again later.');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('An error occurred while generating the report. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Reports Generation</h2>
      <form onSubmit={handleGenerateReport}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Report Type:
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="">Select a report</option>
            <option value="transaction">Transaction Report</option>
            <option value="activity">Activity Report</option>
            <option value="savings">Savings Report</option>
          </select>
        </label>
        <button type="submit">Generate Report</button>
      </form>

      {reportData && (
        <div>
          <h3>Report Details</h3>
          {/* Render the report data based on the report type */}
          {reportType === 'transaction' && (
            <TransactionReport data={reportData.transactions} />
          )}
          {reportType === 'activity' && (
            <ActivityReport data={reportData.activities} />
          )}
          {reportType === 'savings' && (
            <SavingsReport data={reportData.savingsInfo} />
          )}
        </div>
      )}
    </div>
  );
};

const TransactionReport = ({ data }) => {
  return (
    <div>
      <h4>Transaction Report</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActivityReport = ({ data }) => {
  return (
    <div>
      <h4>Activity Report</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((activity, index) => (
            <tr key={index}>
              <td>{activity.date}</td>
              <td>{activity.type}</td>
              <td>{activity.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SavingsReport = ({ data }) => {
  return (
    <div>
      <h4>Savings Report</h4>
      <p>Current Savings Balance: ${data.balance.toFixed(2)}</p>
      <p>Savings Goal: ${data.goal.toFixed(2)}</p>
      <p>Savings Progress: {(data.progress * 100).toFixed(2)}%</p>
    </div>
  );
};

export default ReportsGeneration;