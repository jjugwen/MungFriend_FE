import React,{ useRef, useState } from "react";
import DaumPostcode from 'react-daum-postcode';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate}from 'react-router-dom'
import instance from "../redux/modules/instance";
import { loadMyPageAX } from "../redux/modules/myPageSlice";



function ProfileUpdate (){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //정보창
  const nicknameRef = useRef();
  const emailRef = useRef();
  const phoneNumRef= useRef();
  const introduceRef=useRef();
  const [lon, setLon] =useState(null)
  const [lat, setLat] =useState(null)
  const [address, setAddress] =useState(null)

  
  const info = useSelector((state) => state.myPageSlice.mypage);
  // console.log(info)
  //이메일 가공하기
  // const email = info?.email.split('@')[0]
  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);

  //주소창
  const [popup, setPopup] = useState(false);
  const Popup = ()=>{
    setPopup(!popup);
  }

  const updateMypage = ()=>{
    const update_data ={
      nickname:nicknameRef.current.value,
      email:emailRef.current.value,
      address: address,
      latitude: lat,
      longitude: lon,
      introduce:introduceRef.current.value,
      phoneNum:phoneNumRef.current.value,
      isAgree:true
    }
    // console.log(update_data);
    instance.post(`/mypage`, update_data).then(()=>{
      navigate('/mypage')
    })
  }

  return(
    <>
    
    <div>닉네임</div>
    <input defaultValue={info?.nickname} ref={nicknameRef}></input>
    <div className="row-box">이메일
    <input defaultValue={info?.email} ref={emailRef}></input>
    {/* <select>
      <option>직접입력</option>
      <option>naver.com</option>
      <option>nate.com</option>
    </select> */}
    </div>
    <div>휴대폰번호</div>
    <input defaultValue={info?.phoneNum} ref={phoneNumRef}></input>
    <div>주소</div>
    <button onClick={Popup}>우편번호 찾기</button>
    {popup && <Address onClose={Popup} setLon={setLon} setLat={setLat} setAddress={setAddress}/>}
    <div></div>
    <textarea placeholder="자기소개 255자" defaultValue={info?.introduce} ref={introduceRef}></textarea>
    <button onClick={updateMypage}>등록하기</button>
    </>
  )
}

function Address(props){
   // 원인 : lat, lon에 값이 들어간건 맞음
   // 리액트는 컴포넌트가 닫히면 안에 들어있는 useState값도 없어짐


  const onCompletePost = (data) => {
// console.log(data.address)
   props.setAddress(data.address)
    Promise.resolve(data)
    .then((o) => {
      const { address } = data;

      return new Promise((resolve, reject) => {
        const geocoder = new window.daum.maps.services.Geocoder();

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
      props.setLat(result.lat)
      //경도
    props.setLon(result.lon)
    
     
    });
  };
 
return(
    <div>
        <DaumPostcode onComplete={onCompletePost}/>
        <button type='button' onClick={() => {props.onClose()}}>닫기</button>
    </div>
)
}
export default ProfileUpdate;