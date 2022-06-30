import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="logo">logo</div>
        <div>
          <button>산책</button>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
          <button>회원가입</button>
        </div>
      </div>
    </>
  );
}

export default Header;
