import React from "react";
import ApplyComment from "../components/ApplyComment";

function PostDetail() {
  return (
    <>
      <div className="DetailTitleBox" style={{ width: "1000px" }}>
        <div style={{ display: "flex" }}>
          <div>모집중 | </div>
          <div>신청자 46</div>
        </div>
        <h1 className="DetailTitle">제목입니다.제목입니다.제목입니다.</h1>
        <div>
          <div
            className="DetailTitleBottom"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="DetailTitleBottomStart" style={{ display: "flex" }}>
              <div
                className="MungProfileImgCircle"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              >
                img
              </div>
              <div>
                <div style={{ display: "flex", gap: "5%" }}>
                  <div>닉네임</div>
                  <div>2km</div>
                </div>
                <div>2022.02.04</div>
              </div>
            </div>
            <div className="DetailTitleBottomEnd">
              요청시간 : 2022.07.12 15시 30분부터 (1시간)
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="DetailBodyBox" style={{ height: "300px" }}>
        게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
        내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
        게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
        내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
        게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
        내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
        게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
        내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
        게시글 내용입니다. 게시글 내용입니다.
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <button>삭제하기</button>
        <button>수정하기</button>
      </div>
      <ApplyComment />
    </>
  );
}

export default PostDetail;
