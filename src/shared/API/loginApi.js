import axios from "axios";

//axios
export const loginDB = (username, password) => {
  // console.log(username, password);

  return async function () {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/member/login`,
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
        sessionStorage.setItem("refreshToken", response.data.refreshToken);
        // window.alert(response.data.message);
        window.location.replace("/");
      } else if (response.data.status === "false") {
        // console.log(response.data.status);
        window.alert(response.data.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };
};

export const actionCreators = { loginDB };
