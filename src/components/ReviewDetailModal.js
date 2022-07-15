import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as Actions } from "../redux/modules/reviewSlice";

// style
import styled from "styled-components";
import Button from "../elements/Button";
import closeBtn from "../assets/images/Mypage/reviewDetailModal_closeBtn.svg";

function ReviewDetailModal(props) {
  const { open, close } = props;
  // const dispatch = useDispatch();

  //이미지 슬라이더
  const [slide, setSlide] = useState(1);
  const moveDot = (index) => {
    setSlide(index);
  };

  const reviewDetail = useSelector((state) => state.reviewSlice.list);
  // console.log(reviewDetail);

  return (
    <>
      {/* <div className="openModalcss"> */}
      <div className={open ? "openModalcss" : null}>
        {open ? (
          <div className="modal" style={{ height: "750px", padding: "0.7%" }}>
            <div className="revieweDetailTitle">
              <ModalTitle style={{ textAlign: "center" }}>후기상세</ModalTitle>
              <button
                onClick={() => {
                  close();
                }}
                style={{
                  background: "transparent",
                  border: "none",
                }}
              >
                <img src={closeBtn} alt="closeBtn" />
              </button>
            </div>
            return (
            <>
              <div key={reviewDetail.giverNickname} className="reviewerInfo">
                <div
                  className="MungProfileImgCircle"
                  style={{
                    backgroundImage: `url(${reviewDetail.giverDogProfileImgUrl})`,
                  }}
                />
                <div className="NickAndDistanceAndDate">
                  <span className="nicknameText">
                    {reviewDetail.giverNickname}
                  </span>
                  <span className="writeTimeText">
                    {reviewDetail.createdAt?.slice(0, 10).replace(/\-/g, ".")}
                  </span>
                </div>
              </div>
              <HrBlack />
              <div className="imgBox">
                {reviewDetail.reviewImgList?.map((image, index) => {
                  return (
                    <>
                      <div
                        key={image.id}
                        className={
                          slide === index + 1 ? "slide active-anim" : "slide"
                        }
                      >
                        <img src={image} alt="reviewImages" />
                      </div>
                      <div className="containerDots">
                        {Array.from({
                          length: reviewDetail.reviewImgList.length,
                        }).map((item, index) => (
                          <div
                            key={index}
                            onClick={() => moveDot(index + 1)}
                            className={
                              slide === index + 1 ? "dot active" : "dot"
                            }
                          ></div>
                        ))}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="reviewTextBox">{reviewDetail.comment}</div>
              <Hr />
              <Button
                orange_large
                className="close"
                _onClick={() => {
                  close();
                }}
                position="absolute"
                bottom="19px"
              >
                확인
              </Button>
            </>
            );
          </div>
        ) : null}
      </div>
      {/* </div> */}
    </>
  );
}

const ModalTitle = styled.h1`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  color: #121212;
`;

const HrBlack = styled.hr`
  width: 85%;
  background-color: black;
  border: none;
  height: 2px;
  position: absolute;
  top: 130px;
`;

const Hr = styled.hr`
  width: 85%;
  border: 1px solid #e5e5e5;
  position: absolute;
  bottom: 75px;
`;
export default ReviewDetailModal;
