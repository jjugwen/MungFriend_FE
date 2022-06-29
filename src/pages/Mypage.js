import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { loadMyPageAX } from "../redux/modules/myPageSlice";

const Mypage = () => {
  React.useEffect(() => {
    loadMyPageAX();
  }, []);
  const info = useSelector((state) => state.myPageSlice);
  console.log(info);

  // 자기소개가 없다면 등록하기 버튼이 나오도록 해보기
  const [introduce, setIntroduce] = useState(false);
  React.useEffect(() => {
    axios.get(`http://localhost:5001/mypage`).then((response) => {
      setIntroduce(response.data.introduce);
      // console.log(response.data.introduce);
    });
  }, []);

  return (
    <Container>
      {/* <div>{info?.nickname}</div>
      <div>{info?.email}</div>
      {introduce===""? <button>자기소개 등록하기</button> : <div>{introduce}</div>}

      <DogList>
        {info?.dogList.map((dog, i) => {
          return (
            <div key={i}>
              <div>{dog.name}</div>
              <div>{dog.gender}</div>
              <div>{dog.size}</div>
              <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
    
            </div>
          );
        })}
      </DogList>

      <PostList>
        {info?.myPostList.map((mypost, i) => {
          return (
            <div key={i}>
              <div>{mypost.title}</div>
              <div>{mypost.modifiedAt}</div>
       
            </div>
          );
        })}
      </PostList>
   
      <ReviewList>
        {info?.reviewList.map((review, i) => {
          return (
            <div key={i}>
              <div>{review.writer}</div>
              <div>{review.comment}</div>
              <ReviewImg src={review.imagePath} alt="" />
            </div>
          );
        })}
      </ReviewList> */}
    </Container>
  );
};
const Container = styled.div``;

const DogList = styled.div`
  display: flex;
  flex-direction: row;
`;

const DogImg = styled.img`
  width: 200px;
  height: 200px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewImg = styled.img`
  width: 200px;
  height: 200px;
`;
export default Mypage;
