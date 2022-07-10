import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

//미들웨어
//나중에 멤버 아이디값 받아와서 넘겨주기
export const createPostAX = (post) => {
  return async function (dispatch) {
    // await instance
      // .post(`/api/dogs`, post)
      await axios.post(`http://localhost:5001/post`,post)
      .then(() => dispatch(createPost(post)));
  };
};

export const loadPostListAX =()=>{
  return async function (dispatch){
    await axios.get(`http://localhost:5001/post`)
    .then((response)=> dispatch(loadPost(response.data)))
  }
}

//툴킷
const postSlice = createSlice({
  name: "post",
  initialState: { post: [] },
  reducers: {
    createPost(state, action) {
      state.post.push(action.payload);
    },
    loadPost(state, action){
      state.post=action.payload
    }
  },
});

export const { createPost, loadPost } = postSlice.actions;
export default postSlice.reducer;
