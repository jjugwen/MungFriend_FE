import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loadMyPageAX } from "../redux/modules/myPageSlice";

function MyPostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);
  const info = useSelector((state) => state.myPageSlice.mypage);

  return (
    <Container>
      <Title >작성한 게시글</Title>
      <Count >
        총
        <OrangeColor >
          {info?.myPostList.length}
        </OrangeColor>
        건
      </Count>
      <hr />
      <PostList>
        {info?.myPostList.slice(0).reverse().map((mypost, i) => {
          return (
            <RowBox
              key={i}
              
              onClick={() => {
                navigate(`/posts/${mypost.id}`);
              }}
            >
              <PostTitle >{mypost.title}</PostTitle>
              <ModifiedAt>
                {mypost.modifiedAt.split("T")[0]}
              </ModifiedAt>
            </RowBox>
          );
        })}
      </PostList>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  hr {
    border: 1px solid black;
    background-color: black;
    margin-bottom: 0;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 30px;
`;
const Count = styled.div`
  display: flex;
  font-weight: 500;
`;
const OrangeColor = styled.div`
  color: #fa5a30;
`;

const PostList = styled.div`
  height: 327px;
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e3e5e9;
  align-items: center;
  justify-content: space-between;
  height: 67px;
  cursor: pointer;
`;
const PostTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`;
const ModifiedAt = styled.div`
  font-size: 14px;
  color: #7a7a80;
`;
export default MyPostList;
