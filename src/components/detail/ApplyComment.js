import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as matchActions } from "../../shared/API/matchingApi";
import { actionCreators as userActions } from "../../redux/modules/userInfoSlice";
import { useParams } from "react-router-dom";
import UserModal from "../../components/detail/userModal/UserModal";
import styled from "styled-components";
import Button from "../../elements/Button";
import { timeForToday } from "./TimeCalculator";
//chat
import { createChannel } from "../../redux/modules/chat/channelSlice";
import CautionButton from "../../elements/CautionButton";

function ApplyComment() {
  const params = useParams();
  const postId = Number(params.id);
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

  const loginNickname = useSelector(
    (state) => state.userInfoSlice.myInfo.nickname
  );

  //신청글 더보기
  const [limit, setLimit] = useState(5);
  const moreApply = detailList?.applyList?.slice(0, limit);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // marginTop: "8.4%",
        }}
      >
        <h1 className="DetailTitle">신청자 댓글</h1>
        <CautionButton margin="8px 0 40px 0" />
      </div>
      <span>
        총 <span style={{ color: "#FA5A30" }}>{detailList?.applyCount}</span>개
      </span>
      <hr style={{ border: "1px solid black" }} />
      {moreApply?.map((value) => {
        return (
          <div key={value.id}>
            <div className="ApplyCommentBox">
              <div style={{ display: "flex", alignItems: "center" }}>
                <UserModalBtn
                  onClick={() => {
                    dispatch(userActions.userinfoDB(value.nickname));
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
                      {/* 닉네임 길면 뒤에 ..으로 대체 */}
                      <p>
                        {value.nickname?.slice(0, 11) +
                          value.nickname
                            ?.slice(11)
                            .replace(/[^]/gi, "..")
                            .slice(0, 2)}
                      </p>
                      <span>{timeForToday(value.createdAt)}</span>
                    </div>
                  </div>
                </UserModalBtn>
                <UserModal
                  children="프로필"
                  open={applyModal}
                  close={closeApplyModal}
                />

                <p className="ApplyCommentText">{value.comment}</p>
              </div>
              {loginNickname === detailList?.nickname ? (
                <>
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
                        dispatch(
                          matchActions.createMatchingDB(value.id, postId)
                        );
                        dispatch(
                          createChannel({
                            nickname: value.nickname,
                          })
                        );
                        setTimeout(() => {
                          window.alert(
                            "매칭이 완료되었습니다. 웹사이트 상단 메뉴의 말풍선 아이콘 버튼을 눌러, 매칭된 신청자와 이야기를 나눠보세요."
                          );
                          window.location.reload();
                        }, 300);
                      }}
                    >
                      매칭하기
                    </Button>
                  )}
                </>
              ) : null}
            </div>
            <Hr />
          </div>
        );
      })}
      {detailList.applyList?.length > 5 ? (
        <div
          style={{
            margin: "2% 0 4% 0 ",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button white_small _onClick={() => setLimit((prev) => prev + 5)}>
            더보기
          </Button>
        </div>
      ) : null}
    </>
  );
}

const UserModalBtn = styled.button`
  border: none;
  background: none;
  text-align: start;

  p {
    margin: 0;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #7a7a80;
  }
`;

const Hr = styled.hr`
  border: 1px solid #e3e5e9;
  width: 100%;
`;

export default ApplyComment;
