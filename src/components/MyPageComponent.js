import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  patchIntroduceAX,
  patchPhoneNumAX,
} from "../redux/modules/myPageSlice";
import { useNavigate } from "react-router-dom";
import DogList from "./DogList";
import DogPlusModal from '../components/DogPlusModal';
import ProfileUpdate from "./ProfileUpdate";

function MyPageComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const info = useSelector((state) => state.myPageSlice.mypage);
  // const info = useSelector((state) => state);
  console.log(info);
  // 자기소개가 없다면 등록하기 버튼이 나오도록 해보기
  const introduce = info?.introduce;
  // console.log(introduce)
  // 자기소개 입력
  const intro_ref = useRef(null);

  const Enter = (e) => {
    if (e.key === "Enter") {
      const new_introduce = {
        introduce: intro_ref.current.value,
      };
      dispatch(patchIntroduceAX(new_introduce));
      //  console.log(new_introduce)
    }
  };
  // 휴대폰번호 (숫자와 하이픈만 허용, 자동으로 하이픈 넣기)
  const phone_ref = useRef(null);
  const phoneNum = info?.phoneNum;
  // console.log(phoneNum)
  //숫자와 하이픈만 허용
  const [inputValue, setInputValue] = useState();
  const phoneNumTest = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  //자동으로 하이픈 넣기
  useEffect(() => {
    if (inputValue?.length === 11) {
      setInputValue(
        inputValue
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [inputValue]);
  //핸드폰 번호 등록
  const patchPhoneNum = () => {
    const new_phone_num = {
      phoneNum: phone_ref.current.value,
    };
    dispatch(patchPhoneNumAX(new_phone_num));
  };
  const [mungModal, setMungModal] = useState();
  const [profileModal, setProfileModal] = useState();
  return (
    <Container>
      {mungModal && <Test />}
      {mungModal && <DogPlusModal setMungModal={setMungModal} modal ={mungModal}/>}
      {profileModal && <Test/>}
      {profileModal && <ProfileUpdate setProfileModal={setProfileModal} modal ={profileModal}/>}
      <RowBox>
        <Profileimg src={info?.dogProfileImgUrl} alt="" />
        <div>
          <div>
            <b>{info?.nickname}</b>님 반갑습니다!
          </div>
          <div>
            {info?.email}
          </div>
        </div>
        <UpdateButton
          onClick={() => {
            setProfileModal(!profileModal)
          }}
        >
          임시 프로필 수정
        </UpdateButton>
      </RowBox>
      {/* 휴대폰 번호
      {phoneNum === "" ? (
        <>
          <input
            type="text"
            value={inputValue || ""}
            onChange={phoneNumTest}
            ref={phone_ref}
            placeholder="번호를 입력해 주세요"
          />
          <button onClick={patchPhoneNum}>핸드폰 번호 등록하기</button>
        </>
      ) : (
        <div>{phoneNum}</div>
      )} */}
      {/*자기소개*/}
      {/* {introduce === "" ? (
        <input onKeyUp={Enter} ref={intro_ref} placeholder='자기소개 등록하기'/>
      ) : ( */}
      <IntroduceDiv>{introduce}</IntroduceDiv>
      {/* )} */}
      <br />
      <DogList setMungModal={setMungModal} modal ={mungModal}/>
    </Container>
  );
}

const Container = styled.div`
width: 100%;
`;
const Profileimg = styled.img`
  width: 60px;
  height: 60px;
  padding: 5px;
  border-radius: 50%;
`;

const IntroduceDiv = styled.div`
  background-color: #f5f5f5;
  height: 160px;
  padding: 15px;
  border-radius: 12px;
`;

const RowBox=styled.div`
display: flex;
flex-direction: row;
`

const UpdateButton = styled.button`
  position: absolute;
  right: 5%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 150px;
  height: 40px;
  font-size: 14px;
`;

const Test = styled.div`
 position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;
export default MyPageComponent;
