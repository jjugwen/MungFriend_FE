import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//미들웨어
//나중에 멤버 아이디값 받아와서 넘겨주기
export const loadMyPageAX = () => {
  return async function (dispatch) {
    await axios
      .get(`http://localhost:5001/mypage`)
      .then((response) => console.log(response));
  };
};

//툴킷
const myPageSlice = createSlice({
  name: "mypage",
  initialState: {},
  reducers: {
    loadMyPage(state, action) {
      state.mypage = action.payload;
    },
  },
});

export const { loadMyPage } = myPageSlice.actions;
export default myPageSlice.reducer;
