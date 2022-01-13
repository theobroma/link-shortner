import React from 'react';
import { Outlet } from 'react-router-dom';
// import ComponentWithProblem from '../@components/WDYR/ComponentWithProblem';

const AppLayout = () => {
  return (
    <div className="HolyGrail">
      {/* <PersistentDrawerLeft>
        <Outlet />
      </PersistentDrawerLeft> */}
      <Outlet />
      {/* Test WDYR */}
      {/* <ComponentWithProblem /> */}
      {/* <Footer /> */}
    </div>
  );
};

export { AppLayout };
