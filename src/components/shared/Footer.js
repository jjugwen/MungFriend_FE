import React from "react";
import styled from "styled-components";
import logoBlack from "../../assets/images/Footer/logoBlack.svg";

function Footer() {
  return (
    <>
      <FooterOutterBox>
        <FooterBox>
          <FooterLogo src={logoBlack} alt="logoBlack" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <div style={sitePromise}>
              <span>이용약관</span>
              <span> | </span>
              <span>개인정보처리방침</span>
            </div>
            <span style={copyright}>
              Copyright ⓒ 2022 (주)멍친구 All Rights Reserved.
            </span>
          </div>
        </FooterBox>
      </FooterOutterBox>
    </>
  );
}

const FooterOutterBox = styled.div`
  width: 100% !important;
  height: 170px;
  background-color: #f2f3f6;
  box-sizing: border-box;
  display: block;
  position: relative;
  bottom: 0;
`;
const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 170px;
  margin: 0% 17.36%;
  align-items: center;
`;

const FooterLogo = styled.img`
  position: relative;
  width: 134px;
  height: 48px;
`;

const copyright = {
  fontFamily: "Pretendard",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "100%",
  color: "#7A7A80",
};

const sitePromise = {
  fontFamily: "Pretendard",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "100%",
  color: "#000000",
};
export default Footer;
