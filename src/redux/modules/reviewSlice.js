import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import axios from "axios";

//미들웨어
export const createReviewDB = (data) => {
  console.log(data);
  return async function (dispatch) {
    await axios
      .post(`http://localhost:5002/reviews/${data.id}`, {
        comment: data.comment,
        images: data.images,
        applicantId: data.applicantId,
        postId: data.id,
      })
      .then((response) => {
        if (response.data.staus === "true") {
          dispatch(reviewCreate(response.data));
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
  initialState: { list: [] },
  reducers: {
    reviewCreate(state, action) {
      state.list = action.payload;
    },
  },
});

export const actionCreators = { createReviewDB };
export const { reviewCreate } = reviewSlice.actions;
export default reviewSlice.reducer;
