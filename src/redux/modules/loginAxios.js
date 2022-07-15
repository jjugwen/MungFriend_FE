import axios from "axios";

//axios
export const loginDB = (username, password) => {
  // console.log(username, password);
  return function (dispatch) {
    axios
      .post(
        `http://3.39.6.175/member/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "true") {
          // console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("nickname", response.data.nickname);
          // window.alert(response.data.message);
          window.location.replace("/");
        } else if (response.data.status === "false") {
          console.log(response.data.status);
          window.alert(response.data.message);
        }
      })
      .catch((err) => {
        window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

const actionCreators = { loginDB };
export { actionCreators };
