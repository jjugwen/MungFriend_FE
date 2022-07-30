import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/API/instance";

//axios
export const loadMyPageAX = () => {
  return async function (dispatch) {
   try{
    const response = await instance.get(`/mypage`)
      dispatch(loadMyPage(response.data))
  } 
  catch(err){

  }
  };
};



//툴킷
const myPageSlice = createSlice({
  name: "mypage",
  initialState: {},
  reducers: {
    loadMyPage(state, action) {
      state.mypage = action.payload;
    }
  },
});

export const { loadMyPage } =
  myPageSlice.actions;
export default myPageSlice.reducer;
