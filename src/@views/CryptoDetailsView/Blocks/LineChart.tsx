// https://stackoverflow.com/questions/41879459/chartjs-beginatzero-min-max-doesnt-work
import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
);

interface Props {
  coinHistory: any;
  currentPrice: string;
  coinName: string;
}

const LineChart: React.FC<Props> = ({
  coinHistory,
  currentPrice,
  coinName,
}) => {
  const coinPrice = [];

  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString(),
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Grid item xs={12}>
      <Typography
        component="h3"
        variant="h6"
        sx={{ marginTop: '32px', textAlign: 'center' }}
      >
        {coinName} Price Chart
      </Typography>
      <Typography component="h3" variant="h6" sx={{ textAlign: 'center' }}>
        Change: {coinHistory?.data?.change}%
      </Typography>
      <Typography component="h3" variant="h6" sx={{ textAlign: 'center' }}>
        Current {coinName} Price: $ {currentPrice}
      </Typography>
      <Paper sx={{ marginTop: '32px', display: { xs: 'none', sm: 'block' } }}>
        <Line data={data} options={options} />
      </Paper>
    </Grid>
  );
};

export default LineChart;
