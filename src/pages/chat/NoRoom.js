import React from "react";
import styled from "styled-components";
// image
import chatDog from "../../assets/images/Chatting/img-dog-chat.png";
import { ChannelTitle, CautionButton } from "./Chatting";
const NoRoom = (props) => {
  return (
    <Container>
      {/* 우측 상단 화면 */}
      <ChannelTitle>
        <p>멍친구와 대화하기</p>
        <div
          style={{
            display: "flex",
            padding: "0 4%",
            gap: "4%",
          }}
        >
          <CautionButton />
        </div>
      </ChannelTitle>
      {/* noRoom view */}
      <NoroomBox>
        <img
          src={chatDog}
          width="16.6%" //220px
          alt="chatDog"
        />
        <h1>채팅방을 선택해주세요.</h1>

        <span>멍친9함!</span>
        <br />
        <span>매칭된 멍친구와 채팅해요.</span>
      </NoroomBox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 6;
  background-color: white;
  text-align: center;
  min-width: 1100px;
  /* width: 1240px; */
  height: 600px;
  width: 100%;

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

const NoroomBox = styled.div`
  padding: 18.8% 0%;
  z-index: 7;
  width: 100%;
  min-width: 1166px;
  background-color: white;
`;

export default NoRoom;
