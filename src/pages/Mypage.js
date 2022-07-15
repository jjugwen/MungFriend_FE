import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
//컴포넌트
import MyPageComponent from "../components/MyPageComponent";
import MyPostList from "../components/MyPostList";
import MyReviewList from "../components/MyReviewList";
import { loadMyPageAX } from "../redux/modules/myPageSlice";
import { userinfoDB } from "../redux/modules/userInfoSlice";

const Mypage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadMyPageAX());
    //유저정보 불러오기
    dispatch(userinfoDB());
  }, []);

  //사용자 정보 불러오기
  const user = useSelector((state) => state.userinfoSlice);
  console.log(user);

  let [change, setChange] = useState(<MyPageComponent />);
  const [currentClick, setCurrentClick] = useState(null);
  const [prevClick, setPrevClick] = useState(null);

  React.useEffect((e)=>{
    if(currentClick !== null){
      let current = document.getElementById(currentClick);
      current.style.color ="white";
      current.style.background= "#FA5A30";
      current.style.boxShadow = "4px 4px 20px rgba(250, 90, 48, 0.2)";
    }
    if (prevClick !== null) {
      let prev = document.getElementById(prevClick);
      prev.style.color ="black";
      prev.style.background= " transparent";
      prev.style.boxShadow="none"
    }
    setPrevClick(currentClick);
  },[currentClick]);
  
const getClick = (e)=>{
    const id = e.target.id
    setCurrentClick(id)
    if(id ==="1"){
      setChange(<MyPageComponent/>)
    }else if(id ==="2"){
      setChange(<MyPostList/>)
    }else{
      setChange(<MyReviewList/>)
    }
  }

 //헤더 모달창 컴포넌트 연결
  let [value, setValue] = useState("");
  value = new URL(window.location.href).searchParams.get("value");
  window.addEventListener("click", getValue);
  function getValue() {
    setValue(new URL(window.location.href).searchParams.get("value"));
  }

  React.useEffect(() => {
    if (value === "mypage") {
      setChange(<MyPageComponent />);
    }
    if (value === "mypost") {
      setChange(<MyPostList />);
    }
    if (value === "myreview") {
      setChange(<MyReviewList />);
    }
  }, [value]);
  
  return (
    <Container>
      <ListBar>
        <button id="1" onClick={getClick}>
          마이페이지
        </button>
        <button id="2" onClick={getClick}>
          작성한 게시글
        </button>
        <button id="3" onClick={getClick}>
          후기 리스트
        </button>
      </ListBar>
      {change}
      <PageBox></PageBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 100px;
  width: 60%;
  margin: 100px auto auto auto;
`;

const ListBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 52px;
  margin: 50px;
  box-sizing: border-box;
  flex-shrink: 0;
  button {
     font-size: 16px;
  font-weight: 600;
    border: none;
    background-color: transparent;
    border-radius: 8px;
    padding: 10px;
  }
`;

const PageBox = styled.div``;

export default Mypage;
