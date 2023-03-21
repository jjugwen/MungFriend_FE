import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/API/instance";

//axios
export const createReviewDB = (formData) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("/api/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.staus === "true") {
        dispatch(reviewCreate(response.data));
        // window.location.replace('/');
      } else if (response.data.staus === "false") {
        // console.log(response.data.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };
};

export const loadReviewDetailDB = (id) => {
  // console.log(id);
  return async function (dispatch) {
    try {
      const response = await instance.get(`/api/reviews/${id}`);
      dispatch(reviewDetailLoad(response.data));
    } catch (error) {
      // console.log(error);
    }
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
      state.infos.push(action.payload);
    },
    reviewImgCreate(state, action) {
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
  reviewDetailLoad,
} = reviewSlice.actions;
export default reviewSlice.reducer;
