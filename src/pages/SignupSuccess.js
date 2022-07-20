import React from "react";
import { useNavigate } from "react-router-dom";
import "../elements/LoginSignupStyle.css";
import joinCompleteImg from "../assets/images/Main/step1.svg";
import Button from "../elements/Button";

function SignupSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <div className="SignupSuccessOutterBox">
        <img
          src={joinCompleteImg}
          alt="SignupSuccessImg"
          style={{ width: "133.82px" }}
        />
        <p className="SignupSuccessText1">회원가입이 완료되었습니다.</p>
        <div className="SignupSuccessText2">
          멍친구의 회원이 되신 것을 환영합니다! <br />
          아래 버튼을 누르시면 로그인 페이지로 이동합니다.
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            white_medium
            _onClick={() => {
              navigate("/");
            }}
          >
            메인으로
          </Button>
          <Button
            width="194px"
            orange_medium
            _onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignupSuccess;
