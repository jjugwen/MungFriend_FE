import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../redux/modules/instance";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import {useNavigate} from 'react-router-dom';
import { createPostAX, updatePostAX } from "../redux/modules/postSlice";

const c = [];
function PostCreate() {
  const params = useParams();
  // console.log(params.id);
  //id값으로 게시글 판별
  const isNew = params.id === undefined;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadMyMungAX());
  }, []);

  const dogList = useSelector((state) => state.mungSlice.mung);
  // console.log(dogList)
  const [updatePost, setUpdatePost] = useState(null);
  const dateRef = useRef();
  const time = {
    hour: [...Array(24).keys()].map((key) => key + 1),
    minute: [...Array(60).keys()].map((key) => key),
  };
  //입력창 정보
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const startHourRef = useRef(null);
  const startMinuteRef = useRef(null);
  const endHourRef = useRef(null);
  const endMinuteRef = useRef(null);
  //작성버튼
  const click = () => {
    let startHour = startHourRef.current.value;
    if (startHour.length === 1) {
      startHour = 0 + startHour;
    }
    let startMinute = startMinuteRef.current.value;
    if (startMinute.length === 1) {
      startMinute = 0 + startMinute;
    }
    let endHour = endHourRef.current.value;
    if (endHour.length === 1) {
      endHour = 0 + endHour;
    }
    let endMinute = endMinuteRef.current.value;
    if (endMinute.length === 1) {
      endMinute = 0 + endMinute;
    }
    const post = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      dogIdList: c,
      requestStartDate:
        dateRef.current.value + "T" + startHour + ":" + startMinute,
      requestEndDate: dateRef.current.value + "T" + endHour + ":" + endMinute,
    };
    // console.log(post);
    dispatch(createPostAX(post));
    navigate(`/posts`)
  };
  //수정버튼
  const updateClick = () => {
    let startHour = startHourRef.current.value;
    if (startHour.length === 1) {
      startHour = 0 + startHour;
    }
    let startMinute = startMinuteRef.current.value;
    if (startMinute.length === 1) {
      startMinute = 0 + startMinute;
    }
    let endHour = endHourRef.current.value;
    if (endHour.length === 1) {
      endHour = 0 + endHour;
    }
    let endMinute = endMinuteRef.current.value;
    if (endMinute.length === 1) {
      endMinute = 0 + endMinute;
    }
    const updatePost = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      dogIdList: c,
      requestStartDate:
        dateRef.current.value + "T" + startHour + ":" + startMinute,
      requestEndDate: dateRef.current.value + "T" + endHour + ":" + endMinute,
    };
    instance
      .put(`/api/posts/${params.id}`, updatePost)
      .then((response) => {
        console.log(response);
        navigate(`/posts`)
      })
      .catch((error) => {
        alert(error);
      });
  };
  // const [c, setC] = useState([]);
  // const [b,setB] = useState(0);
  const a = (e) => {
    // setB(e.target.value)

    let index = c.indexOf(Number(e.target.value));
    if (c.includes(Number(e.target.value)) === true) {
      c.splice(index, 1);
    } else {
      c.push(Number(e.target.value));
    }
    // console.log(e.target.value);
    console.log(c);
  };

  //수정하기
  React.useEffect(() => {
    if (!isNew) {
      instance.get(`/api/posts/${params.id}`).then((res)=>{
      // axios.get(`http://localhost:5001/detail/${params.id}`).then((res) => {
        setUpdatePost(res.data);
      });
    }
  }, []);
  // console.log(updatePost)
  return (
    <Container>
      <div>
        <div className="title">게시글 작성</div>
        <div className="row-box">
        <div className="sub-title">멍 프로필 선택</div>
        <div className="select-text">* 다중선택 가능합니다.</div>
        </div>
      </div>
      <div className="row-box">
        {dogList?.map((dog, index) => {
          return (
            <Listbox key={index}>
              <CheckBox>
                <label htmlFor="check2">
                  <input
                    className="checkbox2"
                    type="checkbox"
                    value={dog.id}
                    onClick={a}
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
          );
        })}
      </div>
      <div className="sub-title">신청날짜</div>
      <div className="row-box">
      <input type="date" ref={dateRef} className="date-input"/>
      <select ref={startHourRef}>
      <option>시간</option>
        {time.hour.map((hour, index) => {
          return (
            <option key={index} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      
      <select ref={startMinuteRef}>
      <option>분</option>
        {time.minute.map((minute, index) => {
          return (
            <option key={index} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
      <div className="font-20">~</div>
      <select ref={endHourRef}>
        <option>시간</option>
        {time.hour.map((hour, index) => {
          return (
            <option key={index} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      
      <select ref={endMinuteRef}>
      <option>분</option>
        {time.minute.map((minute, index) => {
          return (
            <option key={index} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
      
      </div>
      
      <div className="sub-title">내용입력</div>
     <hr />
     <div className="column-box">
      <input
        className="input-box"
        placeholder="제목을 입력해 주세요"
        ref={titleRef}
        defaultValue={updatePost ? updatePost.title : ""}
      />
      
      <textarea
      className="input-box"
        placeholder="내용을 입력해 주세요"
        ref={contentRef}
        defaultValue={updatePost ? updatePost.content : ""}
      />
      </div>
     
      <ButtonBox>
      <button onClick={()=>{
        navigate('/posts')
      }}>취소</button>
      {isNew ? (
        <button className="orange" onClick={click}>등록</button>
      ) : (
        <button className="orange" onClick={updateClick}>수정</button>
      )}
      </ButtonBox>
    </Container>
  );
}
const Container=styled.div`
width: 70%;
margin: auto;
justify-content: center;
align-items: center;
.title{
  font-weight: 600;
  font-size: 30px;
  margin: 50px 0px;
}
.sub-title{
  font-weight: 600;
font-size: 20px;
}
.select-text{
  color: #7A7A80;
  font-size: 14px;
  padding-left: 8px;
}
select{
  width: 104px;
height: 48px;
font-size: 16px;
}
.date-input{
  width: 460px;
}
hr{
  border: 1px solid black;
}
.input-box{
  border: none;
  border-bottom: 1px solid #E3E5E9;
  font-family: 'Pretendard';
  font-weight: 400;
font-size: 16px;

}
textarea{
  border: none;
  border-bottom: 1px solid #E3E5E9;
  font-family: 'Pretendard';
  resize : none;
  height: 200px;
}
.font-20{
  font-size: 24px;
  font-weight: 600;
  padding-top: 10px;
}
`
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
    background-image: url("data:image/svg+xml,%3csvg   viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #cccccc;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: black;
    }
  }
`;

const ButtonBox =styled.div`
position: relative;
left: 25%;
align-items: center;
justify-content: center;
button{
  border-radius: 4px;
  font-weight: 500;
font-size: 16px;
  width: 180px;
margin: 10px;
height: 48px;
border: none;

}
.orange{
  background: #FA5A30;
  color: white;
}
`
export default PostCreate;
