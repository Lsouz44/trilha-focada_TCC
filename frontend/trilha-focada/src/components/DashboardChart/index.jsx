import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Axios from 'axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { Container } from './styles';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Tooltip, Legend);

export function DashboardChart(){
    const [activities, setActivities] = useState([]);
    const [chartType, setChartType] = useState('pie');

    const token = localStorage.getItem('token'); // Ajuste conforme sua autenticação

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('http://localhost:3001/dashboard/activities', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setActivities(response.data.activities || []);
            } catch (error) {
                console.error('Erro ao buscar dados para o dashboard:', error);
            }
        };

        fetchData();
    }, [token]);

    // Agrupando atividades por status
    const countByStatus = (status) =>
        activities.filter((activity) => activity.status === status).length;

    // Dados do gráfico
    const activityData = {
        labels: ['Trilhas concluídas', 'Trilhas em andamento', 'Trilhas abandonadas'],
        datasets: [
            {
                label: ['Quantidade'],
                data: [
                    countByStatus('completed'),
                    countByStatus('active'),
                    countByStatus('deleted'),
                ],
                backgroundColor: ['#4682B4', '#EBDF3B', '#E33629'],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
        },
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: { display: false, position: 'top' },
        },
        scales: {
            x: {
                ticks: {
                    display: true,
                    font: {
                        size: 10,
                    },
                    maxRotation: 45,
                    minRotation: 0,
                },
            },
        },
    };


    const handleChartClick = () => {
        setChartType((prevType) => (prevType === 'pie' ? 'bar' : 'pie'));
    };

    return (
        <Container>
            <div className='dashboard'>
                <h1>Dashboard</h1>
                {chartType === 'pie' ? (
                    <Pie data={activityData} options={options} onClick={handleChartClick} />
                ) : (
                    <Bar data={activityData} options={options2} onClick={handleChartClick} />
                )}
                <h2>Clique no gráfico para alternar o tipo de visualização</h2>
            </div>
        </Container>
    );
};
