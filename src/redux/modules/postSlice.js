import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

//미들웨어
//나중에 멤버 아이디값 받아와서 넘겨주기
export const createPostAX = (post) => {
  return async function (dispatch) {
    await instance
      .post(`/api/posts`, post)
      // await axios.post(`http://localhost:5001/post`,post)
      .then(() => dispatch(createPost(post)));
  };
};

export const loadPostListAX =()=>{
  return async function (dispatch){
    // await axios.get(`http://localhost:5001/post`)
    await instance
    .get(`/api/posts`)
    .then((response)=> dispatch(loadPost(response.data)))
  }
}

// export const updatePostAX =(id, post)=>{
//   return async function (dispatch){
//     await axios.patch(`http://localhost:5001/detail/${id}`,post)
//     // await instance
//     // .put(`/api/posts/${id}`)
//     .then((response)=> dispatch(updatePost((response.data))))
//   }
// }

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
    },
  },
});

export const { createPost, loadPost,updatePost } = postSlice.actions;
export default postSlice.reducer;
