import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMungAX } from '../redux/modules/mungSlice';


function MungPlusModal (){
  const dispatch = useDispatch();
  //강아지 정보
  //age는 숫자로 받아와야 함
  const [puppy, setpuppy] =useState({});
  // 강아지 정보 input 입력값 넣어두기
  //나이는 숫자데이터 . if문 사용해서 숫자로 감싸주기 
  const handleChange = (prop) => (e) => {
    if(
      prop !== "age"
    ){setpuppy({ ...puppy, [prop]: e.target.value })}
    else{setpuppy({ ...puppy, [prop]: Number(e.target.value) })};
    console.log(puppy)
  };
  
  const signUp=()=>{
    dispatch(createMungAX(puppy))
  }
return(
  <>
  <div style={{fontFamily:"Pretendard"}}>멍친구 등록</div>
  <div>이미지 등록 부분</div>
  <div>이름</div>
  <input onChange={handleChange("name")}/>
  <div>성별</div>
  <select onChange={handleChange("gender")}>
    <option value='no'>성별을 선택해 주세요</option>
    <option value='남' >남</option>
    <option value='여' >여</option>
  </select>
  <div>나이</div>
  <input type='number' max='30' onChange={handleChange("age")}/>
  <div>사이즈</div>
  <select onChange={handleChange("size" )}>
    <option value='no'>크기를 선택해 주세요</option>
    <option value='소형'>소형</option>
    <option value='중형'>중형</option>
    <option value='대형'>대형</option>
  </select>
  <div>견종이나 유의사항 등 추가할 정보</div>
  <textarea onChange={handleChange("info")}/>
  <button type="submit" onClick={signUp}>
          등록하기
   </button>
  </>
)
}

export default MungPlusModal;