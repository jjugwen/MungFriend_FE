import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../elements/LoginSignupStyle.css";
import { loginDB } from "../redux/modules/loginAxios";
import kakaoLoginBtn from "../assets/images/login/kakao_login_medium_wide.png";
import googleLoginBtn from "../assets/images/login/btn_google_signin_light_focus_web@2x.png";
import Logo from "../assets/images/login/mungfreindLogo.svg";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useRef(null);
  const password = useRef(null);

  //버튼 비활성/활성
  const [btnState, setBtnState] = useState(false);
  const onChange = (e) => {
    if (
      username.current.value.length > 0 &&
      password.current.value.length > 0
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  return (
    <>
      <div className="SignupOutterBox">
        <img src={Logo} alt="logo" />
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
          ></input>

          <LoginButton
            isActive={btnState}
            disabled={!btnState}
            onClick={() => {
              // console.log(username.current.value, password.current.value);
              dispatch(loginDB(username.current.value, password.current.value));
            }}
          >
            <div className="SignupButtonText" style={{ color: "#fff" }}>
              로그인
            </div>
          </LoginButton>
        </div>
        <a href="http://3.39.6.175/oauth2/authorization/kakao">
          <div style={kakao}>
            <img src={kakaoLoginBtn} alt="kakaologin" width="100%" />
          </div>
          {/* <button
            className="SignupWhiteButton"
            style={{
              width: "440px",
              margin: "6px",
              backgroundColor: "#FEE500",
            }}
          >
            <div className="SignupButtonText" style={{ color: "#000" }}>
              카카오 아이디로 로그인 하기
            </div>
          </button> */}
        </a>
        <a href="http://ec2-3-39-6-175.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google">
          <GoogleImage>
            <img src={googleLoginBtn} alt="googlelogin" />
          </GoogleImage>
          {/* <button
            className="SignupWhiteButton"
            style={{ width: "440px", margin: "6px" }}
          >
            <div className="SignupButtonText" style={{ color: "#000" }}>
              구글 아이디로 로그인 하기
            </div>
          </button> */}
        </a>
      </div>
    </>
  );
}

const LoginButton = styled.button`
  margin-top: 12px;
  height: 60px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #a4a4a4;
  ${(props) =>
    props.isActive
      ? `
          background-color: ${(props) => props};
        `
      : `
          background-color: #ddd;
          cursor: not-allowed
        `}
`;

const kakao = {
  width: "440px",
  margin: "6px",
  borderRadius: "8px",
  backgroundColor: "transparent",
  position: "relative",
  backgroundSize: "cover",
};

const GoogleImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 440px;
  height: 60px;
  border-radius: 8px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  img {
    position: absolute;
    width: 110%;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;
  }
`;

export default Login;
