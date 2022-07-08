import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ApplyComment from "../components/detail/ApplyComment";
import styled from "styled-components";
import "../elements/postDetailStyle.css";
import { actionCreators as postActions } from "../redux/modules/postDetailSlice";
import { actionCreators as userActions } from "../redux/modules/userInfoSlice";
import { actionCreators as applyActions } from "../redux/modules/applySlice";
import { useParams } from "react-router-dom";
import WithDogs from "../components/detail/WithDogs";
import WriteModal from "../components/detail/WriteModal";
import MatchingProfile from "../components/detail/MatchingProfile";

function PostDetail() {
  const params = useParams();
  const postId = params.id - 1;
  // const postId = params.id; //전체 페이지 나오면 -1 지정 안하는 게 맞는 듯.
  // console.log(postId);
  const dispatch = useDispatch();
  const detailListRoot = useSelector((state) => state.postDetailSlice.list);
  const detailList = detailListRoot[postId];
  // console.log(detailList);
  //신청하기 모달창
  const [applyModal, setApplyModal] = useState(false);
  const openApplyModal = () => {
    setApplyModal(true);
  };
  const closeApplyModal = () => {
    setApplyModal(false);
  };

  //작성자 확인 및 정보 모달 확인 시 필요
  const myinfo = useSelector((state) => state.userInfoSlice.myInfo);

  //신청자 정보 모달 확인 시 필요
  const userinfo = useSelector((state) => state.userInfoSlice.userInfo);

  const deletePost = () => {
    dispatch(postActions.deleteDetailDB(params.id));
  };

  useEffect(() => {
    dispatch(postActions.getDetailDB(params.id));
    dispatch(userActions.myinfoDB());
    dispatch(userActions.userinfoDB());
  }, []);

  return (
    <>
      <div className="DetailOutterBox">
        <div className="DetailTitleBox">
          <div style={{ display: "flex", gap: "1%" }}>
            <div>{detailList?.isComplete ? "모집종료" : "모집중"}</div>{" "}
            <div>|</div>
            <div>신청자 {detailList?.applyList?.length}</div>
          </div>
          <h1 className="DetailTitle">{detailList?.title}</h1>
          <div>
            <div
              className="DetailTitleBottom"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                className="DetailTitleBottomStart"
                style={{ display: "flex", alignItems: "center" }}
              >
                <MungProfileImgCircle
                  style={{
                    backgroundImage: `url(${detailList?.dogProfileImgUrl})`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", gap: "5%", width: "170px" }}>
                    <div>{detailList?.nickname}</div>
                    {/* 소수점 첫째자리까지 반올림 */}
                    <div>{detailList?.distance?.toFixed(1)}km</div>
                  </div>
                  <div>{detailList?.modifiedAt?.slice(0, 10)}</div>
                </div>
              </div>
              <div className="DetailTitleBottomEnd">
                요청시간 : {detailList?.requestStartDate}부터 (1시간)
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="DetailBodyBox" style={{ height: "300px" }}>
          {detailList?.content}
        </div>
        <hr />
        <WithDogs />
        {myinfo?.nickname === detailList?.nickname ? (
          detailList?.applyByMe ? (
            <button
              onClick={() => {
                dispatch(applyActions.deleteApplyDB(params.id));
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
            >
              신청취소
            </button>
          ) : (
            <div>
              <button onClick={openApplyModal}>신청하기</button>
              <WriteModal
                children="신청하기"
                open={applyModal}
                close={closeApplyModal}
              />
            </div>
          )
        ) : myinfo?.nickname !== detailList?.nickname &&
          detailList?.isComplete !== false ? (
          <div>
            <div style={{ display: "flex" }}>
              <button onClick={deletePost}>삭제하기</button>
              <button>수정하기</button>
            </div>
            <ApplyComment />
          </div>
        ) : (
          <>
            <MatchingProfile />
            <ApplyComment />
          </>
        )}
      </div>
    </>
  );
}

const MungProfileImgCircle = styled.div`
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 50%;
`;

export default PostDetail;
