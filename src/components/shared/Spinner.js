import React from "react";
import styled from "styled-components";

function Sppiner(props) {
  return (
    <Container>
      <MungFriendloading
        src={`${props.imgURL}/Errors/Mungloading.gif`}
        alt="loading"
      />
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
