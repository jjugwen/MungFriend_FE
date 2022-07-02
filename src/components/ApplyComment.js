import React from "react";

function ApplyComment() {
  return (
    <>
      <h1>신청자 댓글</h1>
      <span>총 2개</span>
      <hr />

      <div className="ApplyCommentBox">
        <div style={{ display: "flex" }}>
          <div
            className="MungProfileImgCircle"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "green",
              borderRadius: "50%",
            }}
          />
          <div>
            <div>닉네임</div>
            <div>1분 전</div>
          </div>
          <div className="ApplyCommentText">
            신청자 글입니다. 신청자 글입니다. 신청자 글입니다. 신청자 글입니다.
            신청자 글입니다. 신청자 글입니다.
          </div>
          <button>매칭하기</button>
        </div>
      </div>
      <hr />
    </>
  );
}

export default ApplyComment;
