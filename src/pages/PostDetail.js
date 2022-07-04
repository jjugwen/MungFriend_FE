import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ApplyComment from "../components/ApplyComment";
import styled from "styled-components";

function PostDetail() {
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.postDetailSlice.list);
  console.log(detailList);
  // console.log(detail_list[0].title);

  return (
    <>
      <div className="DetailTitleBox" style={{ width: "1000px" }}>
        <div style={{ display: "flex" }}>
          <div>{detailList[0].isComplete ? "모집중" : "모집종료"} | </div>
          <div>신청자 {detailList[0].applyList.length}</div>
        </div>
        <h1 className="DetailTitle">{detailList[0].title}</h1>
        <div>
          <div
            className="DetailTitleBottom"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="DetailTitleBottomStart" style={{ display: "flex" }}>
              <MungProfileImgCircle
                style={{
                  backgroundImage: `url(${detailList[0].dogProfileImgUrl})`,
                }}
              />
              <div>
                <div style={{ display: "flex", gap: "5%" }}>
                  <div>{detailList[0].nickname}</div>
                  <div>2km</div>
                </div>
                <div>2022.02.04</div>
              </div>
            </div>
            <div className="DetailTitleBottomEnd">
              요청시간 : {detailList[0].requestStartDate}부터 (1시간)
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="DetailBodyBox" style={{ height: "300px" }}>
        {detailList[0].content}
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
