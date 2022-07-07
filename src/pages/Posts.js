import React from "react";
import {useSelector,useDispatch} from 'react-redux';
import { loadMyMungAX } from "../redux/modules/mungSlice";

function Posts() {
const dispatch = useDispatch();  

React.useEffect(()=>{
dispatch(loadMyMungAX());
},[])

const myMung= useSelector((state)=> state.mungSlice)
console.log(myMung)
  return(
  <div></div>
  )
}

export default Posts;
