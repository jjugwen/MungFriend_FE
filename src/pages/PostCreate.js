import axios from "axios";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import instance from "../redux/modules/instance";

function PostCreate() {
    const [dogList, setDogList] =useState(); 
    React.useEffect(()=>{
      instance.get(`/api/dogs`)
      // axios.get(`http://localhost:5001/dogList`)
      .then((res)=>{
        setDogList(res.data);
      });
    },[]);
    console.log(dogList)

    const dateRef =useRef();
    const time={
      hour:[...Array(24).keys()].map((key)=> key + 1),
      minute:[...Array(60).keys()].map((key)=>key + 1)
    }
    
   
  return (
  <>
  <div>
    <div>게시글 작성</div>
    <div>멍 프로필 선택</div>
    <div>다중선택 가능합니다</div>
    <button>추가하기</button>
  </div>
  <div className="row-box">
    {dogList?.map((dog,index)=>{
      return(
        <Listbox key={index}>
            <CheckBox>
              <label htmlFor="check2">
                <input
                  className="checkbox2"
                  type="radio"
                  name="isRepresentativ"
                />
              </label>
            </CheckBox>
            <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
            <div>
              <div className="font-18">
                {dog.name} {dog.gender === "여" ? "♀" : "♂"}
              </div>
              <div className="font-16">{dog.size}견</div>
            </div>
          </Listbox>
      )
      })}
    </div>
  <div>요청일자 및 시간</div>
  
  <div>날짜선택</div>
  <input type="date" ref={dateRef}/>
  <div>시작시간</div>
  <select>
    {time.hour.map((hour,index)=>{
      return(
        <option key={index} value={hour}>
          {hour}
        </option>
      )
    })}
  </select>시
  <select>
    {time.minute.map((minute,index)=>{
      return(
        <option key={index} value={minute}>
          {minute}
        </option>
      )
    })}
  </select>분
  <div>마감시간</div>
  <select>
    {time.hour.map((hour,index)=>{
      return(
        <option key={index} value={hour}>
          {hour}
        </option>
      )
    })}
  </select>시
  <select>
    {time.minute.map((minute,index)=>{
      return(
        <option key={index} value={minute}>
          {minute}
        </option>
      )
    })}
  </select>분
  <div>내용입력</div>
  <div>제목을 입력해주세요</div>
  <input placeholder="제목을 입력해 주세요"/>
  <hr/>
  <div>내용을 입력해주세요</div>
  <textarea placeholder="내용을 입력해 주세요"/>
  </>
)}

const DogImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const Listbox = styled.div`
  width: 330px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    border: 1px solid black;
  }
  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
`;

const CheckBox = styled.div`
  .checkbox2 {
    margin: 18px;
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50px;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #cccccc;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: black;
    }
  }`

export default PostCreate;
