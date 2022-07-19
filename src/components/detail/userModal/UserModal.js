import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as userActions } from "../../../redux/modules/userInfoSlice";
import Button from "../../../elements/Button";

function UserModal(props) {
  const { open, close, children } = props;
  //신청자 정보 모달 확인 시 필요
  const userInfo = useSelector((state) => state.userInfoSlice.userInfo);
  // console.log(userInfo);

  return (
    <div className={open ? "openModalcss" : null}>
      {open ? (
        <div className="userModal">
          <ModalTitle style={{ textAlign: "center" }}>{children}</ModalTitle>
          <p>닉네임</p>
          <div className="userNickname">{userInfo?.nickname}</div>
          <p>자기소개</p>
          <div className="userIntroduce">{userInfo?.introduce}</div>
          <p>후기리스트</p>
          <div className="reviewListBox">
            {userInfo?.reviewList?.slice(0, 2).map((value) => {
              return (
                <div key={value.id}>
                  <div className="reviewList">
                    <div className="clickUsermodal">
                      <div
                        className="MungProfileImgCircle"
                        style={{
                          backgroundImage: `url(${value.giverDogProfileImgUrl})`,
                        }}
                      />
                      <div className="NickAndDistanceAndDate">
                        <span className="nicknameText">
                          {value.giverNickname}
                        </span>
                        <span className="writeTimeText">
                          {value.createdAt?.slice(0, 10).replace(/\-/g, ".")}
                        </span>
                      </div>
                    </div>
                    <p>{value.comment.slice(0, 52)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ margin: "5% 133px" }}>
            <Button
              width="214px"
              orange_large
              _onClick={() => {
                close();
              }}
            >
              확인
            </Button>
          </div>
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

export default UserModal;
