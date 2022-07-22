import React, { useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../redux/modules/instance";
import { loadMyPageAX } from "../redux/modules/myPageSlice";

function ProfileUpdate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //정보창
  const nicknameRef = useRef();
  const emailRef = useRef();
  const phoneNumRef = useRef();
  const introduceRef = useRef();
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [address, setAddress] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState();

  const info = useSelector((state) => state.myPageSlice.mypage);
  console.log(info)
  //이메일 가공하기
  // const email = info?.email.split('@')[0]
  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);

  //주소창
  const [popup, setPopup] = useState(false);
  const Popup = () => {
    setPopup(!popup);
  };
  
  const updateMypage = () => {

    let update_data = {
      nickname: nicknameRef.current.value,
      email: emailRef.current.value,
      address: address? address: info?.address,
      latitude: lat? lat: info?.latitude,
      longitude: lon? lon: info?.longitude,
      introduce: introduceRef.current.value,
      // phoneNum: phoneNumRef.current.value,
      isAgree: info?.isAgree?info?.isAgree:isAgree,
    };

    console.log(update_data);

    instance.post(`/mypage`, update_data).then((response) => {
      props.setProfileModal(!props.modal);
      //리덕스 데이터로 바꿔줘야함!
      dispatch(loadMyPageAX())
      alert(response.data.message);
      if(response.data.message==="약관 동의 후 정보 수정이 가능합니다."){
        props.setProfileModal(props.modal);
      }
    }).catch(error=>{
      alert(error)
    });

  };
  const [isAgree,setIsAgree] = useState(false);

  const [firstAuth, setFirstAuth]= useState({});
  // console.log(isAgree)
  //핸드폰 인증하기
  const phoneCheck=()=>{
    const phoneNum={phoneNum:phoneNumRef.current.value}
    instance.post('/phone/auth',phoneNum).then(res=>setFirstAuth(res.status))
    // res.status=>200 시 성공
  }

  return (
    <Container>
      <Title>프로필 수정</Title>
      <TextBox>닉네임</TextBox>
      <OneInput defaultValue={info?.nickname?info?.nickname:""} ref={nicknameRef}></OneInput>
      <TextBox>이메일</TextBox>
      <OneInput defaultValue={info?.email?info?.email:""} ref={emailRef}></OneInput>
      {/* <select>
      <option>직접입력</option>
      <option>naver.com</option>
      <option>nate.com</option>
    </select> */}

      <TextBox>휴대폰번호</TextBox>
      <RowBox>
        <TwoInput defaultValue={info?.phoneNum?info?.phoneNum:""} ref={phoneNumRef}></TwoInput>
        <TwoButton type="button" onClick={phoneCheck}>입력</TwoButton>
        {firstAuth===200?<div><input></input></div> :""}
      </RowBox>
      <TextBox>주소</TextBox>
      <RowBox>
        <TwoInput value={address? address: info?.address}></TwoInput>
        <TwoButton onClick={Popup} type="button">우편번호 찾기</TwoButton>
        {popup && (
          <Address
            onClose={Popup}
            setLon={setLon}
            setLat={setLat}
            setAddress={setAddress}
          />
        )}
      </RowBox>
      
     {info?.isAgree===true? "":<>
     <TextBox>멍친구 <a href="https://protective-iodine-bc7.notion.site/bbd8abbf735140109899396c1c87dc61"
              >이용약관</a>, <a href="https://protective-iodine-bc7.notion.site/78bef62511ef4254bfaa1638d1550fe0"
              >개인정보</a> 취급방침에 모두 동의합니다.</TextBox>
      <RowBox>
      <CheckInput type="checkbox" defaultValue={isAgree} required onClick={()=>{setIsAgree(true)}}/> <TextBox>동의함</TextBox></RowBox></>}
      

      <textarea
        placeholder="자기소개 255자"
        defaultValue={info?.introduce?info?.introduce:""}
        ref={introduceRef}
      ></textarea>

      <RowBox>
        <CancleBtn
          onClick={() => {
            props.setProfileModal(!props.modal);
          }}
        >
          취소
        </CancleBtn>
        {/*

        */}
        <UpdateBtn onClick={updateMypage}>수정</UpdateBtn>
      </RowBox>
    </Container>
  );
}

function Address(props) {
  // 원인 : lat, lon에 값이 들어간건 맞음
  // 리액트는 컴포넌트가 닫히면 안에 들어있는 useState값도 없어짐

  const onCompletePost = (data) => {
    // console.log(data.address)
    props.setAddress(data.address);
    Promise.resolve(data)
      .then((o) => {
        const { address } = data;

        return new Promise((resolve, reject) => {
          const geocoder =new window.daum.maps.services.Geocoder() ;

          geocoder.addressSearch(address, (result, status) => {
            if (status === window.daum.maps.services.Status.OK) {
              const { x, y } = result[0];

              resolve({ lat: y, lon: x });
            } else {
              reject();
            }
          });
        });
      })
      .then((result) => {
        // console.log(result); // 위, 경도 결과 값
        //위도
        props.setLat(result.lat);
        //경도
        props.setLon(result.lon);
        props.onClose();
      });
  };

  return (
    <AddressBox>
      <DaumPostcode onComplete={onCompletePost} />
      {/* <button type='button' onClick={() => {props.onClose()}}>닫기</button> */}
    </AddressBox>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 37%;
  padding: 20px;
  border-radius: 20px;
  //모달 css
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 3;
  //
  textarea {
    resize: none;
    border: 1px solid #e3e5e9;
    border-radius: 4px;
    margin: 20px 0px;
    height: 240px;
    font-size: 16px;
    font-family: "Pretendard";
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;
const TextBox = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin: 20px 0 8px 0;
  a{
    color: black;
  }
`;

const OneInput = styled.input`
  border: 1px solid #e3e5e9;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
`;

const TwoInput = styled.input`
  border: 1px solid #e3e5e9;
  width: 70%;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
`;

const TwoButton = styled.button`
  border: none;
  height: 48px;
  border-radius: 4px;
  width: 30%;
  margin-left: 5%;
  background: #b8bbc0;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const AddressBox = styled.div`
  position: fixed;
  left: 50%;
  margin-top: 40px;
  background-color: white;
`;
const CheckInput=styled.input`

    margin: 18px;
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50px;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #cccccc;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: #fa5a30;
    }
  
`
const CancleBtn = styled.button`
  border: none;
  height: 48px;
  border-radius: 4px;
  width: 49%;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #e3e5e9;
`;
const UpdateBtn = styled.button`
  border: none;
  margin-left: 2%;
  height: 48px;
  border-radius: 4px;
  width: 49%;
  background: #fa5a30;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;

export default ProfileUpdate;
