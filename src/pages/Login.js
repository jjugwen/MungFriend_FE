import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../elements/LoginSignupStyle.css";
import { loginDB } from "../redux/modules/loginAxios";
import kakaoIcon from "../assets/images/login/kakao_icon.svg";
import googleIcon from "../assets/images/login/google_icon.svg";
import Logo from "../assets/images/login/mungfreindLogo.svg";
import MungImg from "../assets/images/login/login_Mung_img.svg";
function Login() {
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

  return (
    <>
      <div className="LoginOutterBox">
        <img
          src={Logo}
          alt="logo"
          style={{
            marginBottom: "4%", //50px
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            className="LoginInputBox"
            placeholder="아이디를 입력해주세요."
            ref={username}
            onChange={onChange}
          ></input>
          <input
            className="LoginInputBox"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            ref={password}
            onChange={onChange}
            onKeyPress={onKeyPress}
          ></input>
          <LoginButton
            isActive={btnState}
            disabled={!btnState}
            onClick={onClick}
          >
            <span>로그인</span>
          </LoginButton>
          <Link to="/signup">
            <p className="RequestSignupText">회원이 아니신가요?</p>
          </Link>
        </div>
        <a href="https://hjkim-sparta.shop/oauth2/authorization/kakao">
          <KakaoLoginBtn>
            <img src={kakaoIcon} alt="kakaoIcon" />
            <span className="LoginButtonText">카카오 아이디로 로그인 하기</span>
          </KakaoLoginBtn>
        </a>
        {/* <a href="http://ec2-3-39-6-175.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google"> */}
        <a href="https://hjkim-sparta.shop/oauth2/authorization/google">
          <GoogleLoginBtn>
            <img src={googleIcon} alt="googleIcon" />
            <span className="LoginButtonText">구글 아이디로 로그인 하기</span>
          </GoogleLoginBtn>
        </a>
        <Img src={MungImg} alt="MungImg" />
      </div>
    </>
  );
}

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
  cursor: pointer;
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
  cursor: pointer;
`;

const Img = styled.img`
  position: relative;
  width: 10%;
  min-width: 171.5px;
  height: 258.08px;
  right: -33%;
  bottom: 177px;
`;

export default Login;
