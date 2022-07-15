import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dogError from "../assets/images/Errors/img-dog-error.png";
import Button from "../elements/Button";

function Error() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Wrap2>
        <Body>
          <Img src={dogError} alt="dogError" />
          <ErrorTextArea>
            <h1>403</h1>
            <h2>페이지 접근 권한</h2>
            <span>요청하신 페이지를 보실 권한이 없습니다.</span>
            <span>
              방문하시려는 페이지의 권한이 있는 회원만 보실 수 있습니다.
            </span>
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
  width: 23.625%;

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
export default Error;
