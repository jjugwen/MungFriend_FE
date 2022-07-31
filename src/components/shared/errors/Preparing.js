import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../elements/Button";

function Preparing(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="SignupSuccessOutterBox">
        <img
          src={`${props.imgURL}/Errors/img-ready.png`}
          alt="PreparingImg"
          style={{ width: "220px" }}
        />
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
