import React,{ useState } from "react";
import DaumPostcode from 'react-daum-postcode';
import { useDispatch, useSelector } from "react-redux";
import { loadMyPageAX } from "../redux/modules/myPageSlice";



function ProfileUpdate (){
  
  const dispatch = useDispatch();
  const info = useSelector((state) => state.myPageSlice.mypage);
  // console.log(info)
  //이메일 가공하기
  const email = info?.email.split('@')[0]
  React.useEffect(() => {
    dispatch(loadMyPageAX());
  }, []);

  //주소창
  const [popup, setPopup] = useState(false);
  const openPopup = ()=>{
    setPopup(true);
  }
  const closePopup = () =>{
    setPopup(false);
  }

  return(
    <>
    
    <div>닉네임</div>
    <input value={info?.nickname}></input>
    <div className="row-box">이메일
    <input value={email}></input>
    {/* <select>
      <option>직접입력</option>
      <option>naver.com</option>
      <option>nate.com</option>
    </select> */}
    </div>
    <div>휴대폰번호</div>
    <input defaultValue={info?.phoneNum}></input>
    <div>주소</div>
    <button onClick={openPopup}>우편번호 찾기</button>
    {popup && <Address onClose={closePopup}/>}
    <div></div>
    <textarea placeholder="자기소개 255자" defaultValue={info?.introduce}></textarea>
    </>
  )
}

function Address(props){
  const onCompletePost = (data) => {
    console.log(data.address);
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
      const lat = result.lat;
      //경도
      const lon = result.lon;
      console.log(lat, lon)
      
    });
    props.onClose()
  };
return(
    <div>
        <DaumPostcode onComplete={onCompletePost}/>
        <button type='button' onClick={() => {props.onClose()}}>닫기</button>
    </div>
)
}
export default ProfileUpdate;