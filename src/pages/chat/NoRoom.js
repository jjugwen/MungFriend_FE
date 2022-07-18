import React from "react";
import styled from "styled-components";
// image
import chatDog from "../../assets/images/Chatting/img-dog-chat.png";

const NoRoom = (props) => {
  return (
    <Container>
      <img src={chatDog} width="220px" alt="chatDog" />
      <br />
      <br />
      <h1>멍친구와 채팅하기</h1>
      <br />
      <h5>🐶매칭된 멍친구와 채팅해요~!!🐶</h5>
      <br />

      <span>멍친9함..ㅎ</span>
    </Container>
  );
};

const Container = styled.div`
  /* position: relative; */
  /* width: 310px; */
  /* margin: 12% 35% auto; */
  text-align: center;
  padding: 12.18em 0%;

  & h1 {
    font-size: 20px;
    font-weight: bold;
  }

  & span {
    color: blue;
  }
`;

export default NoRoom;
