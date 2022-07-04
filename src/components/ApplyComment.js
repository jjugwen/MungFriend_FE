import React from "react";
import { useSelector } from "react-redux";

function ApplyComment() {
  const detailList = useSelector((state) => state.postDetailSlice.list);
  // console.log(detailList[0].applyList);
  const applyList = detailList[0].applyList;
  // console.log(applyList);
  return (
    <>
      <h1>신청자 댓글</h1>
      <span>총 {detailList[0].applyCount}개</span>
      <hr />
      {applyList.map((value) => {
        // console.log(value);
        return (
          <div key={value.id}>
            <div className="ApplyCommentBox">
              <div style={{ display: "flex" }}>
                <div
                  className="MungProfileImgCircle"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "green",
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    backgroundImage: `url(${value.dogProfileImgUrl})`,
                  }}
                />
                <div>
                  <div>{value.nickname}</div>
                  <div>1분 전</div>
                </div>
                <div className="ApplyCommentText">{value.comment}</div>
                <button>매칭하기</button>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default ApplyComment;
