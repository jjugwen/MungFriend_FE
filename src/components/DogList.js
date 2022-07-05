import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyPageAX } from "../redux/modules/myPageSlice";
import styled from "styled-components";

function DogList() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);
  const info = useSelector((state) => state.myPageSlice.mypage);

  return (
    <Container>
      <div className="header">
        <div className="font-20">
          <b>멍친구</b>
        </div>
        <div className="font-14">
          * 대표 멍프로필을 선택해주세요. 최대 3마리까지 등록가능합니다.
        </div>
      </div>
      {info?.dogList.map((dog, i) => {
        return (
          <Listbox key={i}>
            <CheckBox>
              <label htmlFor="check2">
                <input
                  className="checkbox2"
                  type="radio"
                  name="isRepresentativ"
                />
              </label>
            </CheckBox>
            <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
            <div>
              <div className="font-18">
                {dog.name} {dog.gender === "여" ? "♀" : "♂"}
              </div>
              <div className="font-16">{dog.size}견</div>
            </div>
          </Listbox>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  flex-direction: row;
  width: 706px;
  height: 294px;
  left: 503px;

  .header {
    display: flex;
    flex-direction: row;
  }

  .font-18 {
    font-weight: 600;
  }

  .font-14 {
    color: #a4a4a4;
    padding: 5px;
    margin-top: 5px;
  }
`;

const DogImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const Listbox = styled.div`
  width: 660px;
  height: 80px;

  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    border: 1px solid black;
  }
  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
`;

const CheckBox = styled.div`
  .checkbox2 {
    margin: 18px;
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50px;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #cccccc;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: black;
    }
  }
`;

export default DogList;
