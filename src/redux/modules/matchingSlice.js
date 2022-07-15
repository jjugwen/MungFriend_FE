// import { createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// import axios from "axios";

//axios
//create 매칭하기
export const createMatchingDB = (id, postId) => {
  return async function (dispatch) {
    // console.log(id);
    // await axios
    //   .post(`http://localhost:5002/match`, { id: id })
    await instance
      .post(`/api/match/${id}`, { postId: postId })
      .then((response) => {
        if (response.data.staus === "true") {
          console.log(response.data.status, response.data.message);
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

//delete - 매칭 취소
export const deleteMatchingDB = (postId) => {
  return async function (dispatch) {
    // await axios
    //   .delete(`http://localhost:5002/match/${id}`)
    await instance
      .post(`/api/match/cancel`, { postId: postId })
      .then((response) => {
        // console.log(response);
        console.log(response.data.status, response.data.message);
      })
      .catch((err) => {
        window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

//리덕스 toolkit
// export const matchingSlice = createSlice({
//   name: "match",
//   initialState: { id: "" },
//   reducers: {
//     matchCreate(state, action) {
//       console.log(action.payload);
//       state.id = action.payload;
//       console.log(state.id);
//     },
//   },
// });

// export const { matchCreate } = matchingSlice.actions;
export const actionCreators = { createMatchingDB, deleteMatchingDB };
// export default matchingSlice.reducer;
