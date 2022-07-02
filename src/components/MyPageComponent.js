import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { loadMyPageAX, patchIntroduceAX, patchPhoneNumAX  } from "../redux/modules/myPageSlice";


function MyPageComponent() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);
  const info = useSelector((state) => state.myPageSlice.mypage);
  
  // console.log(info)
  // 자기소개가 없다면 등록하기 버튼이 나오도록 해보기
  const introduce = info?.introduce
  // console.log(introduce)
  // 자기소개 입력
  const intro_ref = useRef(null);

  const Enter = (e) =>{
    if(e.key==='Enter'){
      const new_introduce = {
        introduce: intro_ref.current.value
      }
      dispatch(patchIntroduceAX(new_introduce))
      //  console.log(new_introduce)
    }
  }
  // 휴대폰번호 (숫자와 하이픈만 허용, 자동으로 하이픈 넣기)
  const phone_ref =useRef(null);
  const phoneNum = info?.phoneNum
  // console.log(phoneNum) 
  //숫자와 하이픈만 허용
  const [inputValue, setInputValue] = useState();
  const phoneNumTest = (e)=> {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)){
      setInputValue(e.target.value);
    }
  }
  //자동으로 하이픈 넣기
  useEffect(()=>{
    if (inputValue?.length === 11){
      setInputValue(
        inputValue
        .replace(/-/g, '')
        .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  },[inputValue]);
  //핸드폰 번호 등록
  const patchPhoneNum =()=>{
    const new_phone_num = {
      phoneNum: phone_ref.current.value
    }
    dispatch(patchPhoneNumAX(new_phone_num))
  }

  return (
    <Container>
      <div>{info?.nickname}</div>
      <div>{info?.email}</div>
      {introduce === "" ? (
        <input onKeyUp={Enter} ref={intro_ref} placeholder='자기소개 등록하기'/>
      ) : (
        <div>{introduce}</div>
      )}
       {phoneNum === "" ? (
        <>
        <input type='text' value={inputValue || ""} onChange={phoneNumTest} ref={phone_ref} placeholder='번호를 입력해 주세요' />
        <button onClick={patchPhoneNum}>핸드폰 번호 등록하기</button>
        </>
      ) : (
        <div>{phoneNum}</div>
      )}

      <DogList>
        {info?.dogList.map((dog, i) => {
          return (
            <div key={i}>
              <div>{dog.name}</div>
              <div>{dog.gender}</div>
              <div>{dog.size}</div>
              <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
            </div>
          );
        })}
      </DogList>
    </Container>
  );
}
const Container = styled.div``;

const DogList = styled.div`
  display: flex;
  flex-direction: row;
`;

const DogImg = styled.img`
  width: 200px;
  height: 200px;
`;

export default MyPageComponent;
