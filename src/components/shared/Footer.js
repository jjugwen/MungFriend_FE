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
              <span>
                <a
                  target="blank"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    zIndex: 3,
                  }}
                  href="https://protective-iodine-bc7.notion.site/bbd8abbf735140109899396c1c87dc61"
                >
                  이용약관
                </a>
              </span>

              <span> | </span>
              <span>
                <a
                  target="blank"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    zIndex: 3,
                  }}
                  href="https://protective-iodine-bc7.notion.site/78bef62511ef4254bfaa1638d1550fe0"
                >
                  개인정보취급방침
                </a>
              </span>
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
  min-width: 1440px;
  height: 170px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  display: block;
  position: relative;
  bottom: 0;
  z-index: 1;
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
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "100%",
  color: "#7A7A80",
  marginTop: "3.7%",
};

const sitePromise = {
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "100%",
  color: "#000000",
};
export default Footer;
