import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ApplyComment from "../components/ApplyComment";
import styled from "styled-components";
import "../elements/postDetailStyle.css";
import { actionCreators as postActions } from "../redux/modules/postDetailSlice";
import { actionCreators as userActions } from "../redux/modules/userInfoSlice";
import { useParams } from "react-router-dom";
import WithDogs from "../components/WithDogs";
import WriteModal from "../components/WriteModal";

function PostDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.postDetailSlice.list);
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
            <div>{detailList.isComplete ? "모집종료" : "모집중"}</div>{" "}
            <div>|</div>
            <div>신청자 {detailList.applyList?.length}</div>
          </div>
          <h1 className="DetailTitle">{detailList.title}</h1>
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
                    backgroundImage: `url(${detailList.dogProfileImgUrl})`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", gap: "5%", width: "170px" }}>
                    <div>{detailList.nickname}</div>
                    {/* 소수점 첫째자리까지 반올림 */}
                    <div>{detailList.distance?.toFixed(1)}km</div>
                  </div>
                  <div>{detailList.modifiedAt?.slice(0, 10)}</div>
                </div>
              </div>
              <div className="DetailTitleBottomEnd">
                요청시간 : {detailList.requestStartDate}부터 (1시간)
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="DetailBodyBox" style={{ height: "300px" }}>
          {detailList.content}
        </div>
        <hr />
        <WithDogs />
        {!(myinfo?.nickname === detailList?.nickname) ? (
          <div>
            <div style={{ display: "flex" }}>
              <button onClick={deletePost}>삭제하기</button>
              <button>수정하기</button>
            </div>
            <ApplyComment />
          </div>
        ) : detailList.applyByMe ? (
          <button>신청취소</button>
        ) : (
          <div>
            <button onClick={openApplyModal}>신청하기</button>
            <WriteModal
              children="신청하기"
              open={applyModal}
              close={closeApplyModal}
            />
          </div>
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
