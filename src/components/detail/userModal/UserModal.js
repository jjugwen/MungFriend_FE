import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../elements/Button";

function UserModal(props) {
  const { open, close, children } = props;
  //신청자 정보 모달 확인 시 필요
  const userInfo = useSelector((state) => state.userInfoSlice.userInfo);
  // console.log(userInfo);

  return (
    <div className={open ? "openModalcss" : null}>
      {open ? (
        <UserModalStyle>
          <ModalTitle style={{ textAlign: "center" }}>{children}</ModalTitle>
          <Button
            top="8%"
            closeBtn
            _onClick={() => {
              close();
            }}
          />
          <p>닉네임</p>
          <div className="userNickname">{userInfo?.nickname}</div>
          <p>자기소개</p>
          <div className="userIntroduce">{userInfo?.introduce}</div>
          <p className="reviewTitle">후기리스트</p>
          {userInfo?.reviewList?.length === 0 ? ( //후기 없으면 문구 추가
            <span style={{ marginLeft: "3%", color: "#B8BBC0" }}>
              등록된 후기가 없습니다.
            </span>
          ) : (
            <>
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
                              {value.createdAt
                                ?.slice(0, 10)
                                .replace(/\-/g, ".")}
                            </span>
                          </div>
                        </div>
                        <p>{value.comment.slice(0, 52)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <div className="profileForBtn">
            <Button
              orange_large
              _onClick={() => {
                close();
              }}
            >
              확인
            </Button>
          </div>
        </UserModalStyle>
      ) : null}
    </div>
  );
}

const UserModalStyle = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: wrap;
  /* align-items: flex-start; */
  max-height: calc(100vh - 50px);
  overflow-y: auto;
  border-radius: 20px;
  padding: 2.5em;
  /* ::-webkit-scrollbar {
    display: none;
  } */
  ::-webkit-scrollbar {
    width: fit-content;
    max-width: 4px; //스크롤 폭
  }
  ::-webkit-scrollbar-track {
    // 스크롤이 움직이는 영역
    background-color: #e3e5e9;
  }
  ::-webkit-scrollbar-button:start {
    //  스크롤의 화살표가 포함된 영역
    display: block;
    height: 40px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-button:end {
    //  스크롤의 화살표가 포함된 영역
    display: block;
    height: 60px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #fa5a30;
    border-radius: 15px;
  }

  & p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
  }

  .profileForBtn {
    margin: 5% 133px;
  }

  .userNickname {
    width: 100%;
    max-width: 440px;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 3%;
    /* margin-bottom: 2.5em;*/
    margin-bottom: 1%;
  }

  .userIntroduce {
    width: 100%;
    max-width: 440px;
    /* height: 9.25em; */
    max-height: 13.2em;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 3%;
    /* margin-bottom: 2.5em; */
    margin-bottom: 1%;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .reviewListBox {
    display: flex;
    justify-content: space-between;
    width: 90%;
  }
  .reviewList {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 190px;
    /* height: 216px; */

    background: #ffffff;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    padding: 10%;

    & p {
      font-family: "Pretendard";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #4e4e56;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    position: fixed;
    width: 100%;
    max-width: 335px;
    max-height: 486px;
    max-height: calc(100vh - 50px);
    overflow-y: auto;
    border-radius: 20px;
    ::-webkit-scrollbar {
      display: none;
    }

    .profileForBtn {
      margin: 5% 27.5%;
    }

    .userNickname {
      width: 100%;
      max-width: 230px;
      padding: 16px;
    }

    .userIntroduce {
      width: 100%;
      max-width: 230px;
      padding: 16px;
    }

    .reviewList {
      display: none;
    }
  }
`;

const ModalTitle = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
`;

export default UserModal;
