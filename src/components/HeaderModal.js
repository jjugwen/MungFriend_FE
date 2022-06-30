import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function HeaderModal() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <HeaderModalbox>
        <UpperBox>
          <UserNameFont>홍길동님</UserNameFont>
          <EmailFont>meongfriend@naver.com</EmailFont>
          <span>마이페이지</span>
          <span>작성한 게시글</span>
          <span>내가 받은 후기</span>
          <hr />
        </UpperBox>
        <Logoutbtn
          onClick={() => {
            console.log("로그아웃!");
            Logout();
          }}
        >
          로그아웃
        </Logoutbtn>
      </HeaderModalbox>
    </>
  );
}

const HeaderModalbox = styled.div`
  width: 100%;
  max-width: 240px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 3% -15%;
  position: fixed;

  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 85%;
  margin: 28px 20px 0px 20px;

  h1 {
    margin-bottom: 0;
  }
  /* button {
    border: none;
    background-color: transparent;
  } */
  span {
    margin: 10px 0%;
    /* font-weight: ${(props) => props.fontWeight || "600"}; */
    font-weight: 600;
  }
  hr {
    width: 200px;
    margin-top: 22px;
    margin-bottom: 0px;
    background: #e5e5e5;
  }
`;
const UserNameFont = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
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

const Logoutbtn = styled.div`
  text-align: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  margin: 16px 95px 16px 95px;
  color: #747474;
`;

export default HeaderModal;
