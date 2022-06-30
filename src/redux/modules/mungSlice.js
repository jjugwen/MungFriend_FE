import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

//미들웨어
//나중에 멤버 아이디값 받아와서 넘겨주기
export const createMungAX =(mung)=>{
  return async function(dispatch){
    await axios.post(`http://localhost:5001/mung`,mung)
    .then(() => dispatch(createMung(mung)))
}}

//툴킷
const mungSlice = createSlice({
  name: 'mung',
  initialState:{},
  reducers:{
    createMung(state,action){
      state.mung.push(action.payload)
    }
  }
})


export const {createMung} = mungSlice.actions
export default mungSlice.reducer


