// 상세페이지 map
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Map = () => {
  const markerImage = `${process.env.REACT_APP_IMAGE_URL}/Map/Ellipse 41.png`;
  const { kakao } = window;
  // 위치 정보 가져오기
  const detailList = useSelector((state) => state.postDetailSlice.list);
  const house = detailList?.address;

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(37.5023088, 127.044437),
      level: 6,
    };
    let map = new window.kakao.maps.Map(container, options);

    // 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
    function setZoomable(zoomable) {
      // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
      map.setZoomable(zoomable);
    }

    var imageSrc = markerImage, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(200, 200), // 마커이미지의 크기입니다
      imageOption = {
        offset: new kakao.maps.Point(120, 120),
      }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(house, function (result, status) {
      //  정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다

        var marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
          map: map,
        });
      }
      //   // 인포윈도우로 장소에 대한 설명을 표시합니다
      //   var infowindow = new kakao.maps.InfoWindow({
      //     content: `<div style="width:150px;text-align:center;padding:6px 0;">${house.houseName}</div>`,
      //   });
      //   infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(markerPosition);
    });

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    setZoomable(false); //확대 축소 막기
  }, [{ kakao }]);

  return (
    <Container>
      <div className="header">
        <h1 className="DetailTitle">작성자 위치</h1>
      </div>
      <div
        id="map"
        style={{
          width: "100%",
          // width: "940px",
          height: "400px",
          filter: "brightness(107%) saturate(140%) hue-rotate(-10deg)",
          marginBottom: "3%",
        }}
      >
        <div id="map" />
      </div>
    </Container>
  );
  // return <div ref={map}></div>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
`;

export default Map;
