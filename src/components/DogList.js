import React, { useRef} from "react";
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
    // console.log(typeof(e.target.value))
    dispatch(deleteMyMungAX(Number(e.target.value)));
  };
  const modal = () => {
    props.setMungModal(!props.modal);
  };
  const ChoiceRep = (e) => {
    const id = e.target.value;
    instance.put(`api/dogs/${id}`).then((res) => {
      alert(res.data.message)
      window.location.reload(); 
    }); 
                               
    // console.log(id)
  };
 
  return (
    <Container>
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
          <Listbox key={i}   style={ dog.isRepresentative === true? {border:'2px solid #fa5a30'}:{} }>
            <CheckBox
              onClick={ChoiceRep}
              value={dog.id}
              type="radio"
              name="isRepresentative"
              style={ dog.isRepresentative === true? {backgroundColor: '#fa5a30'}:{} }
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
            <DelButton value={dog.id} onClick={deleteDog}>
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

  button {
    font-weight: 500;
    font-size: 14px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    background: #ffffff;
  }
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
  position:absolute;
  right: 3%;
`;
const AddButton = styled.button`
  position: absolute;
  right: 0%;
  height: 40px;
  width: 104px;
  img {
    width: 12px;
    height: 12px;
  }
`;
export default DogList;
