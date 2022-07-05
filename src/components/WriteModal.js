import React, { useRef } from "react";
import styled from "styled-components";

function WriteModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  const { children } = props;
  const applyText = useRef(null);

  return (
    <div className={open ? "openModalcss" : "modal"}>
      {open ? (
        <WriteModalbox>
          <ModalTitle>{children}</ModalTitle>
          <hr
            style={{
              width: "90%",
              backgroundColor: "black",
              border: "none",
              height: "3px",
            }}
          />
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
            </button>{" "}
            <button
              onClick={() => {
                console.log(applyText.current.value);
              }}
            >
              확인
            </button>
          </div>
        </WriteModalbox>
      ) : null}
    </div>
  );
}

const WriteModalbox = styled.div`
  position: fixed;
  top: 20%;
  left: 35%;
  width: 100%;
  max-width: 640px;
  height: 580px;
  border: 1px solid;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
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
