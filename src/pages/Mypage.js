import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import GiverReview from "../components/GiverReview";
import MyApplyPost from "../components/MyApplyPost";
//컴포넌트
import MyPageComponent from "../components/MyPageComponent";
import MyPostList from "../components/MyPostList";
import MyReviewList from "../components/MyReviewList";
import instance from "../shared/API/instance";
import { loadMyPageAX } from "../redux/modules/myPageSlice";

const Mypage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadMyPageAX(user));
  }, []);

  //사용자 정보 불러오기
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    instance.get(`/myinfo`).then((res) => {
      setUser(res.data.id);
    });
  }, []);
  let [change, setChange] = useState(<MyPageComponent />);
  const [id, setId] = useState("1");
  const pageRef = useRef();

  const [post, setPost] = useState(false);
  const allPostRef = useRef();

  const [review, setReview] = useState(false);
  const allReviewRef = useRef();

  React.useEffect(() => {
    if (id === "1") {
      setChange(<MyPageComponent />);
      setPost(false);
      setReview(false);
      pageRef.current.style = `color :white; 
        background :#FA5A30; 
        boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2)`;
      allPostRef.current.style = "";
      allReviewRef.current.style = "";
    } else if (id === "2") {
      setChange(<MyPostList />);
      setPost(true);
      setReview(false);
      pageRef.current.style = "";
      allPostRef.current.style = `color :white; 
        background :#FA5A30; 
        boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
      allReviewRef.current.style = "";
    } else if (id === "3") {
      setChange(<MyApplyPost />);
      setPost(true);
      setReview(false);
      pageRef.current.style = "";
      allPostRef.current.style = `color :white; 
      background :#FA5A30; 
      boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
      allReviewRef.current.style = "";
    } else if (id === "4") {
      setChange(<MyReviewList />);
      setPost(false);
      setReview(true);
      pageRef.current.style = "";
      allPostRef.current.style = "";
      allReviewRef.current.style = `color :white; 
        background :#FA5A30; 
        boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
    } else {
      setChange(<GiverReview />);
      setPost(false);
      setReview(true);
      pageRef.current.style = "";
      allPostRef.current.style = "";
      allReviewRef.current.style = `color :white; 
      background :#FA5A30; 
      boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
    }
  }, [id]);

  // console.log(firstStyle)
  const getClick = (e) => {
    setId(e.target.id);
  };

  //헤더 모달창 컴포넌트 연결
  let [value, setValue] = useState("");
  value = new URL(window.location.href).searchParams.get("value");
  // window.addEventListener("click", getValue);
  // function getValue() {
  //   setValue(new URL(window.location.href).searchParams.get("value"));
  // }

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
        <button id="1" onClick={getClick} ref={pageRef}>
          마이페이지
        </button>
        <button id="2" onClick={getClick} ref={allPostRef}>
          내 게시글
        </button>
        {post && (
          <>
            <SubBtn
              id="2"
              onClick={getClick}
              style={id === "2" ? { color: "#FA5A30" } : {}}
            >
              작성한 게시글
            </SubBtn>
            <SubBtn
              id="3"
              onClick={getClick}
              style={id === "3" ? { color: "#FA5A30" } : {}}
            >
              신청한 게시글
            </SubBtn>
          </>
        )}
        <button id="4" onClick={getClick} ref={allReviewRef}>
          후기
        </button>
        {review && (
          <>
            <SubBtn
              id="4"
              onClick={getClick}
              style={id === "4" ? { color: "#FA5A30" } : {}}
            >
              받은 후기
            </SubBtn>
            <SubBtn
              id="5"
              onClick={getClick}
              style={id === "5" ? { color: "#FA5A30" } : {}}
            >
              작성한 후기
            </SubBtn>
          </>
        )}
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
  width: 70%;
  height: 100%;
  margin: 100px auto;
  @media screen and (max-width: 960px) {
    width: 90%;
  }
`;
const SubBtn = styled.button`
  font-weight: 500;
  margin-left: 10px;
  font-size: 16px;
  color: #b8bbc0;
`;
const ListBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 52px;
  margin: 50px 50px 50px 0px;
  box-sizing: border-box;
  flex-shrink: 0;
  button {
    font-size: 16px;
    font-weight: 600;
    border: none;
    background-color: transparent;
    border-radius: 8px;
    padding: 10px;
    text-align: left;
  }
`;

const PageBox = styled.div``;

export default Mypage;
