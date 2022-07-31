import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import instance from "../../shared/API/instance";

//axios
//나중에 멤버 아이디값 받아와서 넘겨주기
export const createPostAX = (post) => {
  return async function (dispatch) {
   try{await instance
      .post(`/api/posts`, post)
    dispatch(createPost(post));
        window.location.replace("/posts");
    } catch(err){

    }  
  };
};

export const loadPostListAX = () => {
  return async function (dispatch) {
try{
  const res =await instance.get(`/api/posts`)
  dispatch(loadPost(res.data));

}catch(err){
  
}
  };
};

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
    loadPost(state, action) {
      state.post = action.payload;
    },
  },
});

export const { createPost, loadPost, updatePost } = postSlice.actions;
export default postSlice.reducer;
