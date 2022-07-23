import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as applyActions } from "../../redux/modules/applySlice";
import { actionCreators as reviewActions } from "../../redux/modules/reviewSlice";
import "../../elements/modalStyle.css";
import ReviewImgUpload from "./review/ReviewImgUpload";
import Button from "../../elements/Button";
import CautionButton from "../../elements/CautionButton";

function WriteModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, children } = props;
  const applyText = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  const postId = Number(params.id);
  const image = useSelector((state) => state.reviewSlice.image);
  const detailList = useSelector((state) => state.postDetailSlice.list);

  // 데이터 formData로 보내기
  const addReview = async () => {
    const formData = new FormData();
    image.forEach((image) => formData.append("image", image));
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
    // window.alert("후기 작성이 완료되었습니다.");
  };

  //글자수 세기
  const [text, setText] = useState("");

  const onChangeText = (e) => {
    return setText(e.target.value);
  };
  return (
    <div className={open ? "openModalcss" : null}>
      {open ? (
        <Reviewmodal>
          <ModalTitle>{children}</ModalTitle>
          <hr
            style={{
              width: "90%",
              backgroundColor: "black",
              border: "none",
              height: "3px",
            }}
          />
          {children === "신청하기" ? (
            <>
              <CautionButton margin="0 0 0 -225%" />
              <Hr />
            </>
          ) : null}
          {children === "후기작성" ? (
            <>
              <ReviewImgUpload />
              <Hr />
            </>
          ) : null}
          <ModalInput
            type="text"
            placeholder="내용을 입력해주세요."
            ref={applyText}
            onChange={onChangeText}
            maxLength="255" //255자 제한
          />
          <span>{text.length}/255</span>
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
                // console.log(applyText.current.value);
                if (children === "신청하기") {
                  if (applyText.current.value === "") {
                    window.alert("신청 글을 간단히 작성해 주세요.");
                  } else {
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
                }
                if (children === "후기작성") {
                  if (applyText.current.value === "") {
                    window.alert("후기를 작성해 주세요.");
                  } else {
                    addReview();
                    setTimeout(() => {
                      window.alert("후기 작성이 완료되었습니다.");
                      close();
                    }, 300);
                  }
                }
              }}
            >
              확인
            </Button>
          </div>
        </Reviewmodal>
      ) : null}
    </div>
  );
}

const ModalInput = styled.textarea`
  width: 88%;
  /* max-width: 0px; */
  /* width: 560px; */
  /* height: 345px; */
  height: 50%;
  border: none;
  vertical-align: top;
  text-align: left;
  padding: 3% 1%;
  outline: none;
  resize: none;
`;

const ModalTitle = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
`;

const Hr = styled.hr`
  width: 90%;
  border: 1px solid #e5e5e5;
`;

const Reviewmodal = styled.div`
  position: absolute;
  top: calc(50vh - 350px);
  left: calc(50vw - 350px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  width: 100%;
  max-width: 640px;
  height: 645px;

  span {
    margin-left: 78%;
    font-weight: 400;
    font-size: 16px;
    color: #7a7a80;
  }
`;

export default WriteModal;
