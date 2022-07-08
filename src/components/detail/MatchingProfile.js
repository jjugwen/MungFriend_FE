import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { actionCreators as matchActions } from "../../redux/modules/matchingSlice";
import WriteModal from "./WriteModal";

function Matching(props) {
  const params = useParams();
  const postId = params.id - 1;
  // const postId = params.id; //전체 페이지 나오면 -1 지정 안하는 게 맞는 듯.
  // console.log(postId);
  const detailListRoot = useSelector((state) => state.postDetailSlice.list);
  const detailList = detailListRoot[postId];
  // console.log(detailList);
  const dispatch = useDispatch();
  //postID 아니고 , 선택한 applyList 번호 ... 리덕스/악시오스로 보내고 가져와야? 리덕스로 가져올 수 있을 듯.
  const now = new Date();
  // console.log(detailList.requestEndDate);
  // console.log(now);
  // console.log(detailList?.requestEndDate - now);

  //후기작성하기 모달창
  const [applyModal, setApplyModal] = useState(false);
  const openApplyModal = () => {
    setApplyModal(true);
  };
  const closeApplyModal = () => {
    setApplyModal(false);
  };

  return (
    <>
      <Container>
        <div className="header">
          <div className="font-20">
            <b className="DogListTitle">매칭한 프로필</b>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 2% auto",
          }}
        >
          <Listbox>
            <DogImg
              src={detailList?.applyList[postId]?.dogProfileImgUrl}
              alt="dogimg"
            />
            <div>
              <div className="font-18">
                {detailList?.applyList[postId]?.nickname}
              </div>
            </div>
            {/* {detailList?.requestEndDate ? ( */}
            {2 > 0 ? (
              <div>
                <button onClick={openApplyModal}>후기작성</button>
                <WriteModal
                  children="후기작성"
                  open={applyModal}
                  close={closeApplyModal}
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  dispatch(matchActions.deleteMatchingDB(params.id)); //params.id  아닌데, 변경 확인 . mockAPi axios 테스트 작동은 확인
                }}
              >
                <span>매칭취소</span>
              </button>
            )}
          </Listbox>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  flex-direction: row;
  width: 706px;
  height: auto;

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

  button {
    background-color: #b8bbc0;
    border-radius: 4px;
    border: none;
    width: 65px;
    height: 30px;
  }
  b {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    color: #ffffff;
  }
  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    color: red;
  }
`;
export default Matching;
