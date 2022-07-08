import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Textrotate from "../elements/textrotate";
import MungFootPrint from "../assets/images/Main/MungFootPrint.svg";
import MainTopImg from "../assets/images/Main/main.png";
import Step1 from "../assets/images/Main/step1.svg";
import Step2 from "../assets/images/Main/step2.svg";
import Step3 from "../assets/images/Main/step3.svg";
import Step4 from "../assets/images/Main/step4.svg";
import bannerHeart from "../assets/images/Main/img-banner-heart.png";
import bannerWalk from "../assets/images/Main/img-banner-walk.png";
import bannerhands from "../assets/images/Main/img-banner-hands.png";
import together from "../assets/images/Main/함께.png";

function Main() {
  return (
    <div style={{ margin: "0" }}>
      <MainBox1
        style={{
          backgroundImage: `url(${MainTopImg})`,
          zIndex: "-1",
          top: "-4.5em",
        }}
      />
      <MainBox2>
        <div
          style={{
            marginBottom: "80px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h1>
              산책을 시켜줄 <br />
              보호자를 찾고 있다면?
            </h1>
            <span>멍친구에서 산책 매칭을 통해 안심하고 맡겨보세요!</span>
          </div>
          <TextCircle>
            <Textrotate />
            <img
              src={MungFootPrint}
              alt="MungFootPrint"
              style={{ position: "absolute" }}
            />
          </TextCircle>
        </div>
        <CardBox>
          <CardOne>
            <Stepbox style={{ backgroundImage: `url(${Step1})` }} />
            <p>STEP 1</p>
            <span style={{ marginTop: "4%" }}>회원가입을 완료하세요.</span>
          </CardOne>
          <CardOne>
            <Stepbox style={{ backgroundImage: `url(${Step2})` }} />
            <p>STEP 2</p>
            <span style={{ marginBottom: "2%" }}>산책 페이지로 이동 후</span>
            <span> 글쓰기 버튼을 클릭해주세요.</span>
          </CardOne>
          <CardOne>
            <Stepbox style={{ backgroundImage: `url(${Step3})` }} />
            <p>STEP 3</p>
            <span style={{ marginBottom: "2%" }}>글 작성 후, 신청자</span>
            <span> 한 명을 매칭해주세요.</span>
          </CardOne>
          <CardOne>
            <Stepbox style={{ backgroundImage: `url(${Step4})` }} />
            <p>STEP 4</p>
            <span style={{ marginTop: "4%" }}>완료!</span>
          </CardOne>
        </CardBox>
      </MainBox2>
      <Banner style={{ backgroundImage: `url(${bannerHeart})` }} />
      <MainBox3 style={{ backgroundImage: `url(${bannerWalk})` }} />
      <MainBox4 style={{ backgroundImage: `url(${together})` }} />
      <MainBox3 style={{ backgroundImage: `url(${bannerhands})` }} />
    </div>
  );
}

const MainBox1 = styled.div`
  /* position: fixed; */
  height: 40em;
  width: 100%;
  /* background-color: #fbf1e8; */
  background-size: cover;
  position: relative;
  /* margin-bottom: 115px; */
  margin-bottom: 7.5%;

  h1 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 20px;
  }
  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    color: #4e4e56;
  }
`;

const MainBox2 = styled.div`
  margin: 0% 17.36%;

  h1 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 20px;
  }
  span {
    font-family: "Pretendard";
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    color: #4e4e56;
  }
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

const CardBox = styled.div`
  display: flex;
  gap: 1.6em;
`;

const CardOne = styled.div`
  width: 100%;
  min-width: 6.54%;
  height: 16em;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  border-radius: 12px;

  p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    margin-top: 0;
  }

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    color: #4e4e56;
  }
`;
const Stepbox = styled.div`
  width: 8.01em;
  height: 7.58em;
  margin: 1.5em;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Banner = styled.div`
  height: 12.5em;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 7.5% 17.36%;
`;

const MainBox3 = styled.div`
  /* height: 360px; */
  height: 22em;
  background-size: contain;
  /* background-repeat: no-repeat; */
`;

const MainBox4 = styled.div`
  /* height: 792px; */
  height: 47em;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 7.5% 17.36%;
`;
export default Main;
