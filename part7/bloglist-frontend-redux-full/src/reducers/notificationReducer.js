import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const setNotificationForAdd = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(`You have added ${text}`));
    setTimeout(() => dispatch(removeNotification()), time);
  };
};

export const setNotificationForError = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification("Smth is wrong"));
    setTimeout(() => dispatch(removeNotification()), time);
  };
};

export default notificationSlice.reducer;
