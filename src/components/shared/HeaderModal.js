import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as userActions } from "../../redux/modules/userInfoSlice";

function HeaderModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //로그인 유저
  const myinfo = useSelector((state) => state.userInfoSlice.myInfo);
  // console.log(myinfo);
  // const nickname = sessionStorage.getItem("nickname");
  // console.log(myinfo);

  const Logout = () => {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  useEffect(() => {
    dispatch(userActions.myinfoDB());
  }, []);

  return (
    <>
      <HeaderModalbox>
        <UpperBox>
          <UserNameFont>{myinfo?.nickname}님</UserNameFont>
          <EmailFont>{myinfo?.email}</EmailFont>
          <span
            onClick={() => {
              navigate("/mypage?value=mypage");
              props.setModal(!props.modal);
            }}
          >
            마이페이지
          </span>
          <span
            onClick={() => {
              navigate("/mypage?value=mypost");
              props.setModal(!props.modal);
            }}
          >
            작성한 게시글
          </span>
          <span
            onClick={() => {
              navigate("/mypage?value=myreview");
              props.setModal(!props.modal);
            }}
          >
            내가 받은 후기
          </span>

          <hr />
        </UpperBox>

        <Logoutbtn
          onClick={() => {
            console.log("로그아웃!");
            Logout();
            props.setModal(!props.modal);
          }}
        >
          로그아웃
        </Logoutbtn>
      </HeaderModalbox>
    </>
  );
}

const HeaderModalbox = styled.div`
  width: 100%;
  max-width: 240px;
  height: auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 17.5%;
  top: 65px;

  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  z-index: 3;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 85%;
  margin: 28px 20px 0px 20px;

  h1 {
    margin-bottom: 0;
  }
  /* button {
    border: none;
    background-color: transparent;
  } */
  span {
    margin: 10px 0%;
    /* font-weight: ${(props) => props.fontWeight || "600"}; */
    font-weight: 600;
    cursor: pointer;
  }
  hr {
    width: 200px;
    margin-top: 22px;
    margin-bottom: 0px;
    background: #e5e5e5;
  }
`;
const UserNameFont = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  margin-bottom: 6px;
`;

const EmailFont = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  margin-bottom: 10px;
  color: #747474;
`;

const Logoutbtn = styled.div`
  text-align: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  padding: 16px 95px 16px 95px;
  color: #747474;
  cursor: pointer;
`;

export default HeaderModal;
