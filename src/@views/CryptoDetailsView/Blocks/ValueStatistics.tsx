import BoltIcon from '@mui/icons-material/Bolt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
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

const ValueStatistics: React.FC<Props> = ({ cryptoDetails }) => {
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <MonetizationOnIcon />,
    },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumbersIcon /> },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <BoltIcon />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <MonetizationOnIcon />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <EmojiEventsIcon />,
    },
  ];

  return (
    <Grid item xs={12}>
      <AppAccordion title={`${cryptoDetails.name} Value Statistics`}>
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

export default ValueStatistics;
