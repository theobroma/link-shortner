import { AppForm } from '../../@components/AppForm';
// import BasicExample from '../../@components/BasicExample';
// import JobForm from '../../@components/JobForm';
import { Shortens } from '../../@components/Shortens';

const MainView = () => {
  return (
    <div>
      <div className="min-h-screen bg-purple-700 py-20 px-10">
        {/* <BasicExample /> */}
        {/* <JobForm /> */}
        <AppForm />
        <Shortens />
      </div>
    </div>
  );
};

export default MainView;
