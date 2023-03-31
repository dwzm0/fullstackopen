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

export const setNotif = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(`You voted for ${text}`));
    setTimeout(() => dispatch(removeNotification()), time);
  };
};

export default notificationSlice.reducer;
