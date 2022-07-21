//로그인 필요 페이지

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import needlogin from "../../../assets/images/Errors/img-login.png";
import Button from "../../../elements/Button";

function NeedLogin() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Img src={needlogin} alt="needlogin" />
      <ErrorTextArea>
        <h2>로그인 해주세요.</h2>
        <span>현재 페이지는 로그인 후 이용 가능합니다.</span>
        <Button
          orange_medium
          margin="40px 0 0 0"
          _onClick={() => {
            navigate("/login");
            window.location.reload();
          }}
        >
          로그인하기
        </Button>
      </ErrorTextArea>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  /* top: -4.5em; */
  background-color: white;
  width: 100%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12.18em 0%;
  /* width: 100%; */
  margin: auto;
  text-align: center;
`;

const Img = styled.img`
  width: 15.3%;
  /* width: 220px; */
`;

const ErrorTextArea = styled.div`
  h2 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
    margin: 8% 0 3% 0;
  }

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;
export default NeedLogin;
