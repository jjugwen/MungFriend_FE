import React from "react";
import styled from "styled-components";
import loadingGIF from "../../assets/images/Errors/Mungloading.gif";

function Sppiner() {
  return <MungFriendloading src={loadingGIF} alt="loading" />;
}

const MungFriendloading = styled.img`
  display: block;
  width: 280px;
  margin: 13% auto;
`;

export default Sppiner;
