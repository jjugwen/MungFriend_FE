//403 페이지

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../elements/Button";

function ErrorNoAccess(props) {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Wrap2>
        <Body>
          <Img
            src={`${props.imgURL}/Errors/img-dog-error.png`}
            alt="dogError"
          />
          <ErrorTextArea>
            <h1>403</h1>
            <h2>페이지 접근 권한</h2>
            <span>요청하신 페이지를 보실 권한이 없습니다.</span>
            <span>
              마이페이지 프로필 수정에서 필수 정보(핸드폰 번호, 주소) 입력 후
              이용해 주세요.
            </span>
            <Button
              orange_medium
              margin="40px 0 0 0"
              _onClick={() => {
                navigate("/mypage");
              }}
            >
              마이페이지 이동
            </Button>
          </ErrorTextArea>
        </Body>
      </Wrap2>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  top: -4.5em;
  background-color: white;
  width: 100%;
  min-width: 1440px;
  z-index: 5;
`;
const Wrap2 = styled.div`
  position: relative;
  bottom: -18em;
  background-color: white;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  gap: 3.75%;
  margin: 0% 10% auto;
`;

const Img = styled.img`
  margin-left: 17%;
  width: 27.5%;
`;

const ErrorTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 41%;

  h1 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 100%;
    color: #e3e5e9;
    margin: 0.625% 0;
  }

  h2 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
    margin: 0 0 32px 0;
  }

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;
export default ErrorNoAccess;
