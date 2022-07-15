import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
//컴포넌트
import MyPageComponent from "../components/MyPageComponent";
import MyPostList from "../components/MyPostList";
import MyReviewList from "../components/MyReviewList";

const Mypage = () => {
  const [change, setChange] = useState(<MyPageComponent />);
  let [value, setValue] = useState("");
  value = new URL(window.location.href).searchParams.get("value");
  window.addEventListener("click", getValue);
  function getValue() {
    setValue(new URL(window.location.href).searchParams.get("value"));
  }

  useEffect(() => {
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
        <button
          onClick={(e) => {
            setChange(<MyPageComponent />);
          }}
        >
          마이페이지
        </button>
        <button
          onClick={() => {
            setChange(<MyPostList />);
          }}
        >
          작성한 게시글
        </button>
        <button
          onClick={() => {
            setChange(<MyReviewList />);
          }}
        >
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
  button {
    border: none;
    background-color: transparent;
    padding: 10px;
  }
`;

const PageBox = styled.div``;

export default Mypage;
