import "../styles/Grafico.css"
import React from 'react';
import {useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Grafico({name, width, min, max = null, labels = true, fill = true}) {

  const options = {
    responsive: true,
    scales : {
      y : {
          min : min,
          max : max
      },
    },
    plugins: {
      title: {
        display: false,
        text: 'TEMPERATURE',
      },
      filler: {
        propagate: fill,
      },
    },
    elements: {
      point: {
        pointStyle: false
      }
    }
  };

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: name,
            data: [],
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
            tension: 0.5,
            fill: 'origin',
          },
        ],
      });

      const updateChartData = (message) => {
        const newData = {
          labels: labels ? chartData.labels.concat([""]) : [],
          datasets: [
            {
              label: name,
              data: chartData.datasets[0].data.concat([message]),
            },
          ],
        };
        setChartData(newData);
      };

      const ipcRenderer = window.ipcRenderer;

    ipcRenderer.receive('message-from-main', (message) => {
        updateChartData(message)
    });

    return (
        <div className="chartBox" style={width}>
            <Line options={options} data={chartData}/>
        </div>
    );
}

export default Grafico
