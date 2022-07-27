import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteMyMungAX, loadMyMungAX } from "../redux/modules/mungSlice";
import instance from "../redux/modules/instance";

function DogList(props) {
  const dispatch = useDispatch();
  //대표멍멍이 선택시 스타일 유지

  React.useEffect(() => {
    dispatch(loadMyMungAX());
  }, []);

  const info = useSelector((state) => state.mungSlice.mung);
  // console.log(info)

  const deleteDog = (e) => {
    console.log(e.target.value);
    dispatch(deleteMyMungAX(Number(e.target.value)));
  };
  const modal = () => {
    props.setMungModal(!props.modal);
  };
  const ChoiceRep = (e) => {
    const id = e.target.value;
    instance.put(`api/dogs/${id}`).then((res) => {
      alert(res.data.message);
      window.location.reload();
    });

    // console.log(id)
  };
  //삭제 모달창
  const [delDog, setDelDog] = useState(false);
  const [delDogId, setDelDogId] = useState();
  return (
    <Container>
      {delDog && (
        <Test
          onClick={() => {
            setDelDog(!delDog);
          }}
        />
      )}
      {delDog && (
        <DelModal>
          <XBtn
            onClick={() => {
              setDelDog(!delDog);
            }}
          >
            X
          </XBtn>
          <DelText>
            {" "}
            멍멍이를 삭제하면 <br />
            해당 멍멍이와 관련된 <b>모든 정보가 삭제됩니다.</b>
            <br />
            그래도 삭제 하시겠습니까?
          </DelText>
          <RowBox>
            <NoBtn
              onClick={() => {
                setDelDog(!delDog);
              }}
            >
              아니요. 삭제하지 않겠습니다
            </NoBtn>
            <OkBtn value={delDogId} onClick={deleteDog}>
              네. 삭제하겠습니다
            </OkBtn>
          </RowBox>
        </DelModal>
      )}
      <RowBox>
        <TextBox20>멍프로필</TextBox20>
        <TextBox14>
          * 대표 멍프로필을 선택해주세요. 최대 3마리까지 등록가능합니다.
        </TextBox14>
        <AddButton onClick={modal}>
          <img src="https://ifh.cc/g/NL36Wc.png" alt="" />
          추가하기
        </AddButton>
      </RowBox>
      {info?.map((dog, i) => {
        return (
          <Listbox
            key={i}
            style={
              dog.isRepresentative === true
                ? { border: "2px solid #fa5a30" }
                : {}
            }
          >
            <CheckBox
              onClick={ChoiceRep}
              value={dog.id}
              type="radio"
              name="isRepresentative"
              style={
                dog.isRepresentative === true
                  ? { backgroundColor: "#fa5a30" }
                  : {}
              }
            />
            <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
            <div>
              <RowBox>
                <TextBox16>
                  {dog.name}
                  {dog.gender === "여" ? (
                    <img src="https://ifh.cc/g/1DDK9D.png" alt="" />
                  ) : (
                    <img src="https://ifh.cc/g/WP9vdy.png" alt="" />
                  )}
                </TextBox16>
              </RowBox>
              <TextBox14>
                {dog.age}세, {dog.size}견
              </TextBox14>
            </div>
            <DelButton
              value={dog.id}
              onClick={() => {
                setDelDog(!delDog);
                setDelDogId(dog.id);
              }}
            >
              삭제
            </DelButton>
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

  div {
    margin-left: 5px;
  }
  .font-18 {
    font-weight: 600;
  }
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextBox20 = styled.div`
  font-weight: 600;
  font-size: 20px;
`;

const TextBox14 = styled.div`
  font-size: 14px;
  color: #7a7a80;
  padding: 5px;
  margin-top: 5px;
`;
const CheckBox = styled.input`
  cursor: pointer;
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
    background-color: #fa5a30;
  }
`;
const DogImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const TextBox16 = styled.div`
  font-weight: 600;
  font-size: 16px;
  img {
    margin-left: 5px;
    width: 17px;
    height: 17px;
  }
`;

const Listbox = styled.div`
  height: 80px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    border: 2px solid #fa5a30;
  }
  .name-box {
    margin-left: 10px;
  }
  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
`;

const DelButton = styled.button`
  font-size: 14px;
  width: 47px;
  height: 30px;
  position: absolute;
  right: 3%;
  background: #ffffff;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
`;
const AddButton = styled.button`
  position: absolute;
  right: 0%;
  height: 40px;
  width: 104px;
  background: #ffffff;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  img {
    width: 12px;
    height: 12px;
  }
`;
//모달창 css
const Test = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const DelModal = styled.div`
  background-color: white;
  width: 450px;
  height: 200px;
  border-radius: 14px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`;
const XBtn = styled.button`
  border: none;
  background-color: white;
  font-size: 25px;
  font-weight: 500;
  position: fixed;
  right: 3%;
  top: 3%;
`;

const DelText = styled.div`
  box-sizing: border-box;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  b {
    color: red;
  }
`;
const NoBtn = styled.button`
  position: absolute;
  bottom: 5%;
  left: 2%;
  width: 47%;
  height: 48px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;
const OkBtn = styled.button`
  position: absolute;
  bottom: 5%;
  right: 2%;
  width: 47%;
  margin-left: 2%;
  height: 48px;
  color: white;
  background-color: #fa5a30;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;

export default DogList;
