import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import instance from "../../shared/API/instance";

//axios
export const getDetailDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await instance.get(`/api/posts/${id}`);
      dispatch(loadPostDetail(response.data));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const deleteDetailDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await instance.delete(`/api/posts/${id}`);
      if (response.data.status === "true") {
        // console.log(response);
        dispatch(deletePostDetail(response.data));
        setTimeout(() => {
          window.location.replace("/posts");
        }, 100);
      } else if (response.data.status === "false") {
        // console.log(response.data.status, response.data.message);
      }
    } catch (error) {
      // console.log(error);
    }
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
