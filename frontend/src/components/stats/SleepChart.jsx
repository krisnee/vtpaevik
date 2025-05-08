import React from 'react';

function SleepChart({ data, chartType = 'line', title }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded mb-8">
        <p className="text-gray-500">Une statistika ilmub siia peale andmete sisestamist</p>
      </div>
    );
  }

  // Sorteerime andmed kuupäeva järgi
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Formaadime kuupäeva kuvamiseks
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', { day: 'numeric', month: 'short' });
  };

  // Filtreerime andmed, et eemaldada puuduvad väärtused
  const filteredData = sortedData.filter(entry => entry.sleep_quality !== undefined);
  
  // SVG dimensioonid
  const svgWidth = 800;
  const svgHeight = 300;
  const padding = { top: 30, right: 30, bottom: 50, left: 50 };
  
  // Arvutame skaala - nüüd 5-palli süsteemis
  const xScale = (svgWidth - padding.left - padding.right) / (filteredData.length - 1 || 1);
  const yScale = (svgHeight - padding.top - padding.bottom) / 5; // Skaala 1-5
  
  // Arvutame punktide koordinaadid
  const points = filteredData.map((entry, index) => {
    const x = padding.left + index * xScale;
    const y = svgHeight - padding.bottom - ((entry.sleep_quality - 1) * yScale);
    return { x, y, value: entry.sleep_quality };
  });
  
  // Tulpdiagrammi tulba laius
  const barWidth = Math.min(40, xScale * 0.8);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-8">
      <h2 className="text-xl font-medium text-gray-900 mb-4">{title || 'Une kvaliteet'}</h2>
      
      <div className="overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} className="mx-auto">
          {/* Y-telje jooned */}
          {[1, 2, 3, 4, 5].map((tick) => (
            <g key={`y-tick-${tick}`}>
              <line
                x1={padding.left - 5}
                y1={svgHeight - padding.bottom - (tick - 1) * yScale}
                x2={svgWidth - padding.right}
                y2={svgHeight - padding.bottom - (tick - 1) * yScale}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={svgHeight - padding.bottom - (tick - 1) * yScale}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs text-gray-500"
              >
                {tick}
              </text>
            </g>
          ))}
          
          {/* X-telg */}
          <line
            x1={padding.left}
            y1={svgHeight - padding.bottom}
            x2={svgWidth - padding.right}
            y2={svgHeight - padding.bottom}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          
          {chartType === 'line' ? (
            <g>
              {/* Joon */}
              <path
                d={points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Punktid - Ilusad ringid */}
              {points.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="#ffffff"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#3b82f6"
                  />
                  <text
                    x={point.x}
                    y={point.y - 15}
                    textAnchor="middle"
                    className="text-xs font-medium"
                    fill="#3b82f6"
                  >
                    {point.value}
                  </text>
                </g>
              ))}
            </g>
          ) : (
            <g>
              {/* Tulbad */}
              {points.map((point, i) => (
                <g key={i}>
                  <rect
                    x={point.x - barWidth / 2}
                    y={point.y}
                    width={barWidth}
                    height={svgHeight - padding.bottom - point.y}
                    fill="#3b82f6"
                    rx="2"
                    ry="2"
                  />
                  <text
                    x={point.x}
                    y={point.y - 8}
                    textAnchor="middle"
                    className="text-xs font-medium"
                    fill="#3b82f6"
                  >
                    {point.value}
                  </text>
                </g>
              ))}
            </g>
          )}
          
          {/* X-telje kuupäevad */}
          <g className="text-xs text-gray-500">
            {filteredData.map((entry, index) => (
              <text
                key={index}
                x={points[index].x}
                y={svgHeight - padding.bottom + 20}
                textAnchor="middle"
                className="text-sm"
              >
                {formatDate(entry.date)}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default SleepChart;