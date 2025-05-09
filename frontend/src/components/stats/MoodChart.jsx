import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registreerime vajalikud ChartJS komponendid
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function MoodChart({ data, chartType, title }) {
  // Kui andmeid pole, näitame tühja komponenti
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5 mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">{title || 'Meeleolu muutused'}</h2>
        <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
          <p className="text-gray-500">Meeleolu statistika ilmub siia peale andmete sisestamist</p>
        </div>
      </div>
    );
  }

  // Sorteerime andmed kuupäeva järgi
  const sortedData = [...data]
    .filter(entry => entry && entry.date && !isNaN(entry.mood_rating)) // Filtreerime välja kehtetud andmed
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Ettevalmistame andmed graafiku jaoks
  const labels = sortedData.map(entry => {
    const date = new Date(entry.date);
    return `${date.getDate()}. ${date.toLocaleString('et-EE', { month: 'short' })}`;
  });

  const moodValues = sortedData.map(entry => Number(entry.mood_rating) || 0);

  // Graafiku andmete konfiguratsioon
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Meeleolu',
        data: moodValues,
        backgroundColor: 'rgba(91, 191, 181, 0.6)',
        borderColor: 'rgba(91, 191, 181, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  // Graafiku seadistused
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Meeleolu: ${context.parsed.y}/10`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7, // Maksimaalselt 7 märgist x-teljel
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        max: 5
        ,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-8">
      <h2 className="text-xl font-medium text-gray-900 mb-4">{title || 'Meeleolu muutused'}</h2>
      <div className="h-64">
        {chartType === 'line' ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}

export default MoodChart;