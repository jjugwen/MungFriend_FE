import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { actionCreators as matchActions } from "../../redux/modules/matchingSlice";
import WriteModal from "./WriteModal";

function Matching(props) {
  const params = useParams();
  const postId = Number(params.id);
  // console.log(postId);
  const detailList = useSelector((state) => state.postDetailSlice.list);
  // console.log(detailList);

  const dispatch = useDispatch();
  //후기작성하기 모달창
  const [Modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  //시간 계산
  const now = new Date().getTime();
  const endTime = new Date(detailList?.requestEndDate).getTime();

  const nowMinusEndTime = () => {
    return endTime - now >= 0 ? true : false;
  };
  // console.log(nowMinusEndTime());

  return (
    <>
      <Container>
        <div className="header">
          <h1 className="DetailTitle">매칭한 프로필</h1>
        </div>

        <Listbox>
          <DogImg src={detailList?.matchedDogProfileImgUrl} alt="dogimg" />
          <p>{detailList?.matchedNickname}</p>
          {nowMinusEndTime() ? ( //산책종료 시간 - 현재시간 >= 0 이면 매칭취소 버튼
            <CancleBtn
              onClick={() => {
                dispatch(matchActions.deleteMatchingDB(postId));
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
            >
              매칭취소
            </CancleBtn>
          ) : (
            // 시간 지났으면 후기작성
            <div>
              <ReviewBtn onClick={openModal}>후기작성</ReviewBtn>
              <WriteModal children="후기작성" open={Modal} close={closeModal} />
            </div>
          )}
        </Listbox>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8.4% 0; //80px
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

  p {
    margin: 0 30% 0 12px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    width: 200px;
    color: #121212;
  }
`;

const ReviewBtn = styled.button`
  background-color: #fa5a30;
  color: white;
  border-radius: 4px;
  border: none;
  width: 65px;
  height: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
`;

const CancleBtn = styled.button`
  background-color: #b8bbc0;
  border-radius: 4px;
  border: none;
  width: 65px;
  height: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: white;
`;
export default Matching;
