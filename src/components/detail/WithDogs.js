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
        <div className="font-20">
          <b className="DogListTitle">함께하는 멍친구</b>
        </div>
      </div>
      {detailList?.dogList?.map((dog) => {
        return (
          <div
            key={dog.id}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0 2% auto",
            }}
          >
            <Listbox>
              <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
              <div>
                <div className="font-18">
                  {dog.name} {dog.gender === "여" ? "♀" : "♂"}
                </div>
                <div style={{ display: "flex", gap: "5%", width: "100px" }}>
                  {dog.age}세<div className="font-16">{dog.size}견</div>
                </div>
              </div>
            </Listbox>
          </div>
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

  .font-20 {
    font-size: 20px;
  }
  .font-18 {
    font-size: 18px;
    font-weight: 600;
  }
  .font-16 {
    font-size: 16px;
  }
  .font-14 {
    font-size: 14px;
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
  width: 900px;
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

export default DogList;
