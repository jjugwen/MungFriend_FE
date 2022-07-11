import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as applyActions } from "../../redux/modules/applySlice";
import { actionCreators as reviewActions } from "../../redux/modules/reviewSlice";
import "../../elements/modalStyle.css";
import ReviewImgUpload from "./review/ReviewImgUpload";
import { reviewCreate } from "../../redux/modules/reviewSlice";

function WriteModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, children } = props;
  const applyText = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.id;
  const image = useSelector((state) => state.reviewSlice.image);
  // console.log(image);
  const detailListRoot = useSelector((state) => state.postDetailSlice.list);
  const detailList = detailListRoot[postId];
  // const list = useSelector((state) => state.reviewSlice.list);
  // console.log(list);
  // console.log(detailList);
  // 데이터 formData로 보내기
  const addReview = async () => {
    const formData = new FormData();
    image.forEach((image) => formData.append("image", image));
    console.log(image);
    const data = {
      postId: postId,
      applicantNickname: detailList?.applyList[0]?.nickname,
      comment: applyText.current.value,
    };
    console.log(data);
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("infos", blob);
    dispatch(reviewActions.createReviewDB(formData));
  };

  return (
    <div className={open ? "openModalcss" : null}>
      {open ? (
        <div className="modal">
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
          <hr style={{ width: "90%" }} />
          <ModalInput
            type="text"
            placeholder="내용을 입력해주세요."
            ref={applyText}
          />
          <hr style={{ width: "90%" }} />
          <div style={{ display: "flex" }}>
            <button
              className="close"
              onClick={() => {
                close();
              }}
            >
              취소
            </button>
            <button
              onClick={() => {
                console.log(applyText.current.value);
                if (children === "신청하기") {
                  dispatch(
                    applyActions.createApplyDB({
                      comment: applyText.current.value,
                      id: params.id,
                    })
                  );
                  setTimeout(() => {
                    setTimeout(() => {
                      // window.location.reload();
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
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const ModalInput = styled.textarea`
  width: 90%;
  height: 348px;
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

export default WriteModal;
