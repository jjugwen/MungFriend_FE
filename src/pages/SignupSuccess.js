import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignupSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <OutterBox>
          <CircleImg src="" alt="" />
          <Text1>회원가입이 완료되었습니다.</Text1>
          <Text2>
            멍친구의 회원이 되신 것을 환영합니다! <br />
            아래 버튼을 누르시면 로그인 페이지로 이동합니다.
          </Text2>
          <div style={{ display: "flex" }}>
            <WhiteButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ButtonText>메인으로</ButtonText>
            </WhiteButton>
            <GrayButton
              onClick={() => {
                navigate("/login");
              }}
            >
              <ButtonText>로그인</ButtonText>
            </GrayButton>
          </div>
        </OutterBox>
      </div>
    </>
  );
}

const OutterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30vh 500px;
  background-color: #f5f5f5;
  /* width: 100%;
  max-width: 500px; */
`;

const CircleImg = styled.div`
  width: 140px;
  height: 140px;
  left: 650px;
  top: 337px;
  border-radius: 50%;
  margin-bottom: 40px;
  background: yellow;
`;

const Text1 = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 100%;
  margin-bottom: 30px;
`;

const Text2 = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 60px;
`;

const WhiteButton = styled.div`
  width: 214px;
  height: 60px;
  border-radius: 8px;
  background: #fff;
`;

const GrayButton = styled.div`
  width: 214px;
  height: 60px;
  border-radius: 8px;
  background: #a4a4a4;
  color: #ffffff;
`;
const ButtonText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  margin: 18px 72px;
`;

export default SignupSuccess;
