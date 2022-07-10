import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
//컴포넌트
import MyPageComponent from "../components/MyPageComponent";
import MyPostList from "../components/MyPostList";
import MyReviewList from "../components/MyReviewList";

const Mypage = () => {
  let [change, setChange] = useState(<MyPageComponent />);


  return (
    <Container>
      
      <ListBar>
        <button
          onClick={(e) => {
            setChange(<MyPageComponent />);
            }}>
          마이페이지
        </button>
        <button
          onClick={() => {setChange(<MyPostList />);}}>
          작성한 게시글
        </button>
        <button
          onClick={() => {setChange(<MyReviewList />);}}>
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
  margin-top: 100px;
  
`;

const ListBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 50vh;
  background-color: gold;
  button{
    border: none;
    background-color: transparent;
    padding: 10px;
  }
`;

const PageBox = styled.div``;

export default Mypage;
