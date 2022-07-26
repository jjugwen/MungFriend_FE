import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 2000,
});

const token = sessionStorage.getItem("token");

// 인스턴스가 생성 된 후 기본값 변경
instance.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    // window.alert(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 400) {
      // console.log(error.response.data);
      window.alert(error.response.data.errorMessage);
    } else if (error.response.status === 401) {
      sessionStorage.clear();
      window.location.replace("/needlogin");
    } else if (error.response.status === 403) {
      alert(
        "필수 정보 입력 후, 사용 가능한 기능입니다. 마이페이지 프로필 수정에서 필수 정보(핸드폰 번호, 주소) 입력 후 이용해 주세요. "
      );
      window.location.replace("/mypage");
    } else {
      window.alert(error.response.data.errorMessage);
      window.location.replace("/error");
    }
    return Promise.reject(error);
  }
);

export default instance;
