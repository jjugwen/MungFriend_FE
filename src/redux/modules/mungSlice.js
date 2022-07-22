import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";


//axios
//나중에 멤버 아이디값 받아와서 넘겨주기

//멍친구 등록은 formData 이기 때문에 리덕스 사용해서 load하면 오류가 난다.
export const createMungAX = (mung) => {
  return async function (dispatch) {
    console.log(mung)
    // for (const value of mung) console.log(value);
   try{
     const res = await instance.post(`/api/dogs`, mung);
      // await axios
      // .post(`http://localhost:5001/dogList`, mung);
      dispatch(loadMyMungAX())
      alert(res.data.message)
      window.location.reload('/mypage');
      } 
     catch(err){
     console.log(err)
     
     }
  }
  
  ;
};
export const loadMyMungAX = () => {
  return async function (dispatch) {
   try{ 
   const res = await instance
      .get(`/api/dogs`)
      // await axios
      // .get(`http://localhost:5001/dogList`)
       dispatch(loadMyMung(res.data));
   }catch(err){
    console.log(err)
   }
  };
};

export const deleteMyMungAX = (id) => {
  return async function (dispatch) {
    await instance
      .delete(`/api/dogs/${id}`)
      // await axios
      // .delete(`http://localhost:5001/dogList/${id}`)
      .then(() => dispatch(deleteMyMung(id)));
      // 삭제리듀서는 mypageSlice에
    // dispatch(deleteMyMung(id))
  };
};
//툴킷
const mungSlice = createSlice({
  name: "mung",
  initialState: { mung: [] },
  reducers: {
  
    loadMyMung(state, action) {
      state.mung = action.payload;
    },
    deleteMyMung(state, action) {
      // console.log(action.payload);
      state.mung  = state.mung.filter((element) => {
        if (element.id !== action.payload) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
});

export const {loadMyMung,deleteMyMung } = mungSlice.actions;
export default mungSlice.reducer;
