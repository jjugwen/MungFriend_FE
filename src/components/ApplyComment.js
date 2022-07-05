import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as Actions } from "../redux/modules/postDetailSlice";
import { useParams } from "react-router-dom";

function ApplyComment() {
  const params = useParams();
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.postDetailSlice.list);
  // console.log(detailList);

  useEffect(() => {
    dispatch(Actions.getDetailDB(params.id));
  }, []);

  return (
    <>
      <h1>신청자 댓글</h1>
      <span>총 {detailList.applyCount}개</span>
      <hr />
      {detailList.applyList?.map((value) => {
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
