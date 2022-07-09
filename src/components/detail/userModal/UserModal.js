import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as userActions } from "../../../redux/modules/userInfoSlice";

function UserModal(props) {
  const { open, close, children } = props;
  //신청자 정보 모달 확인 시 필요
  const userInfoRoot = useSelector((state) => state.userInfoSlice.userInfo);
  const userInfo = userInfoRoot[0];
  console.log(userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.userinfoDB());
  }, []);
  return (
    <div className={open ? "openModalcss" : null}>
      {open ? (
        <div className="userModal">
          <ModalTitle>{children}</ModalTitle>
          <p>닉네임</p>
          <div className="userNickname">{userInfo?.nickname}</div>
          <p>자기소개</p>
          <div className="userIntroduce">{userInfo?.introduce}</div>
          <p>후기리스트</p>
          {userInfo?.reviewList?.map((v) => {
            return (
              <div key={v.id}>
                <div
                  className="reviewList"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MungProfileImgCircle
                    style={{
                      backgroundImage: `url(${v.giverDogProfileImgUrl})`,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex", gap: "5%", width: "170px" }}>
                      <div>{v.giverNickname}</div>
                    </div>
                    <div>{v.createdAt?.slice(0, 10)}</div>
                  </div>
                </div>
                <div>{v.comment}</div>
              </div>
            );
          })}
          <button
            className="close"
            onClick={() => {
              close();
            }}
          >
            확인
          </button>
        </div>
      ) : null}
    </div>
  );
}

const ModalTitle = styled.h1`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
`;

const MungProfileImgCircle = styled.div`
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 50%;
`;
export default UserModal;
