import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
//컴포넌트
import MyPageComponent from "../components/MyPageComponent";
import MyPostList from "../components/MyPostList";
import MyReviewList from "../components/MyReviewList";

const Mypage = () => {
  let [mypage, setMypage] = useState(true);
  let [postlist, setPostlist] = useState(false);
  let [myreview, setMyreview] = useState(false);

  return (
    <Container>
      <ListBar>
        <button
          onClick={() => {
            setMypage(true);
            setPostlist(false);
            setMyreview(false);
          }}
        >
          마이페이지
        </button>
        <button
          onClick={() => {
            setMypage(false);
            setPostlist(true);
            setMyreview(false);
          }}
        >
          작성한 게시글
        </button>
        <button
          onClick={() => {
            setMypage(false);
            setPostlist(false);
            setMyreview(true);
          }}
        >
          후기 리스트
        </button>
      </ListBar>
      <PageBox>
        {postlist && <MyPostList />}
        {mypage && <MyPageComponent />}
        {myreview && <MyReviewList />}
      </PageBox>
    </Container>
  );
};
const Container = styled.div`
display: flex;
flex-direction: row;
margin-top: 200px;
`;

const ListBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 50vh;
  /* background-color: gold; */
`;

const PageBox = styled.div``;

export default Mypage;
