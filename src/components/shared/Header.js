import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import HeaderNavBar from "./HeaderNavBar";

function Header(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const imgURL = props.imgURL;

  // const [opened, setOpened] = useState(false);
  // const modalClose = useCallback(() => {
  //   setOpened(!opened);
  // }, [opened]);

  // 메뉴 버튼 클릭했을 때 클릭한 버튼 상태 변화 유지하기
  const mainRef = useRef();
  const postsRef = useRef();
  const communityRef = useRef();
  const loginRef = useRef();
  const signupRef = useRef();
  const chatRef = useRef();
  const noticeRef = useRef();

  // console.log(window.location.pathname);

  const id = window.location.pathname;
  React.useEffect(() => {
    if (id === "/") {
      mainRef.current.style = `
        color : #FA5A30;
        font-weight: 600;`;
      postsRef.current.style = "";
      communityRef.current.style = "";
    } else if (id === "/posts") {
      mainRef.current.style = "";
      postsRef.current.style = `
        color : #FA5A30;
        font-weight: 600;`;
      communityRef.current.style = "";
    } else if (id === "/preparing") {
      mainRef.current.style = "";
      postsRef.current.style = "";
      communityRef.current.style = `
        color : #FA5A30;
        font-weight: 600;`;
    } else if (
      id === "/login" ||
      id === "/signup" ||
      id === "/node_moduleschat"
    ) {
      mainRef.current.style = `
        color : black;
        font-weight: 500;`;
      postsRef.current.style = "";
      communityRef.current.style = "";
    } else {
      mainRef.current.style = `
        color : black;
        font-weight: 500;`;
      postsRef.current.style = "";
      communityRef.current.style = "";
    }
  }, [id]);

  const GetClick = (e) => {
    const id = e.target.id;
    navigate(`${id}`);
    if (id === "/") {
      mainRef.current.style = `
        color : #FA5A30;
        font-weight: 600;`;
      postsRef.current.style = "";
      communityRef.current.style = "";
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
    } else if (id === "login" || id === "signup" || id === "node_moduleschat") {
      mainRef.current.style = `
        color : black;
        font-weight: 500;`;
      postsRef.current.style = "";
      communityRef.current.style = "";
    } else {
      mainRef.current.style = `
        color : black;
        font-weight: 500;`;
      postsRef.current.style = "";
      communityRef.current.style = "";
    }
  };
  //모바일버전 메뉴바
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <HeaderOutterBox>
        <HeaderBox>
          <HeaderLogo
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            <img src={`${imgURL}/Header/logo.svg`} alt="logo" />
          </HeaderLogo>
          <RightBox>
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
                onClick={GetClick}
                ref={mainRef}
                style={{ color: "#FA5A30", fontWeight: "600" }}
              >
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
              <BeforeLogin>
                <HeadButton id="login" onClick={GetClick} ref={loginRef}>
                  로그인
                </HeadButton>
                <HeadButton id="signup" onClick={GetClick} ref={signupRef}>
                  회원가입
                </HeadButton>
              </BeforeLogin>
            ) : (
              <AfterLogin>
                <img
                  src={`${imgURL}/Header/chatIcon.svg`}
                  alt="chatting"
                  id="chat"
                  onClick={GetClick}
                  ref={chatRef}
                  style={{ marginRight: "5%" }}
                />
                <img
                  src={`${imgURL}/Header/noticeicon.svg`}
                  alt="noticeicon"
                  id="preparing"
                  onClick={GetClick}
                  ref={noticeRef}
                />

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
                    <img src={`${imgURL}/Header/mymenu.svg`} alt="mymenu" />
                    <img
                      src={`${imgURL}/Header/openmenuarrow.svg`}
                      alt="openmenuarrow"
                    />
                  </div>
                </HeadButton>
              </AfterLogin>
            )}
          </RightBox>
          {/* 모바일버전 헤더 메뉴 */}
          {toggleMenu && (
            <HeaderNavBar setToggleMenu={setToggleMenu} modal={toggleMenu} />
          )}
          <Burger
            src={burgerMenu}
            alt=""
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          />
        </HeaderBox>
      </HeaderOutterBox>
    </>
  );
}

const HeaderOutterBox = styled.div`
  width: 100% !important;
  box-sizing: border-box;
  /* min-width: 1440px; */
  display: inline-block;
  position: relative;
  bottom: 0;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* min-width: 940px; */
  height: 72px;
  margin: 0% 17.36%;

  @media ${({ theme }) => theme.device.mobile} {
    margin: 0% 5%;
  }
`;

const HeaderLogo = styled.div`
  min-width: 23%;
  cursor: pointer;

  @media ${({ theme }) => theme.device.mobile} {
    width: 25%;
  }
`;

const Burger = styled.img`
  /* @media ${({ theme }) => theme.device.desktop} { */
  width: 0;
  /* } */
  @media ${({ theme }) => theme.device.mobile} {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
const RightBox = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const HeadButton = styled.button`
  border: none;
  background-color: transparent;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  min-width: max-content;
`;

const BeforeLogin = styled.div`
  display: flex;
  /* width: 105px; */
  width: 15%;
  /* min-width: fit-content; */
`;
const AfterLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 11.5%;
  gap: 2%;
  & img {
    cursor: pointer;
  }
`;
export default Header;
