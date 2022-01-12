import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppCard from '../../@components/AppCard';
import AppCardSkeleton from '../../@components/AppCard/AppCardSkeleton';
import { coinsSelector } from '../../@store/coins/selectors';
import { getCoinsTC } from '../../@store/coins/slice';
import { useAppDispatch, useAppSelector } from '../../@store/configureStore';
import { ICurrency } from '../../@types';

const MainView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: { coins },
    isFetching,
  } = useAppSelector(coinsSelector);

  useEffect(() => {
    dispatch(getCoinsTC());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {coins.length > 0 &&
            coins.map((coin: ICurrency, idx: number) => (
              <Grid item xs={12} md={6} lg={4} key={nanoid()}>
                {isFetching ? (
                  <AppCardSkeleton />
                ) : (
                  <RouterLink
                    key={coin.id}
                    to={`/cryptocurrencies/${coin.id}`}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <AppCard currency={coin} />
                  </RouterLink>
                )}
                {/* {idx % 2 === 0 ? (
                  <AppCard currency={coin} />
                ) : (
                  <AppCardSkeleton />
                )} */}
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MainView;
