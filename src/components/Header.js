import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderModal from "./HeaderModal";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [opened, setOpened] = useState(false);
  const modalClose = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="logo">logo</div>
        <div>
          <button>서비스 소개</button>
          <button>산책</button>
          <button>커뮤니티</button>
        </div>
        {!token ? (
          <div className="beforeLogin">
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </button>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </button>
          </div>
        ) : (
          <div className="AfterLogin">
            <button
              onClick={() => {
                // navigate("/");
              }}
            >
              알림
            </button>

            <button
              onClick={() => {
                modalClose();
              }}
            >
              {opened ? <HeaderModal /> : null}
              MY
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
