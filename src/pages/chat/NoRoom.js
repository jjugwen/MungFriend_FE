import React from "react";
import styled from "styled-components";
// image
import chatDog from "../../assets/images/Chatting/img-dog-chat.png";

const NoRoom = (props) => {
  return (
    <Container>
      <img
        src={chatDog}
        width="16.6%" //220px
        alt="chatDog"
      />
      <h1>채팅방을 선택해주세요.</h1>

      <span>멍친9함!</span>
      <br />
      <span>매칭된 멍친구와 채팅해요.</span>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 6;
  background-color: white;
  text-align: center;
  padding: 20% 0%;
  /* width: 1240px; */
  max-width: 700%;
  margin: auto;
  & h1 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
  }

  & span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
  }
`;

export default NoRoom;
