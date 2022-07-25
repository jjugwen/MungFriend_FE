//500 페이지

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dogError from "../../../assets/images/Errors/img-dog-error.png";
import Button from "../../../elements/Button";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Wrap2>
        <Body>
          <Img src={dogError} alt="dogError" />
          <ErrorTextArea>
            <h1>500</h1>
            <h2>페이지 오류</h2>
            <span>홈페이지 이용에 불편을 드려 죄송합니다.</span>
            <span>새로고침(F5)을 누르시거나, 잠시 후 이용해 주세요.</span>
            <Button
              orange_medium
              margin="40px 0 0 0"
              _onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              홈으로
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
  z-index: 5;
  min-width: 1440px;
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
  width: 100%;

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
export default ErrorPage;
