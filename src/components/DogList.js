import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyPageAX } from "../redux/modules/myPageSlice";
import styled from "styled-components";
import { deleteMyMungAX } from "../redux/modules/mungSlice";


function DogList(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);
  
  const info = useSelector((state) => state.myPageSlice.mypage);

  const deleteDog=(e)=>{
    // console.log(typeof(e.target.value))
    dispatch(deleteMyMungAX(Number(e.target.value)));
  }
  const modal = () => {
    props.setMungModal(!props.modal)
  }

  return (
    <Container>
        <div className="row-box">
          <div className="font-20">
            <b>멍친구</b>
          </div>
          <div className="font-14">
            * 대표 멍프로필을 선택해주세요. 최대 3마리까지 등록가능합니다.
        </div>
        <AddButton onClick={modal}><img src="https://ifh.cc/g/NL36Wc.png" alt=""/>추가하기</AddButton>
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
            <div className="name-box">
              <div className="font-18 row-box">
                {dog.name} {dog.gender === "여" ? <div className="orange-color">♀</div> : <div className="blue-color">♂</div>}
              </div>
              <div className="font-16">{dog.size}견</div>
            </div>
            <DelButton  value={dog.id} onClick={deleteDog}>삭제</DelButton>
          </Listbox>
        );
      })}
    </Container>
  );
}


const Container = styled.div`
  flex-direction: row;
  height: 294px;
  left: 503px;
  box-sizing: border-box;
  button{
    font-weight: 500;
    font-size: 14px;
    border: 1px solid #E5E5E5;
border-radius: 4px;
background: #FFFFFF;
  }
  div{margin-left: 5px;}
  
  .font-18 {
    font-weight: 600;
  }

  .font-14 {
    color: #a4a4a4;
    padding: 5px;
    margin-top: 5px;
  }
   .orange-color{
    color: #FA5A30;
    position: relative;
    bottom: 4px;
    }
  .blue-color{
    color: #4F65FF;
    position: relative;
    bottom: 4px;
  }

`;

const DogImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const Listbox = styled.div`
  height: 80px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    border: 2px solid #FA5A30;
  }
  .name-box{
    margin-left: 10px;
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
      background-color: #FA5A30;
    }
  }
`;

const DelButton = styled.button`
position: absolute;
right: 3%;

font-size: 14px;
width: 47px;
height: 30px;
`
const AddButton =styled.button`
position: absolute;
right: 2%;
height: 40px;
width: 104px;
img{
  width: 12px;
  height: 12px;
}

`
export default DogList;
