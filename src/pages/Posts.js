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
  console.log(Posts)

  // const a = myMung.isRepresentative
  // console.log(a)

  return (
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

export default Posts;
