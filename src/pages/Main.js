import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Textrotate from "../elements/textrotate";

function Main() {
  return (
    <>
      <MainBox>
        {/* <Header /> */}
        <h1>
          오늘은 내가, <br />
          내일은 멍친구가
        </h1>

        <span>반려견 산책을 도와주는 산책 매칭 서비스</span>
      </MainBox>
      <TextCircle>
        <Textrotate />
      </TextCircle>
    </>
  );
}

const MainBox = styled.div`
  /* position: fixed; */
  top: 0;
  height: 50vh;
  width: 100vw;
  background-color: #fbf1e8;
`;
const TextCircle = styled.div`
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 160px;

    text {
      font-size: 33px;
      font-family: Helvetica Neue, sans-serif;
      font-weight: 500;
      text-transform: lowercase;
      letter-spacing: 21px;
      fill: #333;
    }
    animation: spin infinite 40s linear;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

export default Main;
