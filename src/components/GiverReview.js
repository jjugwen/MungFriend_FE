import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReviewDetailModal from "./ReviewDetailModal";
import { actionCreators as reviewActions } from "../redux/modules/reviewSlice";

function GiverReview() {
  const dispatch = useDispatch();
  //모달창 여닫기
  // const [reviewModal, setReviewModal] = useState(false);
  // const openReviewModal = () => {
  //   setReviewModal(true);
  // };
  // const closeReviewModal = () => {
  //   setReviewModal(false);
  // };

  const info = useSelector((state) => state.myPageSlice.mypage);
  // console.log(info?.giverReviewList);

  return (
    <>
      <ReviewList className="column-box">
        <div className="title">내가 작성한 후기</div>
        <div className="count">
          총<div className="orange-color">{info?.giverReviewList.length}</div>건
        </div>
        <div className="row-box">
          {info?.giverReviewList.map((review, i) => {
            return (
              <ReviewBox key={i}>
               
                 
                  <div className="row-box">
                    <GiverImg src={review.giverDogProfileImgUrl} alt="" />
                    <div className="name-box">
                      <div>{review.giverNickname}</div>
                      <div>{review.createdAt.split("T")[0]}</div>
                    </div>
                  </div>
                  <div className="review-box">{review.comment}</div>
           
                {/* <ReviewDetailModal
                  open={reviewModal}
                  close={closeReviewModal}
                /> */}
              </ReviewBox>
            );
          })}
        </div>
      </ReviewList>
    </>
  );
}

const ReviewList = styled.div`
  width: 90%;
  gap: 4%;
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
  margin-bottom: 100px;
`;
const ReviewBox = styled.div`
  width: 48%;
  height: 216px;
  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
  padding: 10px;
  box-sizing: border-box;
  .name-box {
    margin-left: 10px;
  }
  .review-box {
    margin-top: 10px;
  }
`;
const GiverImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
export default GiverReview;
