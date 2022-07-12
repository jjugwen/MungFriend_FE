//게시글 상세페이지 함께하는 멍친구 , 매칭한 프로필 멍멍이 정보 컴포넌트

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as Actions } from "../../redux/modules/postDetailSlice";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function DogList() {
  const params = useParams();
  const postId = params.id - 1;
  const dispatch = useDispatch();
  const detailListRoot = useSelector((state) => state.postDetailSlice.list);
  const detailList = detailListRoot[postId];
  // console.log(detailList);
  useEffect(() => {
    dispatch(Actions.getDetailDB(params.id));
  }, []);

  return (
    <Container>
      <div className="header">
        <h1 className="DetailTitle">함께하는 멍친구</h1>
      </div>
      <ListOutterBox>
        {detailList?.dogList?.map((dog) => {
          return (
            <Listbox key={dog.id}>
              <div className="betweenDogPicAndDogInfo">
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

const DogImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const Listbox = styled.div`
  width: 100%;
  max-width: 28.7em;
  /* max-width: 460px; */
  padding: 2.24%; //1.25em //20px

  display: flex;
  flex-direction: row;
  align-items: center;

  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  border-radius: 8px;
`;

export default DogList;
