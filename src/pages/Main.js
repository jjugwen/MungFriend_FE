import React from "react";
import styled from "styled-components";
import Textrotate from "../elements/textrotate";
import MungFootPrint from "../assets/images/Main/MungFootPrint.svg";
import MainTopImg from "../assets/images/Main/main2.png";
import Step1 from "../assets/images/Main/step1.svg";
import Step2 from "../assets/images/Main/step2.svg";
import Step3 from "../assets/images/Main/step3.svg";
import Step4 from "../assets/images/Main/step4.svg";
import bannerHeart from "../assets/images/Main/img-banner-heart.png";
import bannerWalk from "../assets/images/Main/img-dog-sad.png";
import bannerhands from "../assets/images/Main/img-hands.png";
import together from "../assets/images/Main/함께.png";
import Button from "../elements/Button";

function Main() {
  return (
    <div style={{ margin: "0" }}>
      <MainBox1
        style={{
          backgroundImage: `url(${MainTopImg})`,
          zIndex: "-1",
          top: "-4.5em",
        }}
      >
        <div
          style={{
            marginBottom: "80px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: "10em 0 0 17.36%",
            }}
          >
            <h1>
              오늘은 내가, <br />
              내일은 멍친구가
            </h1>
            <span>반려견 산책을 도와주는 산책 매칭 서비스</span>
          </div>
        </div>
      </MainBox1>
      <div style={{ minWidth: "1440px" }}>
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
              <Stepbox style={{ backgroundImage: `url(${Step4})` }} />
              <p>STEP 1</p>
              <span style={{ marginBottom: "2%" }}>마이페이지에서</span>
              <span>본인 인증, 멍프로필 등록하기</span>
            </CardOne>
            <CardOne>
              <Stepbox style={{ backgroundImage: `url(${Step2})` }} />
              <p>STEP 2</p>
              <span style={{ marginBottom: "2%" }}>산책 페이지에서</span>
              <span>모집글 작성하기</span>
            </CardOne>
            <CardOne>
              <Stepbox style={{ backgroundImage: `url(${Step3})` }} />
              <p>STEP 3</p>
              <span style={{ marginBottom: "2%" }}>신청한 멍친구 중</span>
              <span>한 명과 매칭하기</span>
            </CardOne>
            <CardOne>
              <Stepbox style={{ backgroundImage: `url(${Step1})` }} />
              <p>STEP 4</p>
              <span style={{ marginBottom: "2%" }}>매칭된 멍친구와</span>
              <span>채팅으로 시간/장소 조율하기</span>
            </CardOne>
          </CardBox>
        </MainBox2>
      </div>
      <div style={{ minWidth: "1440px" }}>
        <Banner style={{ backgroundImage: `url(${bannerHeart})` }} />
      </div>
      <MainBox3>
        <div
          style={{
            display: "flex",
            gap: "6.5em",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0% 17.36%",
          }}
        >
          <div>
            <h1>주인아 월!른 산책 나가개!</h1>
            <span>
              반려견은 집 안에 갇혀 있으면 답답함과 우울함을 느끼게 됩니다.
            </span>
            <br />
            <span>매일 산책을 나가기 힘들다면, 멍친구에게 부탁해 보세요!</span>
          </div>
          <img src={bannerWalk} alt="sadDog" style={{ width: "30em" }} />
        </div>
      </MainBox3>
      <MainBox4 style={{ backgroundImage: `url(${together})` }} />
      <MainBox5>
        <div
          style={{
            display: "flex",
            gap: "6.5em",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0% 17.36%",
          }}
        >
          <div>
            <h1>멍친구는</h1>
            <h1>반려견, 반려인들의 행복을</h1>
            <h1>위해 함께합니다.</h1>
          </div>
          <img src={bannerhands} alt="hands" style={{ width: "29.4em" }} />
        </div>
      </MainBox5>
      <a
        target="blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSfLguQ7YNHIWtGHVjHyDBm0V4XL9rv026hwwhvVgIKE_MgKWg/viewform"
      >
        <Button is_circle type="button">
          EVENT
          <br />
          (~8/2)
        </Button>
      </a>
    </div>
  );
}

const MainBox1 = styled.div`
  /* position: fixed; */
  height: 100%;
  min-height: 40em;
  width: 100%;
  min-width: 1440px;
  /* min-width: 100%; */
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fbf1e8;
  background-size: contain;
  position: relative;
  /* margin-bottom: 115px; */
  margin-bottom: 7.5%;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 20px;
  }
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: #4e4e56;
  }
`;

const MainBox2 = styled.div`
  margin: 0% 17.36%;
  min-width: 940px;
  box-sizing: border-box;
  background-position: center;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 20px;
  }
  span {
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
  /* height: 16em; */
  padding-bottom: 2.4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  border-radius: 12px;

  p {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    margin-top: 0;
  }

  span {
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
  background-position: center;
`;

const Banner = styled.div`
  height: 12.5em;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 7.5% 0;
  min-width: 940px;
  background-position: center;
`;

const MainBox3 = styled.div`
  height: 22em;
  width: 100%;
  min-width: 1440px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 7.5%;
  background-color: #f2f3f6;
  box-sizing: border-box;
  display: block;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 42px;
  }
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
  }
`;

const MainBox4 = styled.div`
  /* height: 792px; */
  height: 47em;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 7.5% 0;
  min-width: 1440px;
`;

const MainBox5 = styled.div`
  height: 22em;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #4e4e56;
  min-width: 1440px;
  box-sizing: border-box;
  display: block;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 25px;
    color: white;
    width: max-content;
  }
`;
export default Main;
