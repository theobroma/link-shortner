// https://flowbite.com/docs/components/alerts/
type Props = {
  error: any;
};

const AppError = ({ error }: Props) => {
  let err = '';

  // console.log('typeof error', typeof error);

  if (typeof error === 'string') {
    err = error;
  } else {
    err = JSON.stringify(error);
  }

  return (
    <div
      className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span className="font-medium">Error&nbsp;:&nbsp;</span>
      {error}
    </div>
  );
};

export default AppError;
