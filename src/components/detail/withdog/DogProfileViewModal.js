import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../elements/Button";

function DogProfileViewModal(props) {
  const { open, close, index } = props;
  //   console.log(index);
  //멍프로필 정보
  const mung = useSelector(
    (state) => state.postDetailSlice.list.dogList[index]
  );
  //   console.log(mung[index]);

  return (
    <div className={open ? "openModalcss" : null}>
      {open ? (
        <Container>
          <p className="font-24">
            <b>멍프로필</b>
          </p>
          <PreviewImg
            src={
              mung?.dogImageFiles[0]?.imageUrl
                ? mung?.dogImageFiles[0]?.imageUrl
                : "https://ifh.cc/g/87kbto.png"
            }
            alt=""
          />
          <div className="wrap">
            <div className="row-box">
              <div className="column-box">
                <b>이름</b>
                <div className="box-size">
                  <p>{mung?.name}</p>
                </div>
              </div>
              <div className="column-box">
                <b>성별</b>
                <div className="box-size">
                  <p>{mung?.gender}</p>
                </div>
              </div>
            </div>
            <div className="row-box">
              <div className="column-box ">
                <b>나이</b>
                <div className="box-size">
                  <p>{mung?.age}</p>
                </div>
              </div>
              <div className="column-box">
                <b>사이즈</b>
                <div className="box-size">
                  <p>{mung?.size}</p>
                </div>
              </div>
            </div>
            <p>
              <b>몸무게별 사이즈 안내</b>
            </p>
            <div className="info-box">
              ~10키로 : 소형견
              <br />
              10~20키로 : 중형견
              <br />
              20키로 이상 : 대형견
              <br />
            </div>
            <p>
              <b>견종이나 유의사항 등 추가할 정보</b>
            </p>
            <div className="munginfoText">{mung?.info}</div>
          </div>
          <div className="btn-box">
            <Button orange_large _onClick={close}>
              확인
            </Button>
          </div>
        </Container>
      ) : null}
    </div>
  );
}
const Container = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 520px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 3;
  border-radius: 24px;
  align-items: center;
  text-align: center;
  /* position: absolute;
left: 460px;
top: 73px; */
  .wrap {
    width: 450px;
    margin: auto;
    text-align: left;
    div {
      margin-top: 10px;
    }
    .munginfoText {
      box-sizing: border-box;
      width: 445px;
      height: 180px;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      font-family: "Pretendard";
      font-size: 16px;
      padding: 10px;
      resize: none;
      :focus {
        outline: none;
      }
    }
    .info-box {
      box-sizing: border-box;
      padding: 15px;
      height: 92px;
      background: #efefef;
      border-radius: 4px;
    }

    .column-box {
      text-align: left;
      margin: auto;

      p {
        margin-left: 5%;
      }
    }
  }
  .box-size {
    width: 214px;
    height: 48px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }
  .btn-box {
    margin-top: 20px;
    button {
      margin: 10px;
      width: 214px;
      height: 48px;
      border: none;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const PreviewImg = styled.img`
  width: 140px;
  height: 140px;
  background-color: #d9d9d9;
  border-radius: 50%;
  /* border: none; */
`;
const PreviewBtn = styled.div`
  position: absolute;
  left: 55%;
  top: 20%;

  img {
    width: 20px;
    height: 20px;
  }
  .input-button {
    width: 40px;
    line-height: 40px;
    padding: 13px 9px 4px 9px;
    background-color: #fa5a30;
    border: 1px solid;
    border-radius: 50%;
    /* cursor: pointer; */
  }
  .filebtn {
    display: none;
  }
`;

export default DogProfileViewModal;
