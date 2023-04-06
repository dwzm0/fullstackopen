import { createContext, useReducer, useContext } from "react";

const notifReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    case "UNSET":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notifReducer, "");

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
