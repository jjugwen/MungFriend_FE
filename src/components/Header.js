import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderModal from "./HeaderModal";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [opened, setOpened] = useState(false);
  const modalClose = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  // const [active, setActive] = useState(false);
  // const HandleButton = (e) => {

  //   setActive = true
  // }

  return (
    <>
      <HeaderBox>
        <div className="logo">logo</div>
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <HeadButton>서비스 소개</HeadButton>
          <HeadButton>산책</HeadButton>
          <HeadButton>커뮤니티</HeadButton>
        </div>
        {!token ? (
          <div className="beforeLogin">
            <HeadButton
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </HeadButton>
            <HeadButton
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </HeadButton>
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
      </HeaderBox>
    </>
  );
}

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0% 5%;
`;

const HeadButton = styled.button`
  border: none;
  background-color: transparent;

  &:active {
    font-weight: 600;
    text-decoration: underline;
  }
`;

export default Header;
