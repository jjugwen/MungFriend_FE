import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { loadMyPageAX } from "../redux/modules/myPageSlice";

function MyPostList() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);
  const info = useSelector((state) => state.myPageSlice.mypage);

  return (
    <Container>
      <div className="title">작성한 게시글</div>
      <div className="count">
        총<div className="orange-color">{info?.myPostList.length}</div>건
      </div>
      <hr/>
      <PostList>
        {info?.myPostList.map((mypost, i) => {
          return (
            <div key={i} className="row-box">
              <div className="post-title">{mypost.title}</div>
              <div className="modified-at">
                {mypost.modifiedAt.split("T")[0]}
              </div>
            </div>
          );
        })}
      </PostList>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  hr{
    border: 1px solid black;
    background-color: black;
    margin-bottom: 0;
  }
  
  .title {
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 30px;
  }
  .count {     
    display: flex;
    font-weight: 500;
    .orange-color {
      color: #fa5a30;
    }
  }
`;

const PostList = styled.div`
  height: 327px;
  .row-box {
    border-bottom: 1px solid #E3E5E9;
    align-items: center;
    justify-content: space-between;
    height: 67px;
  }
  .post-title {
    font-weight: 500;
    font-size: 16px;
  }
  .modified-at {
    font-size: 14px;
    color: #7a7a80;
  }
`;

export default MyPostList;
