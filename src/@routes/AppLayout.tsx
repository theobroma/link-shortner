import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="HolyGrail">
      <Outlet />
    </div>
  );
};

export { AppLayout };
