import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import instance from "../redux/modules/instance";

function Test() {
  const ref_button = useRef();
  const ref_button2 = useRef();

  const click = ()=>{
    ref_button.current.style = 'background-color: green; color:white'
    ref_button2.current.style = ''
  }
  const click2 = ()=>{
    ref_button2.current.style = 'background-color: green; color:white'
    ref_button.current.style = ''
  }
  return (
    <>
    <TestButton ref={ref_button} onClick={click}>버튼입니다</TestButton>
    <TestButton2 ref={ref_button2} onClick={click2}>두번째</TestButton2>
    </>
  )
}

const TestButton=styled.button`
width: 300px;
height: 50px;

`

const TestButton2=styled.button`
width: 300px;
height: 50px;

`
export default Test;