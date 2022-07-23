//게시글 상세페이지 함께하는 멍친구 , 매칭한 프로필 멍멍이 정보 컴포넌트

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as Actions } from "../../../redux/modules/postDetailSlice";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DogProfileViewModal from "./DogProfileViewModal";

function DogList() {
  const params = useParams();
  const postId = Number(params.id);
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.postDetailSlice.list);
  // console.log(detailList);
  useEffect(() => {
    dispatch(Actions.getDetailDB(postId));
  }, []);

  //함께하는 멍멍이 '멍프로필' 모달창 여닫기
  const [mungModal, setMungModal] = useState(false);
  const openMungModal = () => {
    setMungModal(true);
  };
  const closeMungModal = () => {
    setMungModal(false);
  };

  //멍프로필 조회 인덱스값 넘겨주기
  const [idx, setIdx] = useState(0);

  return (
    <Container>
      <div className="header">
        <h1 className="DetailTitle">함께하는 멍멍이</h1>
      </div>
      <ListOutterBox>
        {detailList?.dogList?.map((dog, index) => {
          return (
            <Listbox key={dog.id}>
              <BetweenDogPicAndDogInfo>
                <DogImg src={dog.dogImageFiles[0].imageUrl} alt="dogUrl" />
                <div style={{ width: "100%", minWidth: "80px" }}>
                  <div className="WithDogsDogName">
                    {dog.name}{" "}
                    {dog.gender === "여" ? (
                      <span style={{ color: "#FA5A30" }}>♀</span>
                    ) : (
                      <span style={{ color: "#4F65FF" }}>♂</span>
                    )}
                  </div>
                  <span className="WithDogsAgeAndSize">
                    {dog.age}세, {dog.size}견
                  </span>
                </div>
              </BetweenDogPicAndDogInfo>
              <div>
                <MungProfileBtn
                  onClick={() => {
                    setIdx(index);
                    setTimeout(() => {
                      openMungModal();
                    }, 100);
                  }}
                >
                  프로필
                </MungProfileBtn>
                <DogProfileViewModal
                  open={mungModal}
                  close={closeMungModal}
                  index={idx}
                />
              </div>
            </Listbox>
          );
        })}
      </ListOutterBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
`;

const ListOutterBox = styled.div`
  display: flex;
  gap: 2%;
  justify-content: flex-start;
`;
const BetweenDogPicAndDogInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3%;
  width: max-content;
  box-sizing: content-box;
`;

const DogImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const Listbox = styled.div`
  width: 100%;
  max-width: 28.7em;
  /* max-width: 460px; */
  padding: 2.24%; //1.25em //20px

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  border-radius: 8px;
`;

const MungProfileBtn = styled.button`
  background: #ffffff;
  border: 1px solid #e3e5e9;
  border-radius: 4px;
  width: 65px;
  height: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
`;

export default DogList;
