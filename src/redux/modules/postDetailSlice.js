import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

//미들웨어
export const getDetailDB = () => {
  return async function (dispatch) {
    // await instance.get(`/api/posts/${id}`).then((response) => {
    await axios.get(`http://localhost:5002/detail/`).then((response) => {
      // console.log(response.data);
      dispatch(loadPostDetail(response.data));
    });
  };
};

export const deleteDetailDB = (id) => {
  return async function (dispatch) {
    // await instance.delete(`/api/posts/${id}`)
    await axios
      .delete(`http://localhost:5002/detail/${id}`)
      .then((response) => {
        if (response.data.status === "true") {
          // console.log(response);
          dispatch(deletePostDetail(response.data));
        } else {
          console.log(response.data.status, response.data.message);
        }
      })
      .catch((err) => {
        window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

//리덕스 toolkit
export const postDetailSlice = createSlice({
  name: "postDetail",
  initialState: {
    list: [],
  },
  reducers: {
    loadPostDetail(state, action) {
      state.list = action.payload;
    },
    deletePostDetail(state, action) {
      state.list = action.payload;
    },
  },
});

export const actionCreators = { getDetailDB, deleteDetailDB };
export const { loadPostDetail, deletePostDetail } = postDetailSlice.actions;
export default postDetailSlice.reducer;
