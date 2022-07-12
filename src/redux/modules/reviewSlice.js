import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// import axios from "axios";

//미들웨어
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
        window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

//redux toolkit
export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    infos: [],
    image: "",
  },
  reducers: {
    reviewCreate(state, action) {
      console.log(action.payload);
      state.infos.push(action.payload);
    },
    reveiewImgCreate(state, action) {
      console.log(action.payload);
      // state.image.push(action.payload);
      state.image = action.payload;
      console.log(state.image);
    },
  },
});

export const actionCreators = { createReviewDB };
export const { reviewCreate, reveiewImgCreate, reviewImgDelete } =
  reviewSlice.actions;
export default reviewSlice.reducer;
