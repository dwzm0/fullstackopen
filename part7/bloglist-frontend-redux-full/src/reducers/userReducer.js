import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setUserIn(state, action) {
      console.log(action.payload);
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(action.payload));
      return action.payload;
    },
    setUserOut() {
      localStorage.removeItem("loggedBlogAppUser");
      return null;
    },
  },
});

export const { setUserIn, setUserOut } = userSlice.actions;

export const logInUser = (user) => {
  return async (dispatch) => {
    const backUser = await loginService.login(user);
    blogService.setToken(backUser.token);
    dispatch(setUserIn(backUser));
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    blogService.setToken(null);
    dispatch(setUserOut());
  };
};

export default userSlice.reducer;
