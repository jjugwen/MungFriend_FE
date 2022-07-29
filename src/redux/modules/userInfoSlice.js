import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/API/instance";

//axios
export const myinfoDB = () => {
  return async function (dispatch) {
    try {
      const response = await instance.get(`/myinfo`);
      dispatch(MyInfoLoad(response.data));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const userinfoDB = (nickname) => {
  // console.log(nickname);
  return async function (dispatch) {
    try {
      const response = await instance.post(`/userinfo`, { nickname: nickname });
      dispatch(UserInfoLoad(response.data));
    } catch (error) {
      // console.log(error);
    }
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
