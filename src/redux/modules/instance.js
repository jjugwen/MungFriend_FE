import axios from "axios";
import ErrorNoAccess from "../../components/shared/errors/ErrorNoAccess";

const instance = axios.create({
  baseURL: "https://hjkim-sparta.shop",
  timeout: 5000,
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
    // window.alert(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 400) {
      window.alert(error.response.data.errorMessage);
      console.log("interceptor 400!");
    }
    if (error.response.status === 401) {
      // window.alert(error.response.data.errorMessage);
      console.log("인터셉터 401!", error.response.data.errorMessage);
    }
    if (error.response.status === 404) {
      console.log("인터셉터 404!", error);
    }

    return Promise.reject(error);
  }
);

export default instance;
