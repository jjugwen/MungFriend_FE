import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as Actions } from "../redux/modules/reviewSlice";

// style
import styled from "styled-components";
import Button from "../elements/Button";
import closeBtn from "../assets/images/Mypage/reviewDetailModal_closeBtn.svg";

function ReviewDetailModal(props) {
  const { open, close } = props;
  const dispatch = useDispatch();

  //   const [slide, setSlide] = useState();
  //   const nextImage = () => {
  //     setSlide("translateX(-100%)");
  //   };

  const reviewDetail = useSelector((state) => state.reviewSlice.list);
  console.log(reviewDetail);

  useEffect(() => {
    dispatch(Actions.loadReviewDetailDB());
  }, [dispatch]);
  return (
    <>
      <div className="openModalcss">
        {/* <div className={open ? "openModalcss" : null}> */}
        {/* {open ?  */}(
        <div className="modal" style={{ height: "750px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "200px",
              marginLeft: "200px",
            }}
          >
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
          {reviewDetail?.map((value) => {
            return (
              <>
                <div className="clickUsermodal">
                  <div
                    className="MungProfileImgCircle"
                    style={{
                      backgroundImage: `url(${value.giverDogProfileImgUrl})`,
                    }}
                  />
                  <div className="NickAndDistanceAndDate">
                    <span className="nicknameText">{value.giverNickname}</span>
                    <span className="writeTimeText">
                      {value.createdAt?.slice(0, 10).replace(/\-/g, ".")}
                    </span>
                  </div>
                </div>
                <hr
                  style={{
                    width: "90%",
                    backgroundColor: "black",
                    border: "none",
                    height: "3px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    overflow: "hidden",
                    width: "560px",
                  }}
                >
                  {value?.reviewImgList?.map((image) => {
                    return (
                      <>
                        <img
                          key={image.id}
                          src={image}
                          alt=""
                          style={{
                            width: "560px",
                            // transform: `onChange=${slide}`,
                          }}
                        />
                      </>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: "20%" }}>
                  {value?.reviewImgList?.map((v) => {
                    return (
                      <button
                        style={{
                          width: "25px",
                          height: "15px",
                          background: "#FA5A30",
                          border: "none",
                          borderRadius: "50%",
                          margin: "5% auto",
                        }}
                        onClick={() => {
                          //   nextImage();
                        }}
                      />
                    );
                  })}
                </div>
                {value.comment}
                <Hr />
                <Button
                  orange_large
                  className="close"
                  _onClick={() => {
                    close();
                  }}
                >
                  확인
                </Button>
              </>
            );
          })}
        </div>
        ){/* : null} */}
      </div>
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
const Hr = styled.hr`
  width: 90%;
  border: 1px solid #e5e5e5;
`;
export default ReviewDetailModal;
