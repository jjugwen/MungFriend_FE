import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// import axios from "axios";

//미들웨어
export const createApplyDB = (data) => {
  return async function (dispatch) {
    // await axios
    //   .post(`http://localhost:5002/applies`, {
    //     comment: data.comment,
    //   })
    await instance
      .post(`/api/applies/${data.id}`, {
        comment: data.comment,
      })
      .then((response) => {
        if (response.data.staus === "true") {
          dispatch(applyCreate(response.data));
        } else if (response.data.staus === "false") {
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
    await instance
      .delete(`/api/applies/${id}`)
      // await axios
      //   .delete(`http://localhost:5002/applies/${id}`)
      .then((response) => {
        if (response.data.status === "true") {
          dispatch(applyDelete(response.data));
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else if (response.data.staus === "false") {
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
  initialState: {
    list: [],
  },
  reducers: {
    applyCreate(state, action) {
      state.list.push(action.payload);
    },
    applyDelete(state, action) {
      const new_comment_list = state.list.filter(
        (v) => v.id !== action.payload.id
      );
      state.list = new_comment_list;
    },
  },
});

export const actionCreators = { createApplyDB, deleteApplyDB };
export const { applyCreate, applyDelete } = applySlice.actions;
export default applySlice.reducer;
