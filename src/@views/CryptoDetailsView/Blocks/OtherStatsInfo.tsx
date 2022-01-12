import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InfoIcon from '@mui/icons-material/Info';
import { alpha, Box, Grid, styled, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import millify from 'millify';
import React from 'react';
import AppAccordion from '../../../@components/AppAccordion';

const Label = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: alpha(theme.palette.common.black, 0.5),
  '& .MuiTypography-root': {
    fontSize: '16px',
    fontWeight: 400,
  },
}));

const LabelIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '15px',
}));

interface Props {
  cryptoDetails: any;
}

const OtherStatsInfo: React.FC<Props> = ({ cryptoDetails }) => {
  const stats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails.numberOfMarkets,
      icon: <AutoGraphIcon />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails.numberOfExchanges,
      icon: <CurrencyExchangeIcon />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails.approvedSupply ? <CheckIcon /> : <CloseIcon />,
      icon: <InfoIcon />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <InfoIcon />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <InfoIcon />,
    },
  ];

  return (
    <Grid item xs={12}>
      <AppAccordion title="Other Stats Info">
        <p>
          An overview showing the statistics of {cryptoDetails.name}, such as
          the base and quote currency, the rank, and trading volume.
        </p>
        {stats.map(({ icon, title, value }) => (
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            key={nanoid()}
          >
            <Label>
              <LabelIcon>{icon}</LabelIcon>
              <Typography component="h5" variant="h6">
                {title}
              </Typography>
            </Label>
            <Typography component="span" variant="body1">
              {value}
            </Typography>
          </Box>
        ))}
      </AppAccordion>
    </Grid>
  );
};

export default OtherStatsInfo;
