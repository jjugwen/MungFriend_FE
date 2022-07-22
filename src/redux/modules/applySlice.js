import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

//axios
export const createApplyDB = (data) => {
  return async function (dispatch) {
    try {
      const response = await instance.post(`/api/applies/${data.id}`, {
        comment: data.comment,
      });
      if (response.data.staus === "true") {
        dispatch(applyCreate(response.data));
      } else if (response.data.staus === "false") {
        console.log(response.data.status, response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteApplyDB = (id) => {
  return async function (dispatch) {
    try {
      const response = await instance.delete(`/api/applies/${id}`);
      if (response.data.status === "true") {
        dispatch(applyDelete(response.data));
      } else if (response.data.staus === "false") {
        console.log(response.data.status, response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
