import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import chatting from "../../assets/images/Header/chatIcon.svg";
import logo from "../../assets/images/Header/logo.svg";
import mymenu from "../../assets/images/Header/mymenu.svg";
import noticeicon from "../../assets/images/Header/noticeicon.svg";
import openmenuarrow from "../../assets/images/Header/openmenuarrow.svg";

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
  const loginRef = useRef();
  const signupRef = useRef();
  const chatRef = useRef();
  const noticeRef = useRef();

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
    } else if (id === "login" || id === "signup" || id === "chat") {
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
            <img src={logo} alt={logo} />
          </HeaderLogo>
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
                src={chatting}
                alt="chatting"
                id="chat"
                onClick={GetClick}
                ref={chatRef}
                style={{ marginRight: "5%" }}
              />
              <img
                src={noticeicon}
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
                  <img src={mymenu} alt="mymenu" />
                  <img src={openmenuarrow} alt="openmenuarrow" />
                </div>
              </HeadButton>
            </AfterLogin>
          )}
        </HeaderBox>
      </HeaderOutterBox>
    </>
  );
}

const HeaderOutterBox = styled.div`
  width: 100% !important;
  box-sizing: border-box;
  min-width: 1440px;
  display: inline-block;
  position: relative;
  bottom: 0;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 940px;
  height: 72px;
  margin: 0% 17.36%;
`;

const HeaderLogo = styled.div`
  min-width: max-content;
  cursor: pointer;
`;
const HeadButton = styled.button`
  border: none;
  background-color: transparent;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  min-width: fit-content;
`;

const BeforeLogin = styled.div`
  display: "flex";
  min-width: fit-content;
`;
const AfterLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10%;
  gap: 2%;
  & img {
    cursor: pointer;
  }
`;
export default Header;
