import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SleepChart = ({ data, chartType = 'line', title = 'Une kvaliteet' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
        <p className="text-gray-500">Une statistika ilmub siia peale andmete sisestamist</p>
      </div>
    );
  }

  // Formaadime kuupäeva kuvamiseks
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', { day: 'numeric', month: 'short' });
  };

  // Valmistame andmed ette graafikuks
  const chartData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date)
  }));

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="formattedDate" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sleep"
          name="Uni"
          stroke="#3b82f6"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="formattedDate" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="sleep" name="Uni" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-900">{title}</h2>
      </div>
      {chartType === 'line' ? renderLineChart() : renderBarChart()}
    </div>
  );
};

export default SleepChart;