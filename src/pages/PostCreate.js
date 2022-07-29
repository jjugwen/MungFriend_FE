import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../redux/modules/instance";
import { loadMyMungAX } from "../redux/modules/mungSlice";
import { useNavigate } from "react-router-dom";
import { createPostAX } from "../redux/modules/postSlice";

function PostCreate() {
  const params = useParams();
  //id값으로 게시글 판별
  const isNew = params.id === undefined;
  // console.log(params.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadMyMungAX());
  }, []);

  const dogList = useSelector((state) => state.mungSlice.mung);
  // console.log(dogList)
  const [updatePost, setUpdatePost] = useState(null);
  // console.log(updatePost);
  const [myInfo,setMyInfo]=useState(null);
  // console.log(myInfo.userRole);
  const [userModal, setUserModal]= useState(false);

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

  const [withMe, setWithMe] = useState(false);
  const clickCategory = (e) => {
    setWithMe(Boolean(e.target.value));
    // console.log(Boolean(e.target.value))
  };

  const [selectDog, setSelectDog] = useState([]);

  // const[ dogValue, setDogValue]=useState(false);
  const dogClick = (dogId) => {
    setSelectDog(
      (current) => {
        const arr = [...current];

        let index = arr.indexOf(Number(dogId));
        if (arr.includes(Number(dogId)) === true) {
          arr.splice(index, 1)
        } else {
          arr.push(Number(dogId));
        }
        return arr;
      }
    );
  };
  // 필수 정보 입력한 유저가 아니라면, 마이페이지로 돌려보내기!
  // React.useEffect(()=>{
  
  // if(myInfo.userRole==="USER"){
  //   console.log(myInfo)
  //  setUserModal(true);}
  // },[])
  
  const navigatePage=(e)=>{
   if(e.target.name === "yes"){
    navigate(`/mypage`)
   }else if(e.target.name ==="no"){
    navigate(`/posts`)
   }
  }


  //작성버튼
  const click = () => {
    if (selectDog.length === 0) {
      alert("멍 프로필을 선택해 주세요!");
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
      withMe: withMe,
    };
    // console.log(post)
    dispatch(createPostAX(post));
  };
  //  수정 게시글 데이터 가져오기
  React.useEffect(() => {
    if (!isNew) {
      instance.get(`/api/posts/${params.id}`).then((res) => {
        // axios.get(`http://localhost:5002/detail/${params.id}`).then((res) => {
        setUpdatePost(res.data);
      });
    }else if(isNew){
      instance.get(`/myinfo`).then((res)=>{
        setMyInfo(res.data)
      })

      
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
      withMe: withMe,
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

    // console.log(newUpdatePost);
  };

  const checkStyle = {
    borderColor: "transparent",
    backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`,
    backgroundSize: "100% 100%",
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#fa5a30",
  };



  return (
    <Container>
      {myInfo?.userRole==="USER" && <Test></Test>}
      {myInfo?.userRole==="USER" && <UserModal>
        <ModalText>아직 필수 정보를 입력하지 않으셨네요!<br/>
        게시글 작성은 <b>주소</b>와 
        <b> 휴대폰 번호 인증</b>을 해야만 가능해요.<br/>
        마이페이지로 이동하시겠어요?
        </ModalText>
        <RowBox>
        <NoBtn name="no" onClick={navigatePage}>아니요. 뒤로 가겠습니다.</NoBtn>
        <YesBtn name="yes" onClick={navigatePage}>네! 마이페이지로 이동할게요.</YesBtn>
        </RowBox>
        </UserModal>}
      <Title>게시글 작성</Title>
      <WithMeBox> 카테고리 선택</WithMeBox>
      <RowBox>
        <CheckBox
          className="radiotype"
          type="radio"
          name="test"
          withMe={withMe}
          onClick={()=>{setWithMe(true)}}
        />
        <WithMeTextBox withMe={withMe}
         onClick={()=>{setWithMe(true)}}
          style={withMe? {color:"#FA5A30"}:{}}
         >
          같이해요
        </WithMeTextBox>
        <CheckBox
          type="radio"
          name="test"
          onClick={clickCategory}
          value=""
          style={withMe ? {} : checkStyle}
        />
        <WithMeTextBox withMe={withMe}
         onClick={()=>{
          setWithMe(false) }}
          style={withMe? {}:{color:"#FA5A30"}}
          >
          부탁해요
        </WithMeTextBox>
        {withMe ? (
          <InfoBox>산책을 같이 할 멍친구를 모집합니다.</InfoBox>
        ) : (
          <InfoBox> 멍멍이를 산책시켜줄 멍친구를 모집합니다.</InfoBox>
        )}
      </RowBox>
      <RowBox>
        <SubText>멍 프로필 선택</SubText>
        <MiniText>* 다중선택 가능합니다.</MiniText>
      </RowBox>

      <RowBox>
        {dogList?.map((dog, index) => {
        
          return (
            <Listbox key={index}
             onClick={()=>{dogClick(dog.id)}}
              length={index}
             style={selectDog.includes(Number(dog.id)) ? {border:"2px solid #fa5a30"}:{}}
            >
              <CheckBox
                type="checkbox"
                name="isRepresentative"
                style={
                  selectDog.includes(Number(dog.id)) ? {backgroundColor:"#fa5a30"}:{}
                }
                // style={{backgroundColor: "#fa5a30"}}
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
            data-placeholder="날짜선택"
            type="date"
            ref={dateRef}
            defaultValue={updatePost?.requestStartDate.split("T")[0]}
          />
          {/*시작시간*/}
          {startHour && (
            <select ref={startHourRef} defaultValue={startHour}>
              <option value="123">시</option>
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
              <option value="123">시</option>
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
          <AddButton onClick={click} type="button">
            등록
          </AddButton>
        ) : (
          <AddButton onClick={updateClick} type="button">
            수정
          </AddButton>
        )}
      </ButtonBox>
    </Container>
  );
}
const Container = styled.div`
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

const Test = styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
background: rgba(0,0,0,0.8);
overflow: hidden;
z-index: 2;
`


const UserModal = styled.div`
  background-color: white;
  width: 550px;
  height: 215px;
  border-radius: 14px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`
const ModalText =styled.div`
margin-top: 15px;
font-size: 21px;
font-weight: 700;
padding: 20px;
text-align: center;
b{
  color:#fa5a30;
}
`
const NoBtn =styled.button`
 position: absolute;
  bottom: 5%;
  left: 2%;
  width: 47%;
  height: 48px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`
const YesBtn =styled.button`
 position: absolute;
  bottom: 5%;
  right: 2%;
  width: 47%;
  margin-left: 2%;
  height: 48px;
  color: white;
  background-color: #fa5a30;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 50px;
`;
const WithMeBox = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-right: 13px;
`;
const WithMeTextBox = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  padding-top: 17px;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 50px;
  /* color: ${(props) => (props.withMe ?  "#FA5A30": "black")}; */
`

const InfoBox = styled.div`
  color: gray;
  font-size: 14px;
  padding: 18px;
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
  .radiotype {
    margin: 18px 18px 18px 0px;
  }
 
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
  /* margin-left: 15px; */
  margin-left: ${props=> props.length >= 1?"10px;":""};
  cursor: pointer;
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
  background-color:${props=> props.withMe? "#fa5a30;":"#cccccc;"};
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
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
    border: 1px solid #e3e5e9;
  }

  select {
    font-family: "Pretendard";
    font-size: 16px;
    width: 12.5%;
    height: 52px;
    border: 1px solid #e3e5e9;
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
