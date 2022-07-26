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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 4;
`;

const MungFriendloading = styled.img`
  display: block;
  width: 280px;
`;

export default Sppiner;
