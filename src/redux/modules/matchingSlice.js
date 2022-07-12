import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// import axios from "axios";

//미들웨어
//create 매칭하기
export const createMatchingDB = (id) => {
  return async function (dispatch) {
    console.log(id);
    // await axios
    //   .post(`http://localhost:5002/match`, { id: id })
    await instance
      .post(`/api/match/${id}`)
      .then((response) => {
        if (response.data.staus === "true") {
          // console.log(response.data);
          dispatch(matchCreate(response.data));
        } else if (response.data.staus === "false") {
          console.log(response.data.status, response.data.message);
        }
      })
      .catch((err) => {
        window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

//delete - 매칭 취소
export const deleteMatchingDB = (id) => {
  return async function (dispatch) {
    // await axios
    //   .delete(`http://localhost:5002/match/${id}`)
    await instance
      .delete(`/api/match/cancel`)
      .then((response) => {
        // console.log(response);
        console.log(response.data.staus, response.data.message);
        dispatch(matchDelete(id));
      })
      .catch((err) => {
        window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

//리덕스 toolkit
export const matchingSlice = createSlice({
  name: "match",
  initialState: { list: [] },
  reducers: {
    matchCreate(state, action) {
      state.list.push(action.payload);
    },
    matchDelete(state, action) {
      const new_list = state.list.filter((v) => v.id !== action.payload);
      state.list = new_list;
    },
  },
});

export const actionCreators = { createMatchingDB, deleteMatchingDB };
export const { matchCreate, matchDelete } = matchingSlice.actions;
export default matchingSlice.reducer;
