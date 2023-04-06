const ErrorComp = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className=" border border-red-900 px-7 text-red-900">{message}</div>
  );
};

export default ErrorComp;
