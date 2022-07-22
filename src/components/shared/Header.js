import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderModal from "./HeaderModal";
import noticeicon from "../../assets/images/Header/noticeicon.svg";
import mymenu from "../../assets/images/Header/mymenu.svg";
import openmenuarrow from "../../assets/images/Header/openmenuarrow.svg";
import logo from "../../assets/images/Header/logo.svg";
import chatting from "../../assets/images/Header/chatIcon.svg";

function Header(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // const [opened, setOpened] = useState(false);
  // const modalClose = useCallback(() => {
  //   setOpened(!opened);
  // }, [opened]);

  // 메뉴 버튼 클릭했을 때 클릭한 버튼 상태 변화 유지하기
  const mainRef = useRef();
  const postsRef = useRef();
  const communityRef = useRef();
  const GetClick = (e) => {
    // console.log(e.target.id);
    const id = e.target.id;
    navigate(`${id}`);
    if (id === "/") {
      mainRef.current.style = `
        color : #FA5A30;
        font-weight: 600;`;
      postsRef.current.style = "";
      communityRef.current.style = "";
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else if (id === "posts") {
      mainRef.current.style = "";
      postsRef.current.style = `
      color : #FA5A30;
      font-weight: 600;`;
      communityRef.current.style = "";
    } else if (id === "preparing") {
      mainRef.current.style = "";
      postsRef.current.style = "";
      communityRef.current.style = `
      color : #FA5A30;
      font-weight: 600;`;
    } else {
      mainRef.current.style = "";
      postsRef.current.style = "";
      communityRef.current.style = "";
    }
  };

  return (
    <>
      <HeaderOutterBox>
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
            <HeadButton id="/" onClick={GetClick} ref={mainRef}>
              서비스 소개
            </HeadButton>
            <HeadButton id="posts" onClick={GetClick} ref={postsRef}>
              산책
            </HeadButton>
            <HeadButton id="preparing" onClick={GetClick} ref={communityRef}>
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
            <div style={AfterLogin}>
              <HeadButton
                onClick={() => {
                  navigate("/chat");
                }}
              >
                <img src={chatting} alt="chatting" />
              </HeadButton>
              <HeadButton
                onClick={() => {
                  navigate("/preparing");
                }}
              >
                <img src={noticeicon} alt="noticeicon" />
              </HeadButton>

              <HeadButton
                onClick={() => {
                  props.setModal(!props.modal);
                }}
              >
                {/* {/* //   onClick={() => {
              //     modalClose();
              //   }}
              // >
              //   {opened ? <HeaderModal /> : null} */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3%" }}
                >
                  <img src={mymenu} alt="mymenu" />
                  <img src={openmenuarrow} alt="openmenuarrow" />
                </div>
              </HeadButton>
            </div>
          )}
        </HeaderBox>
      </HeaderOutterBox>
    </>
  );
}

const HeaderOutterBox = styled.div`
  width: 100% !important;
  box-sizing: border-box;
  display: block;
  position: relative;
  bottom: 0;
`;

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
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  cursor: pointer;
`;

const AfterLogin = {
  display: "flex",
  alignItems: "center",
};
export default Header;
