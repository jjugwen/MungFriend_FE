import React from "react";
import styled from "styled-components";
import loadingGIF from "../../assets/images/Errors/Mungloading.gif";

function Sppiner() {
  return (
    <Container>
      <MungFriendloading src={loadingGIF} alt="loading" />
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  /* top: 50%; */
  left: 40%;
  /* transform: translate(-50%, -100%); */
  z-index: 4;
  margin: 10% 5% auto;
  width: 55%;
  height: 80%;
  background-color: white;
`;

const MungFriendloading = styled.img`
  display: block;
  width: 280px;
`;

export default Sppiner;
