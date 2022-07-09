import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as Actions } from "../../redux/modules/postDetailSlice";
import { actionCreators as matchActions } from "../../redux/modules/matchingSlice";
import { actionCreators as userActions } from "../../redux/modules/userInfoSlice";
import { useParams } from "react-router-dom";
import UserModal from "../../components/detail/userModal/UserModal";

function ApplyComment() {
  const params = useParams();
  const postId = params.id - 1;
  const dispatch = useDispatch();
  const detailListroot = useSelector((state) => state.postDetailSlice.list);
  const detailList = detailListroot[postId];

  //신청하기 모달창
  const [applyModal, setApplyModal] = useState(false);
  const openApplyModal = () => {
    setApplyModal(true);
  };
  const closeApplyModal = () => {
    setApplyModal(false);
  };

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
                <div className="clickUsermodal">
                  <button
                    onClick={() => {
                      dispatch(
                        userActions.userinfoDB({
                          nickname: detailList?.nickname,
                        })
                      );
                      setTimeout(() => {
                        openApplyModal();
                      }, 500);
                    }}
                    style={{ broder: "none", background: "none" }}
                  >
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div>{value.nickname}</div>
                      <div>{value.createdAt}</div>
                    </div>
                  </button>
                  <UserModal
                    children="프로필"
                    open={applyModal}
                    close={closeApplyModal}
                  />
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
