import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ApplyComment from "../components/ApplyComment";
import styled from "styled-components";
import { actionCreators as Actions } from "../redux/modules/postDetailSlice";
import { useParams } from "react-router-dom";

function PostDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.postDetailSlice.list);
  // console.log(detailList);
  useEffect(() => {
    dispatch(Actions.getDetailDB(params.id));
  }, []);

  return (
    <>
      <div className="DetailTitleBox" style={{ width: "1000px" }}>
        <div style={{ display: "flex" }}>
          <div>{detailList.isComplete ? "모집종료" : "모집중"} | </div>
          <div>신청자 {detailList.applyList.length}</div>
        </div>
        <h1 className="DetailTitle">{detailList.title}</h1>
        <div>
          <div
            className="DetailTitleBottom"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="DetailTitleBottomStart" style={{ display: "flex" }}>
              <MungProfileImgCircle
                style={{
                  backgroundImage: `url(${detailList.dogProfileImgUrl})`,
                }}
              />
              <div>
                <div style={{ display: "flex", gap: "5%" }}>
                  <div>{detailList.nickname}</div>
                  <div>2km</div>
                </div>
                <div>2022.02.04</div>
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
      <div style={{ display: "flex" }}>
        {/* <button onClick={dispatch()}>삭제하기</button> */}
        <button>수정하기</button>
      </div>
      {/* {nickname === detailList[0].nickname ?  */}
      <ApplyComment />
      {/* : null } */}
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
