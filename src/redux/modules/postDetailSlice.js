import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import instance from "./instance";

//미들웨어
export const getDetailDB = (id) => {
  return async function (dispatch) {
    // await instance.get(`/posts/${id}`).then((response) => {
    await axios.get(`http://localhost:5002/detail/${id}`).then((response) => {
      // console.log(response.data);
      dispatch(loadPostDetail(response.data));
    });
  };
};

export const deleteDetailDB = (id) => {
  return async function (dispatch) {
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
    list: [
      {
        id: "0",
        nickname: "작성자",
        dogProfileImgUrl:
          "https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077_960_720.jpg",
        title: "게시글 제목",
        content: "게시글 내용",
        address: "작성자 주소",
        requestStartDate: "2022-06-27T12:34",
        requestEndDate: "2022-06-27T12:38",
        applyCount: 3,
        applyByMe: false,
        isComplete: false,
        createdAt: "2022-06-26T12:34",
        modifiedAt: "2022-06-26T15:31",
        applyList: [
          {
            id: 1,
            nickname: "신청자",
            comment: "신청자 코멘트",
            createdAt: "2022-06-26T16:14",
            modifiedAt: "2022-06-26T19:22",
            dogProfileImgUrl:
              "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
          },
          {
            id: 2,
            nickname: "신청자2",
            comment: "신청자 코멘트2",
            createdAt: "2022-06-26T22:13",
            modifiedAt: "2022-06-26T22:22",
            dogProfileImgUrl:
              "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_960_720.jpg",
          },
        ],
        dogList: [
          {
            id: 1,
            name: "멍멍이1",
            gender: "남",
            size: "소형",
            dogImageFiles: [
              {
                id: 1,
                imageUrl:
                  "https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077_960_720.jpg",
              },
            ],
            isRepresentative: true,
          },
          {
            id: 2,
            name: "멍멍이2",
            gender: "여",
            size: "중형",
            dogImageFiles: [
              {
                id: 1,
                imageUrl:
                  "https://cdn.pixabay.com/photo/2019/11/07/08/40/puppy-4608266_960_720.jpg",
              },
            ],
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

export const actionCreators = { getDetailDB, deleteDetailDB };
export const { loadPostDetail, deletePostDetail } = postDetailSlice.actions;
export default postDetailSlice.reducer;
