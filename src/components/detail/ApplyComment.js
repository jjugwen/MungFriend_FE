import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as Actions } from "../../redux/modules/postDetailSlice";
import { actionCreators as matchActions } from "../../redux/modules/matchingSlice";
import { useParams } from "react-router-dom";

function ApplyComment() {
  const params = useParams();
  const postId = params.id - 1;
  const dispatch = useDispatch();
  const detailListroot = useSelector((state) => state.postDetailSlice.list);
  const detailList = detailListroot[postId];

  useEffect(() => {
    dispatch(Actions.getDetailDB(params.id));
  }, [params.id]);

  return (
    <>
      <h1>신청자 댓글</h1>
      <span>총 {detailList?.applyCount}개</span>
      <hr />
      {detailList?.applyList?.map((value) => {
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
                  <div>{value.createdAt}</div>
                </div>
                <div className="ApplyCommentText">{value.comment}</div>
                {/* isComplete가 false면 매칭하기 버튼 활성화 / true면 비활성화 */}
                <button
                  onClick={() => {
                    // console.log(value.id);
                    dispatch(matchActions.createMatchingDB(value.id));
                  }}
                >
                  매칭하기
                </button>
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
