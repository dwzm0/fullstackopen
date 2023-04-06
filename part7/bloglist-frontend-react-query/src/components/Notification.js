import { useNotificationValue } from "../NotifContext";

const Notification = () => {
  const notification = useNotificationValue();

  if (notification === null) {
    return null;
  }

  return notification && <div className="notif">{notification}</div>;
};

export default Notification;
