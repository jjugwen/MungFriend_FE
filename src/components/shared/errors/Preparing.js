import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../elements/Button";
import PreparingImg from "../../../assets/images/Errors/img-ready.png";

function Preparing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="SignupSuccessOutterBox">
        <img src={PreparingImg} alt="PreparingImg" style={{ width: "220px" }} />
        <p className="SignupSuccessText1">준비중</p>
        <span style={{ textAlign: "center" }}>
          현재 페이지는 준비중인 페이지입니다. <br />
          조금만 더 기다려주세요!
        </span>
        <Button
          width="194px"
          orange_medium
          margin="40px 0 0 0 "
          _onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          홈으로
        </Button>
      </div>
    </>
  );
}

export default Preparing;
