import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function HeaderNavBar(props) {
  const navigate = useNavigate();
  return (
    <>
      <MobileOutter>
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

        <NavHr />
        <Contents>
          <Content href="/">서비스 소개</Content>
          <Content href="/posts">산책</Content>
          <Content href="/preparing">커뮤니티</Content>
        </Contents>
      </MobileOutter>
    </>
  );
}

const MobileOutter = styled.div`
  position: fixed;
  right: 0;
  /* background-color: green; */
  background-color: white;
  margin-top: 60%;
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

export default HeaderNavBar;
