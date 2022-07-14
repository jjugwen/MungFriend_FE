import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// import axios from "axios";

//axios
export const myinfoDB = () => {
  return async function (dispatch) {
    await instance.get(`/myinfo`).then((response) => {
      // await axios.get(`http://localhost:5002/myinfo`).then((response) => {
      // console.log(response.data);
      dispatch(MyInfoLoad(response.data));
    });
  };
};

export const userinfoDB = (nickname) => {
  console.log(nickname);
  return async function (dispatch) {
    await instance
      .post(`/userinfo`, { nickname: nickname })
      .then((response) => {
        // await axios
        //   .get(`http://localhost:5002/userinfo`, { nickname: nickname })
        // console.log(response.data);
        dispatch(UserInfoLoad(response.data));
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
    MyInfoLoad(state, action) {
      state.myInfo = action.payload;
    },
    UserInfoLoad(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const actionCreators = { myinfoDB, userinfoDB };
export const { MyInfoLoad, UserInfoLoad } = userInfoSlice.actions;
export default userInfoSlice.reducer;
