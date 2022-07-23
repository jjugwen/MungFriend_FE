import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReviewDetailModal from "./detail/review/ReviewDetailModal";
import { actionCreators as reviewActions } from "../redux/modules/reviewSlice";

function MyReviewList() {
  const dispatch = useDispatch();
  //모달창 여닫기
  const [reviewModal, setReviewModal] = useState(false);
  const openReviewModal = () => {
    setReviewModal(true);
  };
  const closeReviewModal = () => {
    setReviewModal(false);
  };

  const info = useSelector((state) => state.myPageSlice.mypage);
  console.log(info?.takerReviewList);

  return (
    <>
      <ReviewList className="column-box">
        <div className="title">내가 받은 후기</div>
        <div className="count">
          총<div className="orange-color">{info?.takerReviewList.length}</div>건
        </div>
        <GridBox>
          {info?.takerReviewList.map((review, i) => {
            return (
              <ReviewBox key={i}>
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() => {
                    dispatch(reviewActions.loadReviewDetailDB(review.id));
                    setTimeout(() => {
                      openReviewModal();
                    }, 500);
                  }}
                >
                  <div className="row-box">
                    <GiverImg src={review.giverDogProfileImgUrl} alt="" />
                    <div className="name-box">
                      <div>{review.giverNickname}</div>
                      <div>{review.createdAt.split("T")[0]}</div>
                    </div>
                  </div>
                  <div className="review-box">{review.comment}</div>
                </button>
                <ReviewDetailModal
                  open={reviewModal}
                  close={closeReviewModal}
                />
              </ReviewBox>
            );
          })}
        </GridBox>
      </ReviewList>
    </>
  );
}

const ReviewList = styled.div`
  width: 90%;
  margin-bottom: 100px;
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
`;
const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2%;
`;
const ReviewBox = styled.div`
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
  button {
    font-size: 16px;
  }
`;
const GiverImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
export default MyReviewList;
