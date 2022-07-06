import { createSlice } from "@reduxjs/toolkit";
// import instance from "./instance";
import axios from "axios";

//미들웨어
export const createApplyDB = (comment) => {
  return async function (dispatch) {
    await axios
      .post(`http://localhost:5002/applies/`, { comment: comment })
      .then((response) => {
        if (response.data.staus === "true") {
          // console.log(response.data);
          dispatch(applyCreate(response.data));
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

export const deleteApplyDB = (id) => {
  return async function (dispatch) {
    await axios
      .delete(`http://localhost:5002/applies/${id}`)
      .then((response) => {
        if (response.data.status === "true") {
          // console.log(response);
          dispatch(applyDelete(response.data));
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
export const applySlice = createSlice({
  name: "apply",
  initialState: { comment: "코멘트" },
  reducers: {
    applyCreate(state, action) {
      state.comment = action.payload;
    },
    applyDelete(state, action) {
      state.comment = action.payload;
    },
  },
});

export const actionCreators = { createApplyDB, deleteApplyDB };
export const { applyCreate, applyDelete } = applySlice.actions;
export default applySlice.reducer;
