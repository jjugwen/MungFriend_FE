import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { loadMyPageAX } from "../redux/modules/myPageSlice";

function MyReviewList() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);
  const info = useSelector((state) => state.myPageSlice.mypage);

  return (
    <>
      <ReviewList>
        {info?.reviewList.map((review, i) => {
          return (
            <div key={i}>
              <div>{review.writer}</div>
              <div>{review.comment}</div>
              <ReviewImg src={review.imagePath} alt="" />
            </div>
          );
        })}
      </ReviewList>
    </>
  );
}

const ReviewList = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewImg = styled.img`
  width: 200px;
  height: 200px;
`;
export default MyReviewList;
