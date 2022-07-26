import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
//컴포넌트
import ApplyComment from "../components/detail/ApplyComment";
import WithDogs from "../components/detail/withdog/WithDogs";
import WriteModal from "../components/detail/WriteModal";
import MatchingProfile from "../components/detail/MatchingProfile";
import UserModal from "../components/detail/userModal/UserModal";
import { betweenTime } from "../components/detail/TimeCalculator";
import Map from "../components/detail/Map";
//CSS
import styled from "styled-components";
import "../elements/postDetailStyle.css";
import Button from "../elements/Button";
import applyIng from "../assets/images/IsComplete/모집중.svg";
import applyEnd from "../assets/images/IsComplete/모집종료.svg";
//미들웨어
import { actionCreators as postActions } from "../redux/modules/postDetailSlice";
import { actionCreators as userActions } from "../redux/modules/userInfoSlice";
import { actionCreators as applyActions } from "../redux/modules/applySlice";
import WithmeTrue from "../assets/images/Withme/같이해요.svg";
import WithmeFalse from "../assets/images/Withme/부탁해요.svg";

function PostDetail() {
  const params = useParams();
  const postId = Number(params.id); //숫자로 변환해야 읽힘.
  // console.log(postId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailList = useSelector((state) => state.postDetailSlice.list);
  // console.log(detailList);

  //신청하기 모달창 여닫기
  const [applyModal, setApplyModal] = useState(false);
  const openApplyModal = () => {
    setApplyModal(true);
  };
  const closeApplyModal = () => {
    setApplyModal(false);
  };

  //유정정보 모달창 여닫기
  const [userModal, setUserModal] = useState(false);
  const openUserModal = () => {
    setUserModal(true);
  };
  const closeUserModal = () => {
    setUserModal(false);
  };

  //작성자 확인 및 정보 모달 확인 시 필요
  const loginNickname = useSelector(
    (state) => state.userInfoSlice.myInfo.nickname
  ); //로컬스토리지로 닉네임 가져오기로. MockAPI test 시에는 myinfo 정보 필요할 수도.
  // console.log(loginNickname);

  const deletePost = () => {
    dispatch(postActions.deleteDetailDB(postId));
  };

  useEffect(() => {
    dispatch(postActions.getDetailDB(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(userActions.myinfoDB());
  }, [dispatch]);

  //모달창 밖 영역 클릭 시 닫기
  const outSection = useRef();

  return (
    <>
      <div className="DetailOutterBox">
        <div className="DetailTitleBox">
          <div style={{ display: "flex", gap: "4px" }}>
            {detailList?.isComplete ? (
              <img src={applyEnd} alt="applyEnd" />
            ) : (
              <img src={applyIng} alt="applyIng" />
            )}
            {detailList.withMe ? (
              <img src={WithmeTrue} alt="withmetrue" />
            ) : (
              <img src={WithmeFalse} alt="withmefalse" />
            )}
          </div>

          <h1 className="DetailTitle">{detailList?.title}</h1>
          <div>
            <div className="DetailTitleBottom">
              <div className="clickUsermodal">
                <UserModalBtn
                  onClick={() => {
                    dispatch(userActions.userinfoDB(detailList?.nickname));
                    setTimeout(() => {
                      openUserModal();
                    }, 500);
                  }}
                >
                  <div className="DetailTitleBottomStart">
                    <MungProfileImgCircle
                      style={{
                        backgroundImage: `url(${detailList?.dogProfileImgUrl})`,
                      }}
                    />
                    <div className="NickAndDistanceAndDate">
                      <div className="betweenNickAndDistance">
                        <span className="nicknameText">
                          {detailList?.nickname}
                        </span>
                        {/* 소수점 첫째자리까지 반올림 */}
                        <span className="distanceText">
                          {detailList?.distance?.toFixed(1)}km
                        </span>
                      </div>
                      <span className="writeTimeText">
                        {detailList?.modifiedAt
                          ?.slice(0, 10) /* 시간 2022-06-26 */
                          /* -를 .으로 2022.06.26 */
                          .replace(/-/g, ".")}
                      </span>
                    </div>
                  </div>
                </UserModalBtn>
                <UserModal
                  children="프로필"
                  open={userModal}
                  close={closeUserModal}
                />
              </div>

              <div className="DetailTitleBottomEnd">
                <span>
                  신청자{" "}
                  <span style={{ fontWeight: "500" }}>
                    {detailList?.applyList?.length}
                  </span>
                </span>
                <span>|</span>
                <span>
                  요청시간 :{" "}
                  <span style={{ fontWeight: "500" }}>
                    {detailList?.requestStartDate
                      ?.slice(0, 10)
                      .replace(/-/g, ".")}{" "}
                    {detailList?.requestStartDate?.split("T")[1].split(":")[0]}
                    시{" "}
                    {detailList?.requestStartDate?.split("T")[1].split(":")[1]}
                    분부터
                  </span>
                  <span style={{ color: "#FA5A30" }}>
                    (
                    {betweenTime({
                      EndTime: detailList?.requestEndDate,
                      StartTime: detailList?.requestStartDate,
                    })}
                    )
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="DetailBodyBox" style={{ height: "300px" }}>
          <Hr />
          <DetailContent
            value={detailList?.content ? detailList?.content : ""}
            readOnly
          >
            {detailList?.content}
          </DetailContent>
        </div>
        <div className="DetailBodyBox">
          <Hr />
          {/* 지도 */}
          <Map />
        </div>
        <div className="DetailBodyBox">
          <WithDogs />
        </div>
        {loginNickname !== detailList?.nickname ? ( //작성자 정보와 로그인한 유저가 같지 않으면서,
          detailList?.applyByMe ? ( //applyByMe(신청여부)가 true면 신청한 상태 : 신청취소 버튼 보이기
            <div style={{ display: "flex", justifyContent: "center" }}>
              {!detailList?.isComplete ? ( //모집종료되면
                <Button
                  grey_small
                  margin="0 0 4.9em 0"
                  _onClick={() => {
                    dispatch(applyActions.deleteApplyDB(postId));
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                  }}
                >
                  신청취소
                </Button>
              ) : null}
            </div>
          ) : (
            //applyByMe가 false면 신청한 상태 : 신청하기 버튼 보이기
            <div style={{ display: "flex", justifyContent: "center" }}>
              {!detailList?.isComplete ? ( //모집종료되면
                <Button
                  orange_small
                  margin="0 0 4.9em 0"
                  _onClick={() => {
                    openApplyModal();
                  }}
                >
                  신청하기
                </Button>
              ) : null}
              <WriteModal
                children="신청하기"
                open={applyModal}
                close={closeApplyModal}
              />
            </div>
          )
        ) : loginNickname === detailList?.nickname && //작성자 정보와 로그인한 유저가 같으면서,
          detailList?.isComplete === false ? ( //모집중이면(isComplete가 false) 게시글 수정/삭제 가능
          <div>
            <div className="DeleteAndEditBtn">
              <Button grey_small _onClick={deletePost}>
                삭제하기
              </Button>
              <Button
                orange_small
                _onClick={() => {
                  navigate(`/postcreate/${postId}`);
                }}
              >
                수정하기
              </Button>
            </div>
            <div className="DetailBodyBox">
              <ApplyComment />
            </div>
          </div>
        ) : (
          //모집 완료(isComplete가 false)면 매칭 프로필 보이기
          <>
            {/* 매칭된 닉네임이 있을 때만 매칭 프로필 보이기 */}
            {detailList?.matchedNickname !== null ? <MatchingProfile /> : ""}
            <div className="DetailBodyBox">
              <ApplyComment />
            </div>
          </>
        )}
      </div>
    </>
  );
}

const MungProfileImgCircle = styled.div`
  width: 100%;
  max-width: 32px;
  height: 32px;
  background-size: cover;
  border-radius: 50%;
`;

const UserModalBtn = styled.button`
  border: none;
  background: none;
  padding: 0;
`;

const Hr = styled.hr`
  border: 0.1px solid #e3e5e9;
  width: 100%;
`;

const DetailContent = styled.textarea`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: none;
  width: 100%;
  resize: none;
  height: 284px;
  :focus {
    outline: none;
  }
`;
export default PostDetail;
