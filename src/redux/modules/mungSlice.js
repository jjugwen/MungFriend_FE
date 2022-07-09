import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

//미들웨어
//나중에 멤버 아이디값 받아와서 넘겨주기
export const createMungAX = (mung) => {
  return async function (dispatch) {
    // await instance.post(`/api/dogs`, mung)
    await axios
      .post(`http://localhost:5001/mung`, mung)
      .then(() => dispatch(createMung(mung)));
  };
};
export const loadMyMungAX = () => {
  return async function (dispatch) {
    await axios
      .get(`http://localhost:5001/mung`)
      .then((res) => dispatch(loadMyMung(res.data)));
  };
};
//툴킷
const mungSlice = createSlice({
  name: "mung",
  initialState: {},
  reducers: {
    createMung(state, action) {
      state.mung.push(action.payload);
    },
    loadMyMung(state, action) {
      state.mung = action.payload;
    },
  },
});

export const { createMung, loadMyMung } = mungSlice.actions;
export default mungSlice.reducer;
