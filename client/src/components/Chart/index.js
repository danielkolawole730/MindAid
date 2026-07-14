import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                font: {
                    size: 12,
                }
            }
        },
        x: {
            ticks: {
                font: {
                    size: 11,
                }
            }
        }
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 11,
                },
                boxWidth: 12,
                padding: 10,
            }
        },
        title: {
            display: true,
            text: 'Count Data for Positive Responses',
            font: {
                size: 13,
            }
        },
    },
};

const labels = ['Depression', 'Anxiety', 'PTSD', 'Schizophrenia', 'Addiction'];

function Chart(props) {
    let { count, quizCount } = props;
    const data = {
        labels,
        datasets: [
            {
                label: '# of positive responses',
                data: count,
                backgroundColor: '#326B96',
            },
            {
                label: '# of quizzes taken',
                data: quizCount,
                backgroundColor: '#FFCE56',
            }
        ],
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Bar options={options} data={data} />
        </div>
    );
}

export default Chart;