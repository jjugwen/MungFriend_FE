import React from "react";
import styled from "styled-components";
import loadingGIF from "../../assets/images/Errors/Mungloading.gif";

function Sppiner() {

  return(
  <Container>
    <div> 잠시만 기다려주세요</div>
  <MungFriendloading src={loadingGIF} alt="loading" />
  </Container>
  ) 
  
}
const Container= styled.div`
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 4;
div{
 font-size: 30px;
 font-weight: 600;
 text-align: center;

}
`

const MungFriendloading = styled.img`

  display: block;
  width: 280px;
  margin: 13% auto;

`;

export default Sppiner;
