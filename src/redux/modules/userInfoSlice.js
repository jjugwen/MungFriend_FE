import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import axios from "axios";

//미들웨어
export const myinfoDB = () => {
  return async function (dispatch) {
    // await instance.get(`/myinfo`).then((response) => {
    await axios.get(`http://localhost:5002/myinfo`).then((response) => {
      //   console.log(response.data);
      dispatch(getMyInfo(response.data));
    });
  };
};

export const userinfoDB = (nickname) => {
  console.log(nickname);
  return async function (dispatch) {
    // await instance.get(`/userinfo`, nickname).then((response) => {
    await axios
      .get(`http://localhost:5002/userinfo`, nickname)
      .then((response) => {
        //   console.log(response.data);
        dispatch(getUserInfo(response.data));
      });
  };
};

//리덕스 toolkit
export const userInfoSlice = createSlice({
  name: "myInfo",
  initialState: {
    myInfo: [],
    userInfo: [],
  },
  reducers: {
    getMyInfo(state, action) {
      state.myInfo = action.payload;
    },
    getUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const actionCreators = { myinfoDB, userinfoDB };
export const { getMyInfo, getUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
