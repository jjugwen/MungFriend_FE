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
    <div>
      {open ? (
        <>
          <div
            className={open ? "openModalcss" : null}
            onClick={() => {
              close();
            }}
          />
        <Container>
          <p className="font-24">
            <b>멍프로필</b>
          </p>
          <Button
            top="1.8em"
            closeBtn
            _onClick={() => {
              close();
            }}
          />
          <PreviewImg
            src={
              mung?.dogImageFiles[0]?.imageUrl
                ? mung?.dogImageFiles[0]?.imageUrl
                : `${process.env.REACT_APP_IMAGE_URL}/Yebin/addProfile.png`
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
            <MunginfoText readOnly value={mung?.info ? mung?.info : ""}>
              {mung?.info}
            </MunginfoText>
          </div>
          <div className="btn-box">
            <Button orange_large _onClick={close}>
              확인
            </Button>
          </div>
        </Container>
        </>
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
  overflow-y: scroll;
  max-height: calc(100vh - 50px);
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 4px; //스크롤 폭
  }
  ::-webkit-scrollbar-track {
    // 스크롤이 움직이는 영역
    background-color: #e3e5e9;
  }
  ::-webkit-scrollbar-button {
    //  스크롤의 화살표가 포함된 영역
    display: block;
    height: 40px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #fa5a30;
    border-radius: 15px;
  }
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

const MunginfoText = styled.textarea`
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PreviewImg = styled.img`
  width: 140px;
  height: 140px;
  background-color: #d9d9d9;
  border-radius: 50%;
  /* border: none; */
`;

export default DogProfileViewModal;
