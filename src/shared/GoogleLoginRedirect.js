import React, { useEffect } from "react";

const GoogleLoginRedirect = () => {
  useEffect(() => {
    // 토큰 get
    const accessToken = new URL(window.location.href).searchParams.get(
      "Authorization"
    );
    // console.log(accessToken);
    sessionStorage.setItem("token", accessToken);

    //id get
    const username = new URL(window.location.href).searchParams.get("username");
    // console.log(username);
    sessionStorage.setItem("username", username);

    //닉네임 get
    const nickname = new URL(window.location.href).searchParams.get("nickname");
    const decodeName = decodeURI(decodeURIComponent(nickname));
    // console.log(decodeName, "닉네임");
    sessionStorage.setItem("nickname", decodeName);

    //memeberId get
    const memberId = new URL(window.location.href).searchParams.get("memberId");
    sessionStorage.setItem("memberId", memberId);

    //refreshToken get
    const refreshToken = new URL(window.location.href).searchParams.get(
      "refreshToken"
    );
    sessionStorage.setItem("refreshToken", refreshToken);

    //profile 이미지 get
    // const profileImage = new URL(window.location.href).searchParams.get(
    //   "profile"
    // );
    // console.log(profileImage);
    // const decodeProfileImage = decodeURI(decodeURIComponent(profileImage));
    // console.log(decodeProfileImage, "profile");
    // sessionStorage.setItem("profileImage", decodeProfileImage);

    //메인으로 보내기
    window.location.replace("/");
  }, []);
  return <></>;
};

export default GoogleLoginRedirect;
