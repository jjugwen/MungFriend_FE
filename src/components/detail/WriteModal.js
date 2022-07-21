import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as applyActions } from "../../redux/modules/applySlice";
import { actionCreators as reviewActions } from "../../redux/modules/reviewSlice";
import "../../elements/modalStyle.css";
import ReviewImgUpload from "./review/ReviewImgUpload";
import Button from "../../elements/Button";
// import CountText from "../shared/CountText";

function WriteModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, children } = props;
  const applyText = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  const postId = Number(params.id);
  const image = useSelector((state) => state.reviewSlice.image);
  // console.log(image);
  const detailList = useSelector((state) => state.postDetailSlice.list);
  // console.log(detailList);
  // 데이터 formData로 보내기
  const addReview = async () => {
    const formData = new FormData();
    image.forEach((image) => formData.append("image", image));
    // console.log(image);
    const data = {
      postId: postId,
      applicantNickname: detailList?.matchedNickname,
      comment: applyText.current.value,
    };
    // console.log(data);
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("infos", blob);
    dispatch(reviewActions.createReviewDB(formData));
    // for (const value of formData) console.log(value);
  };

  //글자수세기

  return (
    <div className={open ? "openModalcss" : null}>
      {open ? (
        <div className="Reviewmodal">
          <ModalTitle>{children}</ModalTitle>
          <hr
            style={{
              width: "90%",
              backgroundColor: "black",
              border: "none",
              height: "3px",
            }}
          />
          {children === "후기작성" ? <ReviewImgUpload /> : null}
          {children === "후기작성" ? <Hr /> : null}
          <ModalInput
            type="text"
            placeholder="내용을 입력해주세요."
            ref={applyText}
          />
          <Hr />
          <div style={{ display: "flex", gap: "12px", padding: "40px" }}>
            <Button
              white_large
              className="close"
              _onClick={() => {
                close();
              }}
            >
              취소
            </Button>
            <Button
              width="214px"
              orange_large
              _onClick={(e) => {
                console.log(applyText.current.value);
                if (children === "신청하기") {
                  dispatch(
                    applyActions.createApplyDB({
                      comment: applyText.current.value,
                      id: postId,
                    })
                  );
                  setTimeout(() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 200);
                    close();
                  }, 400);
                }
                if (children === "후기작성") {
                  addReview();
                  setTimeout(() => {
                    close();
                  }, 300);
                }
              }}
            >
              확인
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const ModalInput = styled.textarea`
  width: 90%;
  height: 345px;
  border: none;
  vertical-align: top;
  text-align: left;
  padding: 3% 0%;
  outline: none;
`;

const ModalTitle = styled.h1`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
`;

const Hr = styled.hr`
  width: 90%;
  border: 1px solid #e5e5e5;
`;

export default WriteModal;
