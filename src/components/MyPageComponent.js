import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DogList from "./DogList";
import DogPlusModal from "../components/DogPlusModal";
import ProfileUpdate from "./ProfileUpdate";
import DaumPostcode from "react-daum-postcode";

function MyPageComponent() {
  const info = useSelector((state) => state.myPageSlice.mypage);
  // console.log(info);

  const [mungModal, setMungModal] = useState();
  const [profileModal, setProfileModal] = useState();

  const [addressPopup, setAddressPopup] = useState();
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [address, setAddress] = useState(null);

  //주소찾기 api
  const onCompletePost = (data) => {
    // console.log(data.address)
    setAddress(data.address);
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
        setLat(result.lat);
        //경도
        setLon(result.lon);
        setAddressPopup(!addressPopup);
      });
  };

  return (
    <Container>
      {mungModal && (
        <Test
          onClick={(e) => {
            setMungModal(!mungModal);
          }}
        />
      )}
      {mungModal && (
        <DogPlusModal setMungModal={setMungModal} modal={mungModal} />
      )}
      {profileModal && (
        <Test
          onClick={(e) => {
            setProfileModal(!profileModal);
            setAddressPopup(false);
          }}
        />
      )}
      {profileModal && (
        <ProfileUpdate
          setProfileModal={setProfileModal}
          modal={profileModal}
          setPopup={setAddressPopup}
          add={addressPopup}
          lon={lon}
          lat={lat}
          address={address}
        />
      )}
      {addressPopup && (
        <AddressBox>
          <DaumPostcode onComplete={onCompletePost} />
        </AddressBox>
      )}
      <RowBox>
        <Profileimg
          src={
            info?.dogProfileImgUrl
              ? info?.dogProfileImgUrl
              : "https://ifh.cc/g/rsQtyQ.png"
          }
          alt=""
        />
        <div>
          <TextBox>
            <b>{info?.nickname}</b>님 반갑습니다!
          </TextBox>
          <SubText>{info?.email}</SubText>
        </div>
        <UpdateButton
          onClick={() => {
            setProfileModal(!profileModal);
          }}
        >
          <img src="https://ifh.cc/g/S046Ot.png" alt="" />
          프로필 수정
        </UpdateButton>
      </RowBox>

      <IntroduceDiv>{info?.introduce}</IntroduceDiv>
      <DogList setMungModal={setMungModal} modal={mungModal} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Profileimg = styled.img`
  width: 60px;
  height: 60px;
  padding: 5px;
  border-radius: 50%;
`;
const TextBox = styled.div`
  font-weight: 400;
  font-size: 20px;
  padding-top: 10px;
`;

const SubText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #7a7a80;
`;

const IntroduceDiv = styled.div`
  box-sizing: border-box;
  background-color: #f5f5f5;
  height: 160px;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 50px;
`;

const UpdateButton = styled.button`
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  position: absolute;
  right: 0%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 120px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
`;

const Test = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 2;
`;

const AddressBox = styled.div`
  width: 400px;
  position: fixed;
  top: 55%;
  left: 50%;
  background-color: white;
  z-index: 5;
 
`;
export default MyPageComponent;
