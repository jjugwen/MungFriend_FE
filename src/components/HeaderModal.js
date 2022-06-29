import React from "react";
import styled from "styled-components";

function HeaderModal() {
  const Logout = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    // window.location.reload();
  };

  return (
    <>
      <HeaderModalbox>
        <UpperBox>
          <h1>홍길동님</h1>
          <span>email</span>
          <button>마이페이지</button>
          <button>작성한 게시글</button>
          <button>후기 리스트</button>
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
  max-width: 200px;
  height: auto;
  background-color: green;
  display: flex;
  flex-direction: column;
  margin: 3% -11%;
  position: fixed;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    margin-bottom: 0;
  }
  button {
    border: none;
    background-color: transparent;
  }
  hr {
    width: 100%;
  }
`;

const Logoutbtn = styled.button`
  width: 100%;
  text-align: center;
`;

export default HeaderModal;
