import React from "react";
import { useNavigate } from "react-router-dom";
import "../elements/LoginSignupStyle.css";

function SignupSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="SignupOutterBox">
          <div className="SignupCircleImg" alt="SignupSuccessImg" />
          <div className="SignupSuccessText1">회원가입이 완료되었습니다.</div>
          <div className="SignupSuccessText2">
            멍친구의 회원이 되신 것을 환영합니다! <br />
            아래 버튼을 누르시면 로그인 페이지로 이동합니다.
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="SignupWhiteButton"
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="SignupButtonText">메인으로</div>
            </button>
            <button
              className="SignupGrayButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              <div className="SignupButtonText">로그인</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupSuccess;
