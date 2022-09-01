import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/userInfoSlice";

function HeaderNavBar(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  //로그인 유저
  const myinfo = useSelector((state) => state.userInfoSlice.myInfo);

  const Logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    dispatch(userActions.myinfoDB());
  }, [dispatch]);

  return (
    <>
      <MobileOutter>
        {!token ? (
          <div style={{ marginTop: "-60%" }}>
            <TitleAndClose>
              <h1>로그인 해주세요.</h1>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/Modal/closeButton.svg`}
                alt=""
                onClick={() => {
                  props.setToggleMenu(false);
                }}
              />
            </TitleAndClose>
            <ButtonNav>
              <button
                onClick={() => {
                  navigate("/login");
                  props.setToggleMenu(false);
                }}
              >
                로그인
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  props.setToggleMenu(false);
                }}
              >
                회원가입
              </button>
            </ButtonNav>
          </div>
        ) : (
          // 로그인 후 모바일버전 Navbar
          <>
            <TitleAndClose>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <UserNameFont>
                  <span style={{ fontWeight: "600" }}>{myinfo?.nickname}</span>
                  님 반갑습니다!
                </UserNameFont>
                <EmailFont>{myinfo?.email}</EmailFont>
              </div>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/Modal/closeButton.svg`}
                alt=""
                onClick={() => {
                  props.setToggleMenu(false);
                }}
              />
            </TitleAndClose>
            <ButtonNav>
              <button
                onClick={() => {
                  navigate("/chat");
                  props.setToggleMenu(false);
                }}
              >
                채팅
              </button>
              <button
                onClick={() => {
                  navigate("/preparing");
                  props.setToggleMenu(false);
                }}
              >
                알림
              </button>
              <button
                onClick={() => {
                  Logout();
                  props.setToggleMenu(false);
                  // window.location.reload();
                }}
              >
                로그아웃
              </button>
            </ButtonNav>
          </>
        )}
        <NavHr />
        <Contents>
          <Content href="/">서비스 소개</Content>
          <Content href="/posts">산책</Content>
          <Content href="/preparing">커뮤니티</Content>
        </Contents>
        {/* 모바일버전 로그인 후 마이페이지 메뉴 생성 */}
        {!token ? null : (
          <>
            <NavHr style={{ height: "1px", background: "#E3E5E9" }} />
            <Contents>
              <Content
                onClick={() => {
                  navigate("/mypage?value=mypage");
                  props.setToggleMenu(false);
                }}
              >
                마이페이지
              </Content>
              <Content
                onClick={() => {
                  navigate("/mypage?value=mypost");
                  props.setToggleMenu(false);
                }}
              >
                작성한 게시글
              </Content>
              <Content
                onClick={() => {
                  navigate("/mypage?value=myreview");
                  props.setToggleMenu(false);
                }}
              >
                내가 받은 후기
              </Content>
            </Contents>
          </>
        )}
      </MobileOutter>
    </>
  );
}

const MobileOutter = styled.div`
  position: fixed;
  right: 0;
  /* background-color: green; */
  background-color: white;
  margin-top: 100%;
  width: 80%;
  height: 200%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 5;

  & h1 {
    font-weight: 600;
    font-size: 18px;
    line-height: 100%;
  }
`;

const TitleAndClose = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0% 5%;
`;

const ButtonNav = styled.div`
  display: flex;
  padding: 5%;

  & button {
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    width: 50%;
    height: 40px;
    background: #ffffff;
    border: 1px solid #e3e5e9;
    /* border-radius: 4px; */
  }
`;

const NavHr = styled.hr`
  width: 100%;
  height: 8px;
  background: #f2f3f6;
  border: none;
`;

const Contents = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.a`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: black;
  text-decoration: none;
  margin-top: 5%;
  :hover {
    color: #fa5a30;
  }
`;

const UserNameFont = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  margin-bottom: 6px;
`;

const EmailFont = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  margin-bottom: 10px;
  color: #747474;
`;

export default HeaderNavBar;
