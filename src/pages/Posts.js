import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import styled from "styled-components";
import { loadPostListAX } from "../redux/modules/postSlice";
import Ing from "../assets/images/IsComplete/모집중.svg";
import Done from "../assets/images/IsComplete/모집종료.svg";
import { useNavigate } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadMyMungAX());
  }, []);

  React.useEffect(() => {
    dispatch(loadPostListAX());
  }, []);
  const myMung = useSelector((state) => state.mungSlice.mung);
  // console.log(myMung);
  const Posts = useSelector((state) => state.postSlice.post);
  // console.log(Posts)

  // const a = myMung.isRepresentative
  // console.log(a)

  // const postImg = Posts.map((p,i)=>p.imagePath.map((p,i)=>(p)))
  // console.log(postImg)

  // for(let i=0; i<= postImg.length; i++){
  //   console.log(postImg[i])
  // }

  // const a = postImg.map((image,i)=> image)

  // console.log(a)

  return (
    <All>
      <Box className="row-box">
        {myMung?.map((dog, i) => {
          return (
            <div key={i}>
              {myMung[i].isRepresentative === true ? (
                <Kingimg src={myMung[i].dogImageFiles[0].imageUrl} alt="" />
              ) : (
                ""
              )}

              <div>
                {dog.name} {dog.age}살
              </div>
              <Subimg src={dog.dogImageFiles[0].imageUrl} />
            </div>
          );
        })}
      </Box>
      <Container>
        {Posts?.map((post, i) => {
          // console.log(post.imagePath)
          return (
            <PostBox
              key={i}
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
            >
              <div className="row-box">
                {post.imagePath?.map((image, i) => (
                  <PostImg key={i} src={image} alt="" />
                ))}
                <div className="name-box">
                  <div className="name">{post.nickname}</div>
                  <div className="date">
                    {post.requestStartDate.substring(0, 10)}
                  </div>
                </div>
              </div>
              <div className="title">{post.title}</div>
              <div className="content">{post.content}</div>
              <div className="footer">
                <hr />
                <div className="row-box">
                  <div className="font-14">
                    <img
                      className="applyCountImg"
                      src="https://ifh.cc/g/dHor7J.png"
                      alt=""
                    />
                    신청자 {post.applyCount}
                  </div>
                  <div>
                    {post.isComplete === false ? (
                      <img src={Ing} alt="" />
                    ) : (
                      <img src={Done} alt="" />
                    )}
                  </div>
                </div>
              </div>
            </PostBox>
          );
        })}
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
  /* height:100vh; */

  width: 65%;
  margin: 50px auto auto auto;
`;
const Box = styled.div`
  background-color: orange;
  position: relative;
  /* width: 65%; */
  height: 228px;
`;
const Kingimg = styled.img`
  border-radius: 50%;
  position: absolute;
  width: 220px;
  height: 220px;
  right: 10%;
  bottom: 40px;
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
    }
  }
`;
const PostImg = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;
const AddPostButton = styled.button`
  position: absolute;
  width: 80px;
  height: 80px;
  right: 10%;
  bottom: 40%;
  border: none;
  background-color: #4f65ff;
  border-radius: 50%;
  img {
    width: 40px;
    height: 40px;
  }
`;
export default Posts;
