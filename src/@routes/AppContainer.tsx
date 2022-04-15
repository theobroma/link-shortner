import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainView from '../@views/MainView';
import { AppLayout } from './AppLayout';

export const AppContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainView />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
