import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginDB } from "../redux/modules/userSlice";
import kakaoLoginBtn from "../assets/images/login/kakao_login_medium_wide.png";
import googleLoginBtn from "../assets/images/login/btn_google_signin_light_focus_web@2x.png";

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
      <div
        className="OutterBox"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          width: "100%",
          maxWidth: "40vw",
        }}
      >
        <div className="logo">logo</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            placeholder="아이디를 입력해주세요."
            ref={username}
            onChange={onChange}
          ></input>
          <input
            // type="password"
            placeholder="비밀번호를 입력해주세요."
            ref={password}
            onChange={onChange}
          ></input>

          <div>
            <button>아이디 찾기</button>
            <button>비밀번호 찾기</button>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </button>
          </div>
          <LoginButton
            isActive={btnState}
            disabled={!btnState}
            onClick={() => {
              console.log(username.current.value, password.current.value);
              dispatch(loginDB(username.current.value, password.current.value));
            }}
          >
            로그인
          </LoginButton>
        </div>
        <a href="http://13.125.232.116/oauth2/authorization/kakao">
          <button style={kakao}>
            <img src={kakaoLoginBtn} alt="kakaologin" width="100%" />
          </button>
        </a>
        <a href="http://ec2-13-125-232-116.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google">
          <button style={google}>
            <img src={googleLoginBtn} alt="googlelogin" width="100%" />
          </button>
        </a>
      </div>
    </>
  );
}

const LoginButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: green;
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
  width: "100%",
  border: "none",
  backgroundColor: "transparent",
};

const google = {
  width: "100%",
  border: "none",
  backgroundColor: "transparent",
};

export default Login;
