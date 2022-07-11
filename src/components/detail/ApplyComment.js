import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as Actions } from "../../redux/modules/postDetailSlice";
import { actionCreators as matchActions } from "../../redux/modules/matchingSlice";
import { actionCreators as userActions } from "../../redux/modules/userInfoSlice";
import { useParams } from "react-router-dom";
import UserModal from "../../components/detail/userModal/UserModal";
import styled from "styled-components";
import Button from "../../elements/Button";

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
              {/* <div className="clickUsermodal"> */}
              <UserModalBtn
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
              >
                <div className="clickUsermodal">
                  <div
                    className="MungProfileImgCircle"
                    style={{
                      backgroundImage: `url(${value.dogProfileImgUrl})`,
                    }}
                  />
                  <div className="NickAndDistanceAndDate">
                    <p>{value.nickname}</p>
                    <span>
                      {value.createdAt
                        ?.slice(5, 10) /* 시간 2022-06-26 */
                        /* -를 .으로 2022.06.26 */
                        .replace(/\-/g, ".")}
                    </span>
                  </div>
                </div>
              </UserModalBtn>
              <UserModal
                children="프로필"
                open={applyModal}
                close={closeApplyModal}
              />

              <div className="ApplyCommentText">{value.comment}</div>
              {/* isComplete가 false면 매칭하기 버튼 활성화 / true면 비활성화 */}
              {detailList?.isComplete ? (
                <Button MatchingBtn _disabled>
                  매칭하기
                </Button>
              ) : (
                <Button
                  MatchingBtn
                  _onClick={() => {
                    // console.log(value.id);
                    dispatch(matchActions.createMatchingDB(value.id));
                    setTimeout(() => {
                      window.location.reload();
                    }, 300);
                  }}
                >
                  매칭하기
                </Button>
              )}
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
}

const UserModalBtn = styled.button`
  border: none;
  background: none;
  text-align: start;

  p {
    margin: 0;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
  }

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #7a7a80;
  }
`;

export default ApplyComment;
