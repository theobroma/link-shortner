import { AppForm } from '../../@components/AppForm';
import { Shortens } from '../../@components/Shortens';

const MainView = () => {
  return (
    <div>
      <div className="min-h-screen bg-purple-700 py-20 px-10">
        <AppForm />
        <Shortens />
      </div>
    </div>
  );
};

export default MainView;
