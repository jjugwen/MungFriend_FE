import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginDB } from "../shared/API/loginApi";
import styled from "styled-components";

function Login(props) {
  const imgURL = props.imgURL;
  const dispatch = useDispatch();
  const username = useRef(null);
  const password = useRef(null);

  //버튼 비활성/활성
  const [btnState, setBtnState] = useState(false);
  const onChange = () => {
    if (
      username.current.value.length > 0 &&
      password.current.value.length > 0
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  //엔터 이벤트
  const onClick = () => {
    // console.log("enter");
    dispatch(loginDB(username.current.value, password.current.value));
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  const googleURL = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
  const kakaoURL = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;

  return (
    <>
      <LoginOutterBox>
        <LogoImg src={`${imgURL}/login/mungfreindLogo.svg`} alt="logo" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LoginInputBox
            placeholder="아이디를 입력해주세요."
            ref={username}
            onChange={onChange}
          />
          <LoginInputBox
            type="password"
            placeholder="비밀번호를 입력해주세요."
            ref={password}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          <LoginButton
            isActive={btnState}
            disabled={!btnState}
            onClick={onClick}
          >
            <span>로그인</span>
          </LoginButton>
          <RequestSignupText>
            <Link
              to="/signup"
              style={{ color: "#7a7a80", textDecoration: "underline" }}
            >
              회원이 아니신가요?
            </Link>
          </RequestSignupText>
        </div>
        <a href={kakaoURL}>
          <KakaoLoginBtn>
            <img src={`${imgURL}/login/kakao_icon.svg`} alt="kakaoIcon" />
            <span>카카오 아이디로 로그인 하기</span>
          </KakaoLoginBtn>
        </a>

        <a href={googleURL}>
          <GoogleLoginBtn>
            <img src={`${imgURL}/login/google_icon.svg`} alt="googleIcon" />
            <span>구글 아이디로 로그인 하기</span>
          </GoogleLoginBtn>
        </a>
        <Img src={`${imgURL}/login/login_Mung_img.svg`} alt="MungImg" />
      </LoginOutterBox>
    </>
  );
}
const LoginOutterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-width: 1440px; */
  height: fit-content;
  margin-bottom: -120px;

  & a {
    text-decoration: none;
  }
`;

const LogoImg = styled.img`
  margin: 120px 0 4% 0; //50px
`;

const LoginInputBox = styled.input`
  width: 400px;
  height: 52px;
  background: #ffffff;
  border: 2px solid #eeeeee;
  border-radius: 8px;
  margin: 6px 0px;
  padding-left: 1%;
`;

const LoginButton = styled.button`
  margin-top: 12px;
  height: 60px;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: #fa5a30;
  ${(props) =>
    props.isActive
      ? `
          background-color: ${(props) => props};
        `
      : `
          background-color: #ddd;
        `}

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: right;
    color: #ffffff;
  }
`;

const RequestSignupText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin: 4% 0 15% 0; /* 60px */
`;

const KakaoLoginBtn = styled.button`
  width: 400px;
  height: 60px;
  margin: 6px;
  background: #ffe600;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1%;

  span {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }
`;

const GoogleLoginBtn = styled.button`
  width: 400px;
  height: 60px;
  margin: 6px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1%;

  span {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 65%;
  }
`;

const Img = styled.img`
  position: relative;
  width: 10%;
  min-width: 171.5px;
  z-index: -1;
  bottom: 120px;
  right: -30%;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export default Login;
