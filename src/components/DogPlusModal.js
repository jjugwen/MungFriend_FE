import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMungAX } from "../redux/modules/mungSlice";
import styled from "styled-components";

function DogPlusModal() {
  //이미지를 한번 추가해볼게요
  const [mungImage, setMungImage] = useState({
    image: "",
    previewUrl: "",
  });

  const addImage = (event) => {
    //어떤 이벤트를 명시적으로 처리하지 않은경우,
    //해당 이벤트에 대한 기본동작을 실행하지 않음
    event.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);

    fileReader.onload = (e) => {
      setMungImage({
        image_file: event.target.files[0],
        previewUrl: e.target.result,
      });
      console.log(event.target.files[0]);
    };
  };
  const dispatch = useDispatch();
  //강아지 정보
  //age는 숫자로 받아와야 함
  const [puppy, setpuppy] = useState({});
  // 강아지 정보 input 입력값 넣어두기
  //나이는 숫자데이터 . if문 사용해서 숫자로 감싸주기
  const handleChange = (prop) => (e) => {
    if (prop !== "age") {
      setpuppy({ ...puppy, [prop]: e.target.value });
    } else {
      setpuppy({ ...puppy, [prop]: Number(e.target.value) });
    }
    console.log(puppy);
  };

  const signUp = () => {
    const formData = new FormData();
    formData.append("image", mungImage.image);
    const json = JSON.stringify(puppy);
    const blob = new Blob([json], { type: "application/json" });
    //infos 추가
    formData.append("infos", blob);

    dispatch(createMungAX(formData));
    //이미지 서버에 다 보내고 나서 다시 초기값 만들기
    setMungImage({
      image_file: "",
      previewUrl: "img/default_image.png",
    });
  };
  return (
    <Container>
      <p className="font-24">
        <b>멍친구 등록</b>
      </p>
      <PreviewImg
        src={
          mungImage.previewUrl
            ? mungImage.previewUrl
            : "https://ifh.cc/g/87kbto.png"
        }
        alt=""
      />
      <PreviewBtn>
        <label className="input-button" htmlFor="input-file">
          <img
            src="https://cdn-icons-png.flaticon.com/512/748/748113.png"
            alt=""
          />
        </label>
        <input
          type="file"
          accept="images/*"
          onChange={addImage}
          id="input-file"
          className="filebtn"
        />{" "}
        {/*스타일 diaplay none으로, 커스텀할려면 라벨링*/}
      </PreviewBtn>
      <div className="wrap">
        <div className="row-box">
          <div className="column-box">
            <b>이름</b>
            <input
              className="box-size"
              onChange={handleChange("name")}
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="column-box">
            <b>성별</b>
            <select className="box-size" onChange={handleChange("gender")}>
              <option value="no">성별을 선택해 주세요</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>
        </div>
        <div className="row-box">
          <div className="column-box ">
            <b>나이</b>
            <input
              className="box-size"
              type="number"
              max="30"
              onChange={handleChange("age")}
              placeholder="나이를 입력해주세요."
            />
          </div>
          <div className="column-box">
            <b>사이즈</b>
            <select className="box-size" onChange={handleChange("size")}>
              <option value="no">크기를 선택해 주세요</option>
              <option value="소형">소형</option>
              <option value="중형">중형</option>
              <option value="대형">대형</option>
            </select>
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
        <textarea
          onChange={handleChange("info")}
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div className="btn-box">
        <button> 취소 </button>
        <button type="submit" onClick={signUp}>
          확인
        </button>
      </div>
    </Container>
  );
}
const Container = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 520px;
  height: 854px;

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
    textarea {
      box-sizing: border-box;
      width: 445px;
      height: 180px;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      font-family: 'Pretendard';
      font-size: 16px;
      padding: 10px;
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
  left: 290px;
  top: 230px;

  img {
    width: 20px;
    height: 20px;
  }
  .input-button {
    width: 40px;
    line-height: 40px;
    padding: 13px 9px 4px 9px;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    color: #d9d9d9;
    /* cursor: pointer; */
  }
  .filebtn {
    display: none;
  }
`;

export default DogPlusModal;
