import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GiverReview from "../components/GiverReview";
import MyApplyPost from "../components/MyApplyPost";
//컴포넌트
import MyPageComponent from "../components/MyPageComponent";
import MyPostList from "../components/MyPostList";
import MyReviewList from "../components/MyReviewList";
import instance from "../redux/modules/instance";
import { loadMyPageAX } from "../redux/modules/myPageSlice";
import { userinfoDB } from "../redux/modules/userInfoSlice";

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
  const pageRef = useRef();
  const takerReviewRef = useRef();
  const mypostRef = useRef();
  const myapplypostRef = useRef();
  const giverReviewRef = useRef();
// console.log(change.type.name)
  const getClick = (e) => {
    const id = e.target.id;
    if (id === "1") {
      setChange(<MyPageComponent />);
      pageRef.current.style = `color :white; 
        background :#FA5A30; 
        boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2)`;
      mypostRef.current.style = "";
      myapplypostRef.current.style = "";
      takerReviewRef.current.style = "";
      giverReviewRef.current.style = "";
    } else if (id === "2") {
      setChange(<MyPostList />);
      pageRef.current.style = "";
      mypostRef.current.style = `color :white; 
        background :#FA5A30; 
        boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
      myapplypostRef.current.style = "";
      takerReviewRef.current.style = "";
      giverReviewRef.current.style = "";
    }  else if (id === "3") {
      setChange(<MyApplyPost />);
      pageRef.current.style = "";
      mypostRef.current.style = "";
      takerReviewRef.current.style = "";
      myapplypostRef.current.style = `color :white; 
      background :#FA5A30; 
      boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
      giverReviewRef.current.style = "";
    } else if (id === "4") {
      setChange(<MyReviewList />);
      pageRef.current.style = "";
      mypostRef.current.style = "";
      myapplypostRef.current.style = "";
      takerReviewRef.current.style = `color :white; 
        background :#FA5A30; 
        boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
      giverReviewRef.current.style = "";
    }else {
      setChange(<GiverReview />);
      pageRef.current.style = "";
      mypostRef.current.style = "";
      myapplypostRef.current.style = ""
      takerReviewRef.current.style = "";
      giverReviewRef.current.style = `color :white; 
      background :#FA5A30; 
      boxShadow :4px 4px 20px rgba(250, 90, 48, 0.2);`;
    }
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
        <button id="2" onClick={getClick} ref={mypostRef}>
           작성한 게시글
        </button>
        <button id="3" onClick={getClick} ref={myapplypostRef}>
           신청한 게시글
        </button>
        <button id="4" onClick={getClick} ref={takerReviewRef}>
           받은 후기
        </button>

        <button id="5" onClick={getClick} ref={giverReviewRef}>
           작성한 후기
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
  width: 70%;
  height: 100%;
  margin: 100px auto;
  @media screen and (max-width: 960px) {
    width: 90%;
  }
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
