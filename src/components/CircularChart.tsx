import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import './CircularChart.css';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

interface CircularChartProps {
  percentage: number;
}

// Helper function to generate different shades of blue
const generateBlueShades = (): string[] => {
  return [
    '#007BFF',  // Dark Blue
    '#3399FF',  // Medium Blue
    '#66B2FF',  // Lighter Blue
    '#99CCFF',  // Lightest Blue
  ];
};

const CircularChart: React.FC<CircularChartProps> = ({ percentage }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const blueShades = generateBlueShades(); // Generate four shades of blue

    const chart = new Chart(chartRef.current!, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [percentage, 100 - percentage],
            backgroundColor: [blueShades[0], blueShades[1], blueShades[2], blueShades[3], '#E0E0E0'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        rotation: 0, // No rotation, for full circle
        circumference: 360, // Full circle (360 degrees)
        cutout: '80%', // Makes it look like a ring
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      chart.destroy();
    };
  }, [percentage]);

  return (
    <div className="small-chart">
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5em',
          fontWeight: 'bold',
          color: '#4a4a4a',
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default CircularChart;