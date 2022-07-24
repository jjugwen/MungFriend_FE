import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

//axios
//나중에 멤버 아이디값 받아와서 넘겨주기
export const loadMyPageAX = () => {
  return async function (dispatch) {
    await instance
      // await axios.get(`http://localhost:5001/mypage`)
      // await instance
      .get(`/mypage`)
      .then((response) => {
        dispatch(loadMyPage(response.data))
  
      });
  };
};



//툴킷
const myPageSlice = createSlice({
  name: "mypage",
  initialState: {},
  reducers: {
    loadMyPage(state, action) {
      state.mypage = action.payload;
    }
  },
});

export const { loadMyPage, patchIntroduce, patchPhoneNum, deleteMyMung } =
  myPageSlice.actions;
export default myPageSlice.reducer;
