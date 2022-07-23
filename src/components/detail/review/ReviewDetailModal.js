import React, { useState } from "react";
import { useSelector } from "react-redux";

// style
import styled from "styled-components";
import Button from "../../../elements/Button";
import closeBtn from "../../../assets/images/Mypage/reviewDetailModal_closeBtn.svg";
import defaultImg from "../../../assets/images/Chatting/img-dog-chat.png";
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
            <RevieweDetailTitle>
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
            </RevieweDetailTitle>
            <>
              <ReviewerInfo key={reviewDetail.giverNickname}>
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
              </ReviewerInfo>
              <HrBlack />
              <ImgBox>
                {reviewDetail.reviewImgList?.map((image, index) => {
                  return (
                    <>
                      <div
                        key={image.id}
                        className={
                          slide === index + 1 ? "slide active-anim" : "slide"
                        }
                      >
                        {/* <img
                          src={image ? { image } : { defaultImg }} //테스트해야함
                          alt="reviewImages"
                        /> */}
                        <img src={image} alt="reviewImages" />
                      </div>
                      <ContainerDots>
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
                      </ContainerDots>
                    </>
                  );
                })}
              </ImgBox>
              <ReviewTextBox>{reviewDetail.comment}</ReviewTextBox>
              <Hr />
              <Button
                width="214px"
                orange_large
                className="close"
                _onClick={() => {
                  setSlide(1);
                  setTimeout(() => {
                    close();
                  }, 100);
                }}
                position="absolute"
                bottom="19px"
              >
                확인
              </Button>
            </>
          </div>
        ) : null}
      </div>
      {/* </div> */}
    </>
  );
}

const ModalTitle = styled.h1`
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

/* 후기 상세 모달창 ReviewDetailModal CSS */
const RevieweDetailTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 330px;
  margin-left: 230px;
  position: absolute;
  top: 20px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  min-width: 180px;
  /* gap: 2%; */
  gap: 12px;
  position: absolute;
  top: 80px;
`;

const ImgBox = styled.div`
  display: flex;
  width: 560px;
`;

const ContainerDots = styled.div`
  display: flex;
  position: absolute;
  bottom: 245px;
  left: 50%;
  transform: translateX(-50%);
`;

const ReviewTextBox = styled.div`
  width: 85%;
  position: absolute;
  bottom: 91px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
`;
export default ReviewDetailModal;
