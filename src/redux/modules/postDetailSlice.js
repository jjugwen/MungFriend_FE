import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
// import instance from "./instance";

//미들웨어
export const detailDB = (id) => {
  return async function (dispatch) {
    await axios.post(`http://localhost:5001/posts/${id}`).then((response) => {
      console.log(response);
      dispatch(loadPostDetail(response.data));
    });
  };
};

export const deleteDetailDB = (id) => {
  return async function (dispatch) {
    await axios
      .delete(`http://localhost:5001/posts/${id}`)
      .then((response) => {
        if (response.data.status === "true") {
          console.log(response);
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
    list: [
      {
        id: "1",
        nickname: "작성자",
        title: "게시글 제목",
        content: "게시글 내용",
        address: "작성자 주소",
        requestStartDate: "2022-06-27T12:34",
        requestEndDate: "2022-06-27T12:38",
        applyCount: 3,
        applyByMe: false,
        isComplete: false,
        applyList: [
          {
            id: 1,
            nickname: "신청자",
            comment: "신청자 코멘트",
          },
          {
            id: 2,
            nickname: "신청자2",
            comment: "신청자 코멘트2",
          },
        ],
        dogList: [
          {
            id: 1,
            name: "멍멍이1",
            gender: "남",
            size: "소형",
            dogImageFiles: [{ id: 1, imageUrl: "imageurl" }],
            isRepresentative: true,
          },
          {
            id: 2,
            name: "멍멍이2",
            gender: "여",
            size: "중형",
            dogImageFiles: [{ id: 1, imageUrl: "imageurl" }],
            isRepresentative: false,
          },
        ],
      },
    ],
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

// export const actionCreators = { deleteDetailDB }
export const { loadPostDetail, deletePostDetail } = postDetailSlice.actions;
export default postDetailSlice.reducer;
