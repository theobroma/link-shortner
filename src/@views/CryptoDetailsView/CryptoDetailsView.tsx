import { Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import millify from 'millify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppAccordion from '../../@components/AppAccordion';
import LoadingPage from '../../@components/UI/LoadingPage';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../../@store/coins/crypto/cryptoApi';
// import { ChartExample } from './Blocks/ChartExample';
import CryptoLinks from './Blocks/CryptoLinks';
import LineChart from './Blocks/LineChart';
import OtherStatsInfo from './Blocks/OtherStatsInfo';
import ValueStatistics from './Blocks/ValueStatistics';

const CryptoDetailsView: React.FC = () => {
  const { id: coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <LoadingPage />;

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography component="h2" variant="h5">
                {cryptoDetails.name}
              </Typography>
              <img
                style={{ width: '35px', height: '35px', marginLeft: '15px' }}
                src={cryptoDetails.iconUrl}
                alt={cryptoDetails.name}
              />
            </Box>
          </Grid>

          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails.name}
          />
          {/* <ChartExample /> */}
          {/* ValueStatistics */}
          <ValueStatistics cryptoDetails={cryptoDetails} />
          <OtherStatsInfo cryptoDetails={cryptoDetails} />
          {/* Info */}
          <Grid item xs={12}>
            <AppAccordion title={`What is ${cryptoDetails.name}?`}>
              {parse(cryptoDetails.description)}
            </AppAccordion>
          </Grid>
          {/* Links */}
          <CryptoLinks cryptoDetails={cryptoDetails} />
        </Grid>
      </Box>
    </Container>
  );
};

export default CryptoDetailsView;
