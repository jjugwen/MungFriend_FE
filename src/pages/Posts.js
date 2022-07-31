import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import { loadPostListAX } from "../redux/modules/postSlice";
import { actionCreators as userActions } from "../redux/modules/userInfoSlice";
import instance from "../shared/API/instance";
import Sppiner from "../components/shared/Spinner";
import styled from "styled-components";
import Ing from "../assets/images/IsComplete/모집중.svg";
import Done from "../assets/images/IsComplete/모집종료.svg";
import WithmeTrue from "../assets/images/Withme/같이해요.svg";
import WithmeFalse from "../assets/images/Withme/부탁해요.svg";
import DogPlusModal from "../components/DogPlusModal";

function Posts(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    dispatch(loadPostListAX());
    if (token) {
      dispatch(loadMyMungAX());
      dispatch(userActions.myinfoDB());
    }
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

  // console.log("모집중 전체 글 조회", Posts);
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
  //스타일
  const btnStyleWhole = useRef("");
  const btnStyleDistance = useRef("");
  const btnStyleDone = useRef("");

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "Posts") {
      setSelected(Posts);
      btnStyleWhole.current.style = `color: #FA5A30; text-decoration: 2px underline; text-underline-offset: 8px; `;
      btnStyleDistance.current.style = `color: black`;
      btnStyleDone.current.style = `color: black`;
    } else if (value === "distancePosts") {
      //거리순 조회
      instance.get(`/api/posts/distance`).then((response) => {
        setSelected(response.data.filter((v) => v.isComplete !== true));
        btnStyleWhole.current.style = `color: black`;
        btnStyleDistance.current.style = `color: #FA5A30; text-decoration: 2px underline; text-underline-offset: 8px;`;
        btnStyleDone.current.style = `color: black`;
      });
    } else if (value === "donePosts") {
      setSelected(donePosts);
      btnStyleWhole.current.style = `color: black`;
      btnStyleDistance.current.style = `color: black`;
      btnStyleDone.current.style = `color: #FA5A30; text-decoration: 2px underline; text-underline-offset: 8px;`;
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

  // 멍프로필 등록모달
  const [mung, setMung] = useState(false);
  return (
    <All>
      {isLoding && <Sppiner imgURL={props.imgURL} />}
      {isLoding && <SppinerOutsession />}
      {mung && <DogPlusModal modal={mung} setMungModal={setMung} />}
      {mung && (
        <DogPlusOutsession
          onClick={() => {
            setMung(!mung);
          }}
        />
      )}
      <Box>
        <h1 className="name">
          {myinfo?.nickname}
          {token ? <span>님의</span> : <span>멍친9함..ㅎ</span>} <br />
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
            <>
              {token ? (
                <>
                  <span>멍멍이를 등록해주세요!</span>
                  <br />
                  <RowBox>
                    <AddMungFBtn
                      className="mungfalse"
                      onClick={() => {
                        setMung(!mung);
                      }}
                    >
                      <img src={`${process.env.REACT_APP_IMAGE_URL}/Yebin/previewBtn.png`} alt="" />
                    </AddMungFBtn>
                    <AddText>등록하기</AddText>
                  </RowBox>{" "}
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ marginBottom: "2%" }}>
                      <span
                        style={{
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "2px underline",
                        }}
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        로그인
                      </span>
                      하고 산책 친구 만나요!
                    </span>
                    <span style={{ fontSize: "14px" }}>
                      * 게시글 작성 및 자세히 보기, 거리순 조회는 로그인 후 이용
                      가능합니다.
                    </span>
                  </div>
                </>
              )}
            </>
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
            <Kingimg src={`${process.env.REACT_APP_IMAGE_URL}/Yebin/addProfile.png`} alt="" />
          )}
        </div>
        <SSub>
          {myMung?.map((dog, i) => {
            return (
              <div key={i}>
                <Subimg src={dog.dogImageFiles[0].imageUrl} />
              </div>
            );
          })}
          {myMung?.length !== 0 ? (
            <AddMungBtn
              onClick={() => {
                setMung(!mung);
              }}
            >
              <img src={`${process.env.REACT_APP_IMAGE_URL}/Yebin/previewBtn.png`} alt="" />
            </AddMungBtn>
          ) : (
            ""
          )}
        </SSub>
      </Box>
      <TitelSelectBox>
        <h2>산책모집</h2>
        <div>
          <SelectBtn
            type="button"
            value="Posts"
            onClick={handleSelect}
            style={{
              color: "#FA5A30",
              textDecoration: "2px underline",
              textUnderlineOffset: "8px",
            }}
            ref={btnStyleWhole}
            key="1"
          >
            모집중
          </SelectBtn>
          <SelectBtn
            type="button"
            value="distancePosts"
            onClick={handleSelect}
            ref={btnStyleDistance}
            key="2"
          >
            가까운 거리순
          </SelectBtn>
          <SelectBtn
            type="button"
            value="donePosts"
            onClick={handleSelect}
            ref={btnStyleDone}
            key="3"
          >
            모집종료
          </SelectBtn>
        </div>
      </TitelSelectBox>

      <Container>
        {selected.length === 0 ? (
          <>
            {Posts.map((post, i) => {
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

                  <div className="title">
                    {post.title.length > 18
                      ? post.title.substr(0, 16) + ` …`
                      : post.title}
                  </div>
                  <textarea className="content" readOnly value={post.content} />
                  <div className="footer">
                    <hr />
                    <div
                      className="row-box"
                      style={{
                        alignItmes: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItmes: "center",
                          fontSize: "14px",
                          width: "100%",
                          gap: "1%",
                        }}
                      >
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

                  <div className="title">
                    {post.title.length > 18
                      ? post.title.substr(0, 16) + ` …`
                      : post.title}
                  </div>
                  <textarea className="content" readOnly value={post.content} />
                  <div className="footer">
                    <hr />
                    <div
                      className="row-box"
                      style={{
                        alignItmes: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItmes: "center",
                          fontSize: "14px",
                          width: "100%",
                          gap: "1%",
                        }}
                      >
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
      <UpBox>
        <AddPostButton
          onClick={() => {
            navigate("/postcreate");
          }}
        >
          <img src={`${process.env.REACT_APP_IMAGE_URL}/Yebin/previewBtn.png`} alt="" />
        </AddPostButton>
        <div>게시글을 작성합니다.</div>
      </UpBox>
    </All>
  );
}

const All = styled.div`
  height: 100%;
  min-width: 1440px;
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 100%;
  /* @media screen and (max-width: 960px) {
    width: 100%;
  } */
`;

const SppinerOutsession = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
  z-index: 2;
`;
const DogPlusOutsession = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const AddMungFBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #f78d70;
  background: #f67452;
  position: relative;
  top: 21px;
  img {
    position: relative;
    left: 5%;
    top: 5%;
    width: 15px;
    height: 15px;
  }
`;
const AddMungBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #f78d70;
  background: #f67452;
  position: relative;
  top: 10px;
  left: 15px;
  img {
    position: relative;
    left: 5%;
    top: 5%;
    width: 15px;
    height: 15px;
  }
`;
const AddText = styled.div`
  font-weight: 500;
  font-size: 22px;
  position: relative;
  top: 25px;
  left: 10px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  background: #fa5a30;
  box-shadow: 4px 4px 20px rgba(250, 90, 48, 0.2);
  border-radius: 20px;
  position: relative;
  /* gap: 13%; */
  min-width: 940px;
  margin: 0% 17.36%;
  height: 228px;
  margin-top: 85px;
  /* @media screen and (max-width: 960px) {
    gap: 20%;
  } */
  /* padding-top: 50px; */
  span {
    font-weight: 400;
  }
  .name {
    position: absolute;
    padding-left: 40px;
    font-size: 30px;
    font-weight: 600;
    margin-top: -3%;
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
  gap: 2%;
  padding-left: 40px;
  padding-bottom: 3%;
  bottom: 0;
  width: 30%;
`;
const Subimg = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

const TitelSelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  min-width: 940px;
  margin: 122px 17.36% 0 17.36%;

  & div {
    display: flex;
    gap: 1%;
    width: 500px;
    justify-content: flex-end;
  }
`;

const SelectBtn = styled.button`
  border: none;
  background: none;
  padding: 1.5%;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2%;
  min-width: 940px;
  margin: 40px 17.36% 200px 17.36%;

  /* width: 66%; */
`;
const PostBox = styled.div`
  box-sizing: border-box;
  padding: 20px;
  height: 330px;
  position: relative;
  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  border-radius: 12px;
  cursor: pointer;
  :hover {
    transform: translateY(-10px);
  }
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
    margin: 20px 0;
  }
  textarea {
    font-family: "Pretendard";
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #747474;
    border: none;
    width: 100%;
    resize: none;
    overflow: hidden;
    height: 96px;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
  .footer {
    position: absolute;
    width: 88%;
    bottom: 10px;
    hr {
      border: 1px solid #e3e5e9;
    }
    .applyCountImg {
      width: 20px;
      height: 20px;
      position: relative;
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
  transform: translateY(30%);
  transition: 0.5s;
  :hover {
    transform: translateY(0);
  }
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
const UpBox = styled.div`
  position: fixed;
  bottom: 40%;
  right: 8%;

  :hover {
    div {
      opacity: 100;
      transition: 0.5s;
    }
  }
  div {
    :hover {
      opacity: 0;
    }
    opacity: 0;
    position: fixed;
    right: 9%;
    bottom: 33%;
    height: 50px;
    width: 170px;
    border-radius: 12px;
    text-align: center;
    box-sizing: border-box;
    padding: 15px;
    color: white;
    background: rgba(0, 0, 0, 0.75);
  }
`;

export default Posts;
