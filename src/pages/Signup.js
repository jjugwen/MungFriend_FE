import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import instance from "../redux/modules/instance";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  // 아이디 제한 조건 : 3자리 이상 9자리 이하 영문소문자/숫자
  const is_username = (username) => {
    let _reg = /^(?=.*[a-z0-9])[a-z0-9]{3,9}$/;
    return _reg.test(username);
  };

  // 비밀번호 제한 조건 : 8자리 이상 20자리 이하 영문대소문자, 특수문자 !@#$%^&.* 가능
  const is_password = (password) => {
    let _reg = /^[0-9a-zA-Z!@#$%^&.*]{8,20}$/;
    return _reg.test(password);
  };

  //이메일 제한 조건 : 이메일 형식
  const is_email = (email) => {
    let _reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return _reg.test(email);
  };

  // 닉네임 제한 조건 : 3자리 이상 9자리 이하 한글(초성도x)/영문
  const is_nickname = (nickname) => {
    let _reg = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{3,9}$/;
    return _reg.test(nickname);
  };

  //제약 조건 통과 시 inputbox 아래 글씨 바꾸기 위한 useState 사용
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [pwcheck, setPwcheck] = useState("");
  const [usernameCheck, setUsernameCheck] = useState(false);
  const [emailcheck, setEmailCheck] = useState(false);
  const [nicknamecheck, setNicknameCheck] = useState(false);

  //비밀번호 체크 (비어있는지 && 크로스체크 확인)
  const pwDubleCheck = () => {
    if (password === "" || pwcheck === "") {
      return false;
    }
    if (!is_password(password)) {
      return false;
    }
    if (password === pwcheck) {
      return true;
    } else {
      return false;
    }
  };

  //아이디 유효성 체크
  const IdCheck = (e) => {
    if (!is_username(e.target.value)) {
      setUsernameCheck(false);
      return;
    } else {
      setUsernameCheck(true);
    }
    setUsername(e.target.value);
    console.log(setUsername(e.target.value));
  };

  //email 유효성 체크
  const emailCheck = (e) => {
    if (!is_email(e.target.value)) {
      setEmailCheck(false);
      return;
    } else {
      setEmailCheck(true);
    }
    setEmail(e.target.value);
    // console.log(setEmail(e.target.value));
  };

  //닉네임 유효성 체크
  const nickCheck = (e) => {
    if (!is_nickname(e.target.value)) {
      setNicknameCheck(false);
      return;
    } else {
      setNicknameCheck(true);
    }
    setNickname(e.target.value);
    // console.log(setNickname(e.target.value));
  };

  // 주소 찾기 모달 상태(opend-> 불리언)
  const [opened, setOpened] = useState(false);
  // 주소 모달창 여닫기
  const modalClose = () => {
    setOpened(!opened);
  };
  // 주소 찾기 값 input에 전달
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const { daum } = window;
  const onComplete = (data) => {
    setAddress(data.address);
    setOpened(false);
    Promise.resolve(data)
      .then((o) => {
        const { address } = data;

        return new Promise((resolve, reject) => {
          const geocoder = new daum.maps.services.Geocoder();

          geocoder.addressSearch(address, (result, status) => {
            if (status === daum.maps.services.Status.OK) {
              const { x, y } = result[0];

              resolve({ lat: y, lon: x });
            } else {
              reject();
            }
          });
        });
      })
      .then((result) => {
        console.log(result); // 위, 경도 결과 값
        const lat = result.lat;
        const lon = result.lon;
        setLatitude(lat);
        setLongitude(lon);
      });
  };

  //약관 동의 (isAgree)
  const [isAgree, setIsAgree] = useState(false);
  const onChecked = (isAgree) => {
    if (isAgree) {
      setIsAgree(true);
    } else {
      setIsAgree(false);
    }
  };

  const data = {
    username,
    password,
    nickname,
    email,
    address,
    isAgree,
    latitude,
    longitude,
  };
  // console.log(data);

  // 회원가입 버튼 클릭 시 유효성 검사와 가입 시키기
  const signup = () => {
    if (
      username === "" ||
      password === "" ||
      nickname === "" ||
      email === "" ||
      address === ""
    ) {
      alert("모두 입력해주세요");
      return;
    }
    if (!pwDubleCheck()) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    if (isAgree === false) {
      alert("회원가입 약관에 동의해주세요.");
      return;
    } else {
      // console.log(data);
      instance
        .post("/member/signup", data)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "true") {
            console.log(response.data.message);
            navigate("/signupsuccess");
          } else if (response.data.status === "false") {
            console.log(response.data.status);
            window.alert(response.data.message);
          }
        })
        .catch((err) => {
          window.alert("에러가 발생했어요!");
          console.log(err);
        });
    }
  };
  // const [sel_email, setSel_email] = useState();
  // const emailhandler = (e) => {
  //   setSel_email(e.target.value);
  // };
  // console.log(`${email}@${sel_email}`);
  // console.log(email);

  return (
    <>
      <div className="SignupOutterBox">
        {/* <form  action="#"> */}
        <div>
          <label htmlFor="id" className="SignupText">
            아이디
          </label>
          <br />
          <input
            className="LoginInputBox"
            naem="username"
            type="text"
            placeholder="아이디를 입력해주세요."
            onChange={IdCheck}
            required
          />
          <Check>
            {usernameCheck
              ? ""
              : "*아이디는 3자리 이상 9자리 이하 영어 소문자 및 숫자입니다"}
          </Check>
          <Check2>{usernameCheck ? "사용가능한 형식입니다" : ""}</Check2>
          <br />
          <label htmlFor="password" className="SignupText">
            비밀번호
          </label>
          <br />
          <input
            className="LoginInputBox"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호(8~20자리)를 입력하세요"
            required
          />
          <br />
          <br />
          <label htmlFor="passwordCheck" className="SignupText">
            비밀번호 확인
          </label>
          <br />
          <input
            className="LoginInputBox"
            type="password"
            onChange={(e) => {
              setPwcheck(e.target.value);
            }}
            placeholder="비밀번호를 한번 더 입력해주세요."
            // required
          />
          <Check>{pwDubleCheck() ? "" : "*비밀번호를 확인해주세요"}</Check>
          <Check2>{pwDubleCheck() ? "비밀번호가 일치합니다" : ""}</Check2>
          <br />
          <label htmlFor="email" className="SignupText">
            이메일
          </label>
          <br />
          <div style={{ display: "flex" }}>
            <input
              className="LoginInputBox"
              name="email"
              placeholder="이메일을 입력해주세요."
              onChange={emailCheck}
              required
            />
            {/* <span>
              <select
                name="sel_email"
                onChange={(e) => {
                  emailhandler(e);
                }}
              >
                <option value="etc">직접선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.net</option>
              </select>
            </span> */}
          </div>
          <Check>{emailcheck ? "" : "*이메일 형식이 아닙니다"}</Check>
          <Check2>{emailcheck ? "사용가능한 형식입니다" : ""}</Check2>
          <br />
          <label htmlFor="nickname" className="SignupText">
            닉네임
          </label>
          <input
            className="LoginInputBox"
            name="nickname"
            onChange={nickCheck}
            placeholder="닉네임을 입력해주세요."
            required
          />
          <Check>
            {nicknamecheck ? "" : "*닉네임은 3자리 이상 9자리 이하입니다"}
          </Check>
          <Check2>{nicknamecheck ? "사용가능한 형식입니다" : ""}</Check2>
          <br />
          <label htmlFor="adress" className="SignupText">
            주소
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              className="LoginInputBox"
              style={{ width: "280px" }}
              placeholder="주소를 입력해주세요."
              name="address"
              onChange={(e) => e.current.value}
              value={address}
              required
            ></input>
            <div
              onClick={() => {
                modalClose();
              }}
              style={{
                border: "2px solid #EEEEEE",
                width: "148px",
                height: "52px",
                borderRadius: "8px",
                backgroundColor: "#FFF",
              }}
            >
              <div
                className="SignupText"
                style={{
                  textAlign: "center",
                  margin: "17px",
                }}
              >
                우편번호 찾기
              </div>
            </div>
          </div>
          {opened ? (
            <div>
              <DaumPostCode style={postCodeStyle} onComplete={onComplete} />
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "440px",
              margin: "2% 0%",
            }}
          >
            <span>위치서비스 제공에 동의합니다.</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className="CheckboxStyle"
                type="checkbox"
                id="check"
                onChange={(e) => onChecked(e.currentTarget.checked)}
                checked={isAgree}
                required
              />
              <label defaultValue="check" htmlFor="check">
                동의함
              </label>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="SignupWhiteButton"
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="SignupButtonText">취소</div>
            </button>
            <button className="SignupGrayButton" onClick={signup}>
              <div className="SignupButtonText">회원가입</div>
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

const Check = styled.div`
  color: red;
  font-size: 13px;
`;
const Check2 = styled.div`
  color: green;
  font-size: 13px;
  margin-left: 1%;
`;

// 주소 찾기 스타일
const postCodeStyle = {
  padding: "30px",
  background: "white",
  width: "40%",
  // maxWidth: "300px",
  height: "500px",
  border: "2px solid #d2d2d2",
  position: "absolute",
  // backgroundColor: "orange",
};

export default Signup;