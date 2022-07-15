import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../redux/modules/instance";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import { getDetailDB } from "../redux/modules/postDetailSlice";
import { createPostAX, updatePostAX } from "../redux/modules/postSlice";

const c = [];
function PostCreate() {
  const params = useParams();
  // console.log(params.id);
  //id값으로 게시글 판별
  const isNew = params.id === undefined;

  const dispatch = useDispatch();

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
      dogidList: c,
      requestStartDate:
        dateRef.current.value + "T" + startHour + ":" + startMinute,
      requestEndDate: dateRef.current.value + "T" + endHour + ":" + endMinute,
    };
    // console.log(post);
    dispatch(createPostAX(post));
    //등록후 가야할 페이지 navigate해주기
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
      dogidList: c,
      requestStartDate:
        dateRef.current.value + "T" + startHour + ":" + startMinute,
      requestEndDate: dateRef.current.value + "T" + endHour + ":" + endMinute,
    };
    instance
      .put(`/api/posts/${params.id}`, updatePost)
      .then((response) => {
        console.log(response);
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
      axios.get(`http://localhost:5001/detail/${params.id}`).then((res) => {
        setUpdatePost(res.data);
      });
    }
  }, []);
  // console.log(updatePost)
  return (
    <>
      <div>
        <div>게시글 작성</div>
        <div>멍 프로필 선택</div>
        <div>다중선택 가능합니다</div>
        <button>추가하기</button>
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
      <div>요청일자 및 시간</div>
      <div>날짜선택</div>
      <input type="date" ref={dateRef} />
      <div>시작시간</div>
      <select ref={startHourRef}>
        {time.hour.map((hour, index) => {
          return (
            <option key={index} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      시
      <select ref={startMinuteRef}>
        {time.minute.map((minute, index) => {
          return (
            <option key={index} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
      분<div>마감시간</div>
      <select ref={endHourRef}>
        {time.hour.map((hour, index) => {
          return (
            <option key={index} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      시
      <select ref={endMinuteRef}>
        {time.minute.map((minute, index) => {
          return (
            <option key={index} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
      분<div>내용입력</div>
      <div>제목을 입력해주세요</div>
      <input
        placeholder="제목을 입력해 주세요"
        ref={titleRef}
        defaultValue={updatePost ? updatePost.title : ""}
      />
      <hr />
      <div>내용을 입력해주세요</div>
      <textarea
        placeholder="내용을 입력해 주세요"
        ref={contentRef}
        defaultValue={updatePost ? updatePost.content : ""}
      />
      {isNew ? (
        <button onClick={click}>등록</button>
      ) : (
        <button onClick={updateClick}>수정</button>
      )}
    </>
  );
}

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
  }
`;

export default PostCreate;
