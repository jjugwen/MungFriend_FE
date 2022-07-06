import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderModal from "./HeaderModal";
import noticeicon from "../assets/images/Header/noticeicon.svg";
import mymenu from "../assets/images/Header/mymenu.svg";
import openmenuarrow from "../assets/images/Header/openmenuarrow.svg";
import logo from "../assets/images/Header/logo.svg";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [opened, setOpened] = useState(false);
  const modalClose = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  // 메뉴 버튼 클릭했을 때 클릭한 버튼 상태 변화 유지하기
  const [currentClick, setCurrentClick] = useState(null);
  const [prevClick, setPrevClick] = useState(null);
  const GetClick = (e) => {
    // console.log(e.target.id);
    setCurrentClick(e.target.id);
    navigate(`${e.target.id}`);
  };
  // 변한 상태 css 스타일
  useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.color = "#FA5A30";
        current.style.fontWeight = "600";
      }
      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.fontWeight = "400";
        prev.style.color = "black";
        prev.style.borderBottom = "none";
      }
      setPrevClick(currentClick);
    },
    [currentClick]
  );

  return (
    <>
      <HeaderBox>
        <div
          className="HeaderLogo"
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
        >
          <img src={logo} alt={logo} />
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <HeadButton
            id="/"
            onClick={(e) => {
              GetClick(e);
            }}
          >
            서비스 소개
          </HeadButton>
          <HeadButton
            id="posts"
            onClick={(e) => {
              GetClick(e);
            }}
          >
            산책
          </HeadButton>
          <HeadButton
            id="community"
            onClick={(e) => {
              GetClick(e);
            }}
          >
            커뮤니티
          </HeadButton>
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
            <HeadButton
              onClick={() => {
                // navigate("/");
              }}
            >
              <img src={noticeicon} alt="noticeicon" />
            </HeadButton>

            <HeadButton
              onClick={() => {
                modalClose();
              }}
            >
              {opened ? <HeaderModal /> : null}
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={mymenu} alt="mymenu" />
                <img src={openmenuarrow} alt="openmenuarrow" />
              </div>
            </HeadButton>
          </div>
        )}
      </HeaderBox>
    </>
  );
}

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  margin: 0% 17.36%;
`;

const HeadButton = styled.button`
  border: none;
  background-color: transparent;
`;

export default Header;
