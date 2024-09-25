import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

interface CircularChartProps {
  percentage: number;
  baseColor: string; // New prop to accept a base color (hex or rgba)
}

// Helper function to generate lighter shades of the base color
const generateBlueShades = (baseColor: string): string[] => {
  // For simplicity, we'll just adjust the opacity to create shades of blue
  // You can also adjust lightness in HSL for more control
  return [
    `${baseColor}FF`, // original color
    `${baseColor}CC`, // slightly lighter
    `${baseColor}99`, // even lighter
    `${baseColor}66`, // lightest
  ];
};

const CircularChart: React.FC<CircularChartProps> = ({ percentage, baseColor }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const blueShades = generateBlueShades(baseColor); // Generate four shades of blue

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
        rotation: -90,
        circumference: 180, // Only half circle for more stylish look
        cutout: '80%', // Makes it circular
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
  }, [percentage, baseColor]);

  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
      <canvas ref={chartRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <div
        style={{
          position: 'absolute',
          top: '65%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2.5em',
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