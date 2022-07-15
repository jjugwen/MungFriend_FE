import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";
import { deleteMyMung } from "./myPageSlice";

//axios
//나중에 멤버 아이디값 받아와서 넘겨주기
export const createMungAX = (mung) => {
  return async function (dispatch) {
    // console.log(mung)
    // for (const value of mung) console.log(value);
    await instance
      .post(`/api/dogs`, mung)
      // await axios
      // .post(`http://localhost:5001/dogList`, mung)
      .then(() => dispatch(createMung(mung)));
  };
};
export const loadMyMungAX = () => {
  return async function (dispatch) {
    await instance
      .get(`/api/dogs`)
      // await axios
      // .get(`http://localhost:5001/dogList`)
      .then((res) => dispatch(loadMyMung(res.data)));
  };
};

export const deleteMyMungAX = (id) => {
  return async function (dispatch) {
    await instance
      .delete(`/api/dogs/${id}`)
      // await axios
      // .delete(`http://localhost:5001/dogList/${id}`)
      .then(() => dispatch(deleteMyMung(id)));
      // 삭제리듀서는 mypageSlice에
    // dispatch(deleteMyMung(id))
  };
};
//툴킷
const mungSlice = createSlice({
  name: "mung",
  initialState: { mung: [] },
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
