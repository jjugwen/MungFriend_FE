import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../redux/modules/instance";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import { useNavigate } from "react-router-dom";
import { createPostAX } from "../redux/modules/postSlice";

const selectDog = [];
function PostCreate() {
  const params = useParams();
  //id값으로 게시글 판별
  const isNew = params.id === undefined;
  console.log(params.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadMyMungAX());
  }, []);

  const dogList = useSelector((state) => state.mungSlice.mung);
  // console.log(dogList)
  const [updatePost, setUpdatePost] = useState(null);
  // console.log(updatePost);

  const dateRef = useRef();
  const time = {
    hour: [...Array(24).keys()].map((key) => key + 1),
    minute: [...Array(60).keys()].map((key) => key),
  };
  //입력창 정보
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const startHourRef = useRef(null);
  const startMinuteRef = useRef(null);
  const endHourRef = useRef(null);
  const endMinuteRef = useRef(null);

  //작성버튼
  const click = () => {
    if (selectDog.length === 0) {
      alert("멍 프로필을 선택해 주세요!");
      window.addEventListener((e) => {
        e.preventDefault();
      });
    }

    let startHour = startHourRef.current.value;
    if (startHour.length === 1) {
      startHour = 0 + startHour;
    }
    let startMinute = startMinuteRef.current.value;
    if (startMinute.length === 1) {
      startMinute = 0 + startMinute;
    }
    let endHour = endHourRef.current.value;
    if (endHour.length === 1) {
      endHour = 0 + endHour;
    }
    let endMinute = endMinuteRef.current.value;
    if (endMinute.length === 1) {
      endMinute = 0 + endMinute;
    }
    const post = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      dogIdList: selectDog,
      requestStartDate:
        dateRef.current.value + "T" + startHour + ":" + startMinute,
      requestEndDate: dateRef.current.value + "T" + endHour + ":" + endMinute,
    };
    // console.log(post);
    dispatch(createPostAX(post));
    // navigate(`/posts`);
    // window.location.reload();
  };
  //  수정 게시글 데이터 가져오기
  React.useEffect(() => {
    if (!isNew) {
      instance.get(`/api/posts/${params.id}`).then((res) => {
        // axios.get(`http://localhost:5002/detail/${params.id}`).then((res) => {
        setUpdatePost(res.data);
      });
    }
  }, []);

  let startHour = isNew
    ? "123"
    : Number(updatePost?.requestStartDate.split("T")[1].split(":")[0]);
  let startMinute = isNew
    ? "123"
    : Number(updatePost?.requestStartDate.split("T")[1].split(":")[1]);
  let endHour = isNew
    ? "123"
    : Number(updatePost?.requestEndDate.split("T")[1].split(":")[0]);
  let endMinute = isNew
    ? "123"
    : Number(updatePost?.requestEndDate.split("T")[1].split(":")[1]);
  console.log(updatePost?.requestEndDate.split("T")[1].split(":"));
  //수정버튼
  const updateClick = () => {
    if (selectDog.length === 0) {
      alert("멍 프로필을 선택해 주세요!");
      window.addEventListener((e) => {
        e.preventDefault();
      });
    }

    let startHour = startHourRef.current.value;
    if (startHour.length === 1) {
      startHour = 0 + startHour;
    }
    let startMinute = startMinuteRef.current.value;
    if (startMinute.length === 1) {
      startMinute = 0 + startMinute;
    }
    let endHour = endHourRef.current.value;
    if (endHour.length === 1) {
      endHour = 0 + endHour;
    }
    let endMinute = endMinuteRef.current.value;
    if (endMinute.length === 1) {
      endMinute = 0 + endMinute;
    }
    const newUpdatePost = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      dogIdList: selectDog,
      requestStartDate:
        dateRef.current.value + "T" + startHour + ":" + startMinute,
      requestEndDate: dateRef.current.value + "T" + endHour + ":" + endMinute,
    };

    instance
      .put(`/api/posts/${params.id}`, newUpdatePost)
      .then(() => {
        navigate(`/posts`);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.data.message);
      });
    console.log(newUpdatePost);
  };
  // 수정이라면, dogList 초기화 해주기
  // 두번째 수정때 dogList가 배열에서 빠지는 오류 때문에추가
  if (!isNew) {
    selectDog.length = 0;
  }

  const a = (e) => {
    let index = selectDog.indexOf(Number(e.target.value));
    if (selectDog.includes(Number(e.target.value)) === true) {
      selectDog.splice(index, 1);
    } else {
      selectDog.push(Number(e.target.value));
    }

    // console.log(e.target.value);
    // console.log(selectDog);
  };

  return (
    <Container>
      <Title>게시글 작성</Title>
      <RowBox>
        <SubText>멍 프로필 선택</SubText>
        <MiniText>* 다중선택 가능합니다.</MiniText>
      </RowBox>

      <RowBox>
        {dogList?.map((dog, index) => {
          return (
            <Listbox key={index}>
              <CheckBox
                onClick={a}
                value={dog.id}
                type="checkbox"
                name="isRepresentative"
              />
              <DogImg src={dog.dogImageFiles[0].imageUrl} alt="" />
              <div>
                <RowBox>
                  <TextBox16>
                    {dog.name}
                    {dog.gender === "여" ? (
                      <img src="https://ifh.cc/g/1DDK9D.png" alt="" />
                    ) : (
                      <img src="https://ifh.cc/g/WP9vdy.png" alt="" />
                    )}
                  </TextBox16>
                </RowBox>
                <TextBox14>
                  {dog.age}세, {dog.size}견
                </TextBox14>
              </div>
            </Listbox>
          );
        })}
      </RowBox>
      <SubText>신청날짜</SubText>
      <RowBox>
        <InputBox>
          <input
            type="date"
            ref={dateRef}
            defaultValue={updatePost?.requestStartDate.split("T")[0]}
          />
          {/*시작시간*/}
          {startHour && (
            <select ref={startHourRef} defaultValue={startHour}>
              <option value="123">시간</option>
              {time.hour.map((hour, index) => {
                return (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                );
              })}
            </select>
          )}
          {/*시작분*/}
          {startHour && (
            <select ref={startMinuteRef} defaultValue={startMinute}>
              <option value="123">분</option>
              {time.minute.map((minute, index) => {
                return (
                  <option key={index} value={minute}>
                    {minute}
                  </option>
                );
              })}
            </select>
          )}
          <div>~</div>
          {/*끝시간*/}
          {endHour && (
            <select ref={endHourRef} defaultValue={endHour}>
              <option value="123">시간</option>
              {time.hour.map((hour, index) => {
                return (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                );
              })}
            </select>
          )}

          {/*끝분*/}
          {endHour && (
            <select ref={endMinuteRef} defaultValue={endMinute}>
              <option value="123">분</option>
              {time.minute.map((minute, index) => {
                return (
                  <option key={index} value={minute}>
                    {minute}
                  </option>
                );
              })}
            </select>
          )}
        </InputBox>
      </RowBox>

      <SubText>내용입력</SubText>
      <hr />
      <CoulmnBox>
        <input
          placeholder="제목을 입력해 주세요"
          ref={titleRef}
          defaultValue={updatePost ? updatePost.title : ""}
        />

        <textarea
          placeholder="내용을 입력해 주세요"
          ref={contentRef}
          defaultValue={updatePost ? updatePost.content : ""}
        />
      </CoulmnBox>

      <ButtonBox>
        <button
          onClick={() => {
            navigate("/posts");
          }}
        >
          취소
        </button>
        {isNew ? (
          <AddButton onClick={click} type="button">등록</AddButton>
        ) : (
          <AddButton onClick={updateClick} type="button">수정</AddButton>
        )}
      </ButtonBox>
    </Container>
  );
}
const Container = styled.form`
  width: 65%;
  margin: auto;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  hr {
    border: 1px solid black;
  }

  @media screen and (max-width: 960px) {
    width: 90%;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 50px;
`;
const SubText = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-right: 13px;
  margin-bottom: 23px;
`;
const MiniText = styled.div`
  margin-top: 5px;
  color: #7a7a80;
  font-size: 14px;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Listbox = styled.div`
  width: 330px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 80px;
  :hover {
    border: 2px solid #fa5a30;
  }

  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.04);
`;

const CheckBox = styled.input`
  margin: 18px;
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50px;
  background-image: url("data:image/svg+xml,%3csvg   viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-color: #cccccc;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #fa5a30;
  }
`;

const DogImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const TextBox16 = styled.div`
  font-weight: 600;
  font-size: 16px;
  img {
    margin-left: 5px;
    width: 17px;
    height: 17px;
  }
`;

const TextBox14 = styled.div`
  font-size: 14px;
  color: #7a7a80;
  padding: 5px;
  margin-top: 5px;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1.5%;
  font-size: 30px;
  margin-bottom: 80px;
  input {
    font-family: "Pretendard";
    font-size: 16px;
    width: 48%;
    height: 48px;
  }
  select {
    font-family: "Pretendard";
    font-size: 16px;
    width: 12.5%;
    height: 48px;
  }
`;
const CoulmnBox = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: none;
    border-bottom: 1px solid #e3e5e9;
    font-family: "Pretendard";
    font-size: 16px;
    height: 61px;
  }
  textarea {
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #e3e5e9;
    font-family: "Pretendard";
    font-size: 16px;
    resize: none;
    height: 279px;
    padding-top: 30px;
  }
`;

const ButtonBox = styled.div`
  align-items: center;

  display: flex;
  justify-content: center;
  width: 40%;
  margin: auto;
  button {
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    width: 48%;
    margin: 10px;
    height: 48px;
    border: none;
  }
`;

const AddButton = styled.button`
  background: #fa5a30;
  color: white;
`;
export default PostCreate;
