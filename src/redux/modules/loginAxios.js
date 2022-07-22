import axios from "axios";

//axios
export const loginDB = (username, password) => {
  // console.log(username, password);
  return function () {
    try {
      const response = axios.post(
        `https://hjkim-sparta.shop/member/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials: true,
          },
        }
      );
      if (response.data.status === "true") {
        // console.log(response);
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("nickname", response.data.nickname);
        sessionStorage.setItem("memberId", response.data.memberId);
        // window.alert(response.data.message);
        window.location.replace("/");
      } else if (response.data.status === "false") {
        console.log(response.data.status);
        window.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const actionCreators = { loginDB };
