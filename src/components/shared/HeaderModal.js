import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as userActions } from "../../redux/modules/userInfoSlice";
//컴포넌트
import MyPageComponent from "../MyPageComponent";
import MyPostList from "../MyPostList";
import MyReviewList from "../MyReviewList";

function HeaderModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //로그인 유저
  const myinfo = useSelector((state) => state.userInfoSlice.myInfo);
  // console.log(myinfo);
  const [change, setChange] = useState("");

  const Logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  useEffect(() => {
    dispatch(userActions.myinfoDB());
  }, []);

  return (
    <>
      <HeaderModalbox>
        <UpperBox>
          <UserNameFont>{myinfo[0]?.nickname}님</UserNameFont>
          <EmailFont>{myinfo[0]?.email}</EmailFont>
          <span
            onClick={() => {
              navigate("/mypage");
            }}
          >
            마이페이지
          </span>
          <span
            onClick={() => {
              navigate("/mypage?value=1");
              // setChange(<MyPostList />);
            }}
          >
            작성한 게시글
          </span>
          <span
            onClick={() => {
              navigate("/mypage");

              setTimeout(() => {
                setChange(<MyReviewList />);
              }, 500);
            }}
          >
            내가 받은 후기 {change}
          </span>

          <hr />
        </UpperBox>

        <Logoutbtn
          onClick={() => {
            console.log("로그아웃!");
            Logout();
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
  margin: 16px 95px 16px 95px;
  color: #747474;
`;

export default HeaderModal;
