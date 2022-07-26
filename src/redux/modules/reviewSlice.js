import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

//axios
export const createReviewDB = (formData) => {
  // console.log(formData);
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
      // console.log(action.payload);
      state.infos.push(action.payload);
    },
    reviewImgCreate(state, action) {
      // console.log(action.payload);
      // state.image.push(action.payload);
      state.image = action.payload;
      // console.log(state.image);
    },
    reviewImgDelete(state, action) {
      // console.log(action.payload);
      state.image -= action.payload;
      // console.log(state.image);
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
