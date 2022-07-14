import React from "react";
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
    <>
      <PostList>
        {info?.myPostList.map((mypost, i) => {
          return (
            <div key={i}>
              <div>{mypost.title}</div>
              <div>{mypost.modifiedAt}</div>
            </div>
          );
        })}
      </PostList>
    </>
  );
}

const PostList = styled.div`
  display: flex;
  flex-direction: row;
`;

export default MyPostList;
