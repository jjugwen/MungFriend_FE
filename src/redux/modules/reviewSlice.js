import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// import axios from "axios";

//axios
export const createReviewDB = (formData) => {
  console.log(formData);
  return async function (dispatch) {
    await instance
      .post("/api/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      // await axios
      //   .post(`http://localhost:5002/reviews`, formData)
      .then((response) => {
        if (response.data.staus === "true") {
          dispatch(reviewCreate(response.data));
          // window.location.replace('/');
        } else if (response.data.staus === "false") {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        // window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

export const loadReviewDetailDB = (id) => {
  console.log(id);
  return async function (dispatch) {
    await instance
      .get(`/api/reviews/${id}`)
      // await axios.get(`http://localhost:5002/reviewdetail`)
      .then((response) => {
        // console.log(response.data);
        dispatch(reviewDetailLoad(response.data));
      });
  };
};

//redux toolkit
export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    infos: [],
    image: "",
    list: [],
  },
  reducers: {
    reviewCreate(state, action) {
      console.log(action.payload);
      state.infos.push(action.payload);
    },
    reviewImgCreate(state, action) {
      console.log(action.payload);
      // state.image.push(action.payload);
      state.image = action.payload;
      console.log(state.image);
    },
    reviewImgDelete(state, action) {
      state.image = action.payload;
    },
    reviewDetailLoad(state, action) {
      state.list = action.payload;
    },
  },
});

export const actionCreators = { createReviewDB, loadReviewDetailDB };
export const {
  reviewCreate,
  reviewImgCreate,
  reviewImgDelete,
  reviewDetailLoad,
} = reviewSlice.actions;
export default reviewSlice.reducer;
