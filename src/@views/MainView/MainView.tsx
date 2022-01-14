import React from 'react';
import { AppForm } from '../../@components/AppForm';
// import BasicExample from '../../@components/BasicExample';
import JobForm from '../../@components/JobForm';

const MainView: React.FC = () => {
  return (
    <div>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <div className="py-20 px-10 bg-purple-700 min-h-screen">
        {/* <BasicExample /> */}
        {/* <JobForm /> */}
        <AppForm />
      </div>
    </div>
  );
};

export default MainView;
