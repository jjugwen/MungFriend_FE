import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.125.232.116:8080",
});

// const token = localStorage.getItem("token");

// 인스턴스가 생성 된 후 기본값 변경
// instance.defaults.headers.common["Authorization"] = token
//   ? `Bearer ${token}`
//   : null;

export default instance;
