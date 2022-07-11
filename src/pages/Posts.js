import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import styled from "styled-components";
import { loadPostListAX } from "../redux/modules/postSlice";

function Posts() {
  const dispatch = useDispatch();

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
    <>
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
          <div key={i}>
            {post.imagePath.map((image,i)=>(
              <PostImg key={i} src={image} alt=""/>    
      ))}
            {/* <PostImg src={post.imagePath} alt=""/> */}
            <div>{post.nickname}</div>
            <div>{post.requestStartDate}</div>
            <div>신청자 {post.applyCount}</div>
            <div>{post.content}</div>

          </div>
        )
      })}
    </Container>
    </>
  );
}

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
`

const PostImg = styled.img`
border-radius: 50%;
width: 48px;
height: 48px;
`

export default Posts;
