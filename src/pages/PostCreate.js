import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../redux/modules/instance";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import {useNavigate} from 'react-router-dom';
import { createPostAX} from "../redux/modules/postSlice";

const c = [];
function PostCreate() {
  const params = useParams();
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
   //수정 게시글 데이터 가져오기
  React.useEffect(() => {
    if (!isNew) {
      // instance.get(`/api/posts/${params.id}`).then((res)=>{
      axios.get(`http://localhost:5002/detail/${params.id}`).then((res) => {
        setUpdatePost(res.data);
      });
    }
  }, []);

  let startHour = isNew ? "0" : Number(updatePost?.requestStartDate.split('T')[1].split(':')[0]);
   let startMinute = isNew ? "0" : Number(updatePost?.requestStartDate.split('T')[1].split(':')[1]);
   let endHour = isNew ? "0" : Number(updatePost?.requestEndDate.split('T')[1].split(':')[0]);
   let endMinute = isNew ? "0" : Number(updatePost?.requestEndDate.split('T')[1].split(':')[1]);

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
    console.log(updatePost);
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


  return (
    <Container>
      <div>
        <div >게시글 작성</div>
        <RowBox>
        <div>멍 프로필 선택</div>
        <div>* 다중선택 가능합니다.</div>
        </RowBox>
      </div>
      <RowBox>
        {dogList?.map((dog, index) => {
          return (
            <Listbox key={index}>
            <CheckBox
              onClick={a}
              defaultValue={dog.id}
              type="checkbox"
              name="isRepresentative"
            />
            <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
            <div>
              <RowBox>
                <TextBox16>
                  {dog.name}
                  {dog.gender === "여" ? (
                    <img src="https://ifh.cc/g/1DDK9D.png" alt="" />
                  ) : (
                    <img src="https://ifh.cc/g/WP9vdy.png" alt="" />
                  )}
                </TextBox16>
              </RowBox>
              <TextBox14>
                {dog.age}세, {dog.size}견
              </TextBox14>
            </div>
            </Listbox>
          );
        })}
      </RowBox>
      <div>신청날짜</div>
      <RowBox>
      <input type="date" ref={dateRef}  defaultValue={updatePost?.requestStartDate.split('T')[0]}/>
      {/*시작시간*/}
      {startHour && (
      <select ref={startHourRef} defaultValue={startHour}>
        <option value={0}>시간</option>
          {time.hour.map((hour, index) => {
            return (
              <option key={index} value={hour}>
                {hour}
              </option>
            );
          })}
      </select>
      )}
       {/*시작분*/}
       {startHour && (
      <select ref={startMinuteRef} defaultValue={startMinute}>
      <option value={0}>분</option>
        {time.minute.map((minute, index) => {
          return (
            <option key={index} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
      )}
      <div>~</div>
      {/*끝시간*/}
      { endHour && (<select ref={endHourRef} defaultValue={endHour}>
        <option value={0}>시간</option>
        {time.hour.map((hour, index) => {
          return (
            <option key={index} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      )}
      
      {/*끝분*/}
      {endMinute && (<select ref={endMinuteRef} defaultValue={endMinute}>
      <option value={0}>분</option>
        {time.minute.map((minute, index) => {
          return (
            <option key={index} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>)}
      
      
      </RowBox>
      
      <div>내용입력</div>
     <hr />
     <CoulmnBox >
      <input
        placeholder="제목을 입력해 주세요"
        ref={titleRef}
        defaultValue={updatePost ? updatePost.title : ""}
      />
      
      <textarea
        placeholder="내용을 입력해 주세요"
        ref={contentRef}
        defaultValue={updatePost ? updatePost.content : ""}
      />
      </CoulmnBox >
     
      <ButtonBox>
      <button onClick={()=>{
        navigate('/posts')
      }}>취소</button>
      {isNew ? (
        <button  onClick={click}>등록</button>
      ) : (
        <button  onClick={updateClick}>수정</button>
      )}
      </ButtonBox>
    </Container>
  );
}
const Container=styled.form`
width: 70%;
margin: auto;
justify-content: center;
align-items: center;

hr{
  border: 1px solid black;
}

textarea{
  border: none;
  border-bottom: 1px solid #E3E5E9;
  font-family: 'Pretendard';
  resize : none;
  height: 200px;
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
    border: 2px solid #FA5A30;
  }
  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
`;

const CheckBox = styled.input`
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
      background-color: #FA5A30;
    }
  
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const CoulmnBox= styled.div`
display: flex;
flex-direction: column;
`
const TextBox16 = styled.div`
  font-weight: 600;
  font-size: 16px;
  img {
    margin-left: 5px;
    width: 17px;
    height: 17px;
  }
`;

const TextBox14 = styled.div`
  font-size: 14px;
  color: #7a7a80;
  padding: 5px;
  margin-top: 5px;
`;

const ButtonBox =styled.div`
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

`
export default PostCreate;
