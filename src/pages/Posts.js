import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import styled from "styled-components";
import { loadPostListAX } from "../redux/modules/postSlice";
import Ing from "../assets/images/IsComplete/모집중.svg"
import Done from "../assets/images/IsComplete/모집종료.svg"
import { useNavigate } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadMyMungAX());
  }, []);

  React.useEffect(()=>{
    dispatch(loadPostListAX());
  },[])
  const myMung = useSelector((state) => state.mungSlice.mung);
  // console.log(myMung);
  const Posts =useSelector((state)=>state.postSlice.post)
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
      {Posts?.map((post,i)=>{
        // console.log(post.imagePath)
        return(
          <PostBox key={i} onClick={()=>{
            navigate(`/posts/${post.id}`)
          }}>
            {post.imagePath.map((image,i)=>(
              <PostImg key={i} src={image} alt=""/>    
      ))}
            {/* <PostImg src={post.imagePath} alt=""/> */}
            <div>{post.nickname}</div>
            <div>{post.requestStartDate.substring(0,10)}</div>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <hr/>
            <div className="row-box">
            <div>신청자 {post.applyCount}</div>
            <div>{post.isComplete===true? <img src={Ing} alt=""/>: <img src={Done} alt=""/>}</div>
            </div>
          </PostBox>
        )
      })}
    </Container>
    <AddPostButton onClick={()=>{
      navigate('/postcreate')
    }}><img src="https://ifh.cc/g/nW36zN.png" alt=""/></AddPostButton>
    </All>
  );
}

const All=styled.div`
height:100vh;
`
const Box = styled.div`
  background-color: orange;
  position: relative;
  width: 65%;
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
display: flex;
gap: 2%;
width: 66%;


`
const PostBox =styled.div`
background-color: pink;
width:31%;
height:250px;
`
const PostImg = styled.img`
border-radius: 50%;
width: 48px;
height: 48px;
`
const AddPostButton =styled.button`
position: absolute;
width: 80px;
height: 80px;
right:10%;
bottom: 10%;
border: none;
background-color: #4F65FF;
border-radius: 50%;
img{
  width: 40px;
  height: 40px;
}
`
export default Posts;
