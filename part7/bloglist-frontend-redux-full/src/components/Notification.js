import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return <div className="px-7 text-lg text-sky-600">{notification}</div>;
};

export default Notification;
