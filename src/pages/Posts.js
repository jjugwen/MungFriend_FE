import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import { loadPostListAX } from "../redux/modules/postSlice";
import { actionCreators as userActions } from "../redux/modules/userInfoSlice";
import instance from "../redux/modules/instance";
import Sppiner from "../components/shared/Spinner";
import styled from "styled-components";
import Ing from "../assets/images/IsComplete/모집중.svg";
import Done from "../assets/images/IsComplete/모집종료.svg";
import WithmeTrue from "../assets/images/Withme/같이해요.svg";
import WithmeFalse from "../assets/images/Withme/부탁해요.svg";

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadMyMungAX());
    dispatch(loadPostListAX());
    dispatch(userActions.myinfoDB());
  }, [dispatch]);

  const myMung = useSelector((state) => state.mungSlice.mung);
  // console.log(myMung);

  //대표멍멍이 프로필사진
  const firstMung = myMung.filter((v) => v.isRepresentative === true)[0]
    ?.dogImageFiles[0]?.imageUrl;
  // console.log(firstMung);

  const Posts = useSelector((state) =>
    state.postSlice.post.filter((v) => v.isComplete === false)
  );

  console.log("모집중 전체 글 조회", Posts);
  // const Posts1 = useSelector((state) => state.postSlice.post);
  // console.log("모집중 전체 글 조회 no filter", Posts1);
  //로그인 유저 닉네임 얻기
  const myinfo = useSelector((state) => state.userInfoSlice.myInfo);
  // console.log(myinfo);

  //모집종료 글만
  const donePosts = useSelector((state) =>
    state.postSlice.post
      .filter((v) => v.isComplete === true)
      .slice(0)
      .reverse()
  );

  //게시글 정렬
  const [selected, setSelected] = useState(Posts);
  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "Posts") {
      setSelected(Posts);
    } else if (value === "distancePosts") {
      //거리순 조회
      instance.get(`/api/posts/distance`).then((response) => {
        setSelected(response.data.filter((v) => v.isComplete !== true));
      });
    } else if (value === "donePosts") {
      setSelected(donePosts);
    }
  };
  // console.log(selected);
  // console.log(Posts);
  // 로딩중일때 sppinner추가
  let isLoding = false;
  if (donePosts.length === 0) {
    isLoding = true;
  }

  // console.log(Posts.length === 0);
  return (
    <All>
      {isLoding && <Sppiner />}
      {isLoding && <Test />}
      <Box className="row-box">
        <h1 className="name">
          {myinfo?.nickname}
          <span>님의</span> <br />
          {myMung?.length !== 0 ? (
            <div
              style={{
                display: "flex",
                width: "110%",
              }}
            >
              <span style={{ marginRight: "1%" }}>멍멍이는</span>
              {myMung?.map((dog, i) => {
                return (
                  <span key={i} className="dogname">
                    {dog.name} {dog.age}살{i - (myMung.length - 1) ? "," : null}
                  </span>
                );
              })}
            </div>
          ) : (
            <span>멍멍이를 등록해주세요!</span>
          )}
        </h1>
        <div
          style={{
            display: "flex",
            marginLeft: "18.5%",
            paddingTop: "4%",
            marginTop: "10%",
          }}
        >
          {myMung?.length !== 0 ? (
            <Kingimg src={firstMung} alt="firstMung" />
          ) : (
            <Kingimg src="https://ifh.cc/g/X36LNp.png" alt="" />
          )}
        </div>
        <SSub>
          {myMung?.map((dog, i) => {
            return (
              <div key={i}>
                <div className="test"></div>
                <Subimg src={dog.dogImageFiles[0].imageUrl} />
              </div>
            );
          })}
        </SSub>
      </Box>
      <div
        style={{
          marginTop: "3%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <h2>산책모집</h2>
        <select name="게시글" onChange={handleSelect} defaultValue="Posts">
          <option value="Posts" key="1">
            전체 게시글
          </option>
          <option value="distancePosts" key="2">
            가까운 거리순
          </option>
          <option value="donePosts" key="3">
            모집종료된 글
          </option>
        </select>
      </div>

      <Container>
        {selected.length === 0 ? (
          <>
            {Posts.map((post, i) => {
              // console.log(post.imagePath)
              // console.log(post.content.length);
              return (
                <PostBox
                  key={i}
                  onClick={() => {
                    navigate(`/posts/${post.id}`);
                  }}
                >
                  <div
                    className="row-box"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="row-box" style={{ alignItems: "center" }}>
                      {post.imagePath?.map((image, i) => (
                        <PostImg key={i} src={image} alt="" />
                      ))}
                      <div className="name-box">
                        <span className="name">{post.nickname} </span>
                        {post.distance ? (
                          <span className="name" style={{ color: "#FA5A30" }}>
                            {post.distance?.toFixed(1)}km
                          </span>
                        ) : null}
                        <div className="date">
                          {post.requestStartDate.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                    {post.withMe ? (
                      <img src={WithmeTrue} alt="withmetrue" />
                    ) : (
                      <img src={WithmeFalse} alt="withmefalse" />
                    )}
                  </div>
                  <div className="title">{post.title}</div>
                  <div className="content">
                    {post.content.length > 40
                      ? post.content.substr(0, 33)
                      : post.content}
                  </div>
                  <div className="footer">
                    <hr />
                    <div className="row-box b-box">
                      <div className="font-14 applyCount">
                        <img
                          className="applyCountImg"
                          src="https://ifh.cc/g/dHor7J.png"
                          alt=""
                        />
                        신청자 {post.applyCount}
                      </div>

                      <div>
                        {post.isComplete ? (
                          <img src={Done} alt="" />
                        ) : (
                          <img src={Ing} alt="" />
                        )}
                      </div>
                    </div>
                  </div>
                </PostBox>
              );
            })}
          </>
        ) : (
          <>
            {selected.map((post, i) => {
              // console.log(post.imagePath)
              // console.log(post.content.length);
              return (
                <PostBox
                  key={i}
                  onClick={() => {
                    navigate(`/posts/${post.id}`);
                  }}
                >
                  <div
                    className="row-box"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="row-box" style={{ alignItems: "center" }}>
                      {post.imagePath?.map((image, i) => (
                        <PostImg key={i} src={image} alt="" />
                      ))}
                      <div className="name-box">
                        <span className="name">{post.nickname} </span>
                        {post.distance ? (
                          <span className="name" style={{ color: "#FA5A30" }}>
                            {post.distance?.toFixed(1)}km
                          </span>
                        ) : null}
                        <div className="date">
                          {post.requestStartDate.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                    {post.withMe ? (
                      <img src={WithmeTrue} alt="withmetrue" />
                    ) : (
                      <img src={WithmeFalse} alt="withmefalse" />
                    )}
                  </div>
                  <div className="title">{post.title}</div>
                  <div className="content">
                    {post.content.length > 40
                      ? post.content.substr(0, 33)
                      : post.content}
                  </div>
                  <div className="footer">
                    <hr />
                    <div className="row-box b-box">
                      <div className="font-14 applyCount">
                        <img
                          className="applyCountImg"
                          src="https://ifh.cc/g/dHor7J.png"
                          alt=""
                        />
                        신청자 {post.applyCount}
                      </div>
                      <div>
                        {post.isComplete ? (
                          <img src={Done} alt="" />
                        ) : (
                          <img src={Ing} alt="" />
                        )}
                      </div>
                    </div>
                  </div>
                </PostBox>
              );
            })}
          </>
        )}
      </Container>
      <AddPostButton
        onClick={() => {
          navigate("/postcreate");
        }}
      >
        <img src="https://ifh.cc/g/nW36zN.png" alt="" />
      </AddPostButton>
    </All>
  );
}

const All = styled.div`
  height: 100%;
  width: 65%;
  margin: 50px auto auto auto;
  @media screen and (max-width: 960px) {
    width: 90%;
  }
`;

const Test = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
  z-index: 2;
`;

const Box = styled.div`
  box-sizing: border-box;
  align-items: center;
  background: #fa5a30;
  box-shadow: 4px 4px 20px rgba(250, 90, 48, 0.2);
  border-radius: 20px;
  position: relative;
  gap: 13%;
  height: 228px;
  padding: 50px 0 20% 0;
  @media screen and (max-width: 960px) {
    gap: 20%;
  }
  /* padding-top: 50px; */
  span {
    font-weight: 400;
  }
  .name {
    position: absolute;
    padding-left: 8%;
    padding-top: 10%;
    font-size: 30px;
    font-weight: 600;
    /* line-height: 40px; */
    color: #ffffff;
  }
  .dogname {
    position: relative;
    padding-right: 1%;
    font-size: 100%;
    font-weight: 600;
    /* line-height: 40px; */
    min-width: fit-content;
    color: #ffffff;
  }
`;
const Kingimg = styled.img`
  border-radius: 50%;
  position: absolute;
  width: 220px;
  height: 220px;
  right: 8%;
  bottom: 40px;
`;

const SSub = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 10%;
  padding-left: 8%;
  padding-bottom: 3%;
  bottom: 0;
`;
const Subimg = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2%;
  margin-bottom: 200px;
  margin-top: 50px;
  /* width: 66%; */
`;
const PostBox = styled.div`
  box-sizing: border-box;
  padding: 20px;
  height: 250px;
  position: relative;
  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  border-radius: 12px;
  .name-box {
    margin-left: 10px;
  }
  .name {
    font-weight: 500;
    font-size: 14px;
  }
  .date {
    font-size: 12px;
    color: #747474;
  }
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    padding: 10px 0;
  }
  .content {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  .footer {
    position: absolute;
    width: 80%;
    bottom: 10px;
    hr {
      border: 1px solid #e3e5e9;
    }
    .applyCountImg {
      width: 20px;
      height: 20px;
      position: relative;
      top: 5px;
    }

    .b-box {
      /* display: flex; */
      justify-content: space-between;
    }
  }
`;
const PostImg = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;
const AddPostButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 3%;
  z-index: 2;
  width: 80px;
  height: 80px;
  border: none;
  background-color: #4f65ff;
  border-radius: 50%;

  img {
    width: 40px;
    height: 40px;
  }
`;
export default Posts;
