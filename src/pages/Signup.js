import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import instance from "../shared/API/instance";
import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";

function Signup(props) {
  const imgURL = props.imgURL;
  const navigate = useNavigate();
  // 아이디 제한 조건 : 3자리 이상 15자리 이하 영문소문자/숫자
  const is_username = (username) => {
    let _reg = /^(?=.*[a-z0-9])[a-z0-9]{3,15}$/;
    return _reg.test(username);
  };

  // 비밀번호 제한 조건 : 8자리 이상 20자리 이하 영문대문자, 영문소문자, 숫자, 특수문자 !@#$%^&.* 조합해야!
  const is_password = (password) => {
    let _reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&.*]).{10,20}$/;
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

  // 비밀번호 체크
  const passwordCheck = () => {
    if (!is_password(password)) {
      return false;
    } else {
      return true;
    }
  };

  //비밀번호 더블 체크 (비어있는지 && 크로스체크 확인)
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
    return setUsername(e.target.value);
    // console.log(setUsername(e.target.value));
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
        // console.log(result); // 위, 경도 결과 값
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
          // console.log(response.data);
          if (response.data.status === "true") {
            // console.log(response.data.message);
            navigate("/signupsuccess");
          } else if (response.data.status === "false") {
            // console.log(response.data.status);
            window.alert(response.data.message);
          }
        })
        .catch((err) => {
          window.alert("에러가 발생했어요!");
          // console.log(err);
        });
    }
  };
  // const [sel_email, setSel_email] = useState();
  // const emailhandler = (e) => {
  //   setSel_email(e.target.value);
  // };
  // console.log(`${email}@${sel_email}`);
  // console.log(email);

  //아이디 인풋창 입력 시 유효성 나타내기
  const [text, setText] = useState("");
  const onChangeText = (e) => {
    return setText(e.target.value);
  };

  return (
    <>
      <SignupOutterBox>
        <div>
          <SignupText htmlFor="id">아이디</SignupText>
          <br />
          <SignupInputBox
            name="username"
            type="text"
            placeholder="아이디를 입력해주세요."
            onChange={(e) => {
              IdCheck(e);
              onChangeText(e);
            }}
            required
          />
          {text ? (
            <>
              <Check>
                {usernameCheck
                  ? ""
                  : "*아이디는 3자리 이상 15자리 이하 영어 소문자 및 숫자입니다"}
              </Check>
              <Check2>{usernameCheck ? "사용가능한 형식입니다" : ""}</Check2>
            </>
          ) : (
            <p />
          )}
          <p />
          <SignupText htmlFor="password">비밀번호</SignupText>
          <br />
          <SignupInputBox
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력해주세요."
            required
          />
          {password ? (
            <>
              <Check>
                {passwordCheck()
                  ? ""
                  : "*비밀번호는 10~20자리 영어 대/소문자, 숫자, 특수문자 조합입니다."}
              </Check>
              <Check2>{passwordCheck() ? "사용가능한 형식입니다" : ""}</Check2>
            </>
          ) : (
            <p />
          )}
          <p />
          <p />
          <SignupText htmlFor="passwordCheck">비밀번호 확인</SignupText>
          <br />
          <div style={{ display: "flex", gap: "2%" }}>
            <SignupInputBox
              name="passwordCheck"
              type="password"
              onChange={(e) => {
                setPwcheck(e.target.value);
              }}
              placeholder="비밀번호를 한번 더 입력해주세요."
              required
            />
            {pwcheck ? (
              <>
                {pwDubleCheck() ? (
                  " "
                ) : (
                  <img
                    width="20px"
                    style={{
                      position: "relative",
                      right: "40px",
                    }}
                    src={`${imgURL}/Signup/check_no_red.svg`}
                    alt="checkred"
                  />
                )}
                {pwDubleCheck() ? (
                  <img
                    width="20px"
                    src={`${imgURL}/Signup/check_blue.svg`}
                    alt="checkblue"
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              <p />
            )}
          </div>
          <p />
          <SignupText htmlFor="email">이메일</SignupText>
          <br />
          <div style={{ display: "flex" }}>
            <SignupInputBox
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              onChange={(e) => {
                setEmail(e.target.value);
                emailCheck(e);
              }}
              // onChange={emailCheck}
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
          {email ? (
            <>
              <Check>{emailcheck ? "" : "*이메일 형식이 아닙니다"}</Check>
              <Check2>{emailcheck ? "사용가능한 형식입니다" : ""}</Check2>
            </>
          ) : (
            <p />
          )}
          <p />
          <SignupText htmlFor="nickname">닉네임</SignupText>
          <SignupInputBox
            name="nickname"
            onChange={(e) => {
              setNickname(e.target.value);
              nickCheck(e);
            }}
            placeholder="닉네임을 입력해주세요."
            required
          />
          {nickname ? (
            <>
              <Check>
                {nicknamecheck
                  ? ""
                  : "*닉네임은 3자리 이상 9자리 이하 한글, 영문, 숫자입니다. "}
              </Check>
              <Check2>{nicknamecheck ? "사용가능한 형식입니다" : ""}</Check2>
            </>
          ) : (
            <p />
          )}
          <p />
          <SignupText htmlFor="adress">주소</SignupText>
          <div style={{ display: "flex", alignItems: "center", gap: "2%" }}>
            <SignupInputBox
              style={{ width: "260px" }}
              placeholder="주소를 입력해주세요."
              name="address"
              onChange={(e) => e.current.value}
              value={address}
              required
            />
            <PostCodeBtn
              onClick={() => {
                modalClose();
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  margin: "17px",
                  color: "white",
                }}
              >
                우편번호 찾기
              </p>
            </PostCodeBtn>
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
              width: "430px",
              margin: "3% 1.2%",
              fontWeight: "600",
            }}
          >
            <span>
              <a
                target="blank"
                style={{
                  color: "black",
                  zIndex: 3,
                }}
                href="https://protective-iodine-bc7.notion.site/bbd8abbf735140109899396c1c87dc61"
              >
                멍친구 이용약관
              </a>
              ,{" "}
              <a
                target="blank"
                style={{
                  color: "black",
                  zIndex: 3,
                }}
                href="https://protective-iodine-bc7.notion.site/78bef62511ef4254bfaa1638d1550fe0"
              >
                개인정보 수집 및 이용
              </a>
              에 모두 동의합니다.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              margin: "0 0.5%",
              height: "20px",
              alignItems: "center",
            }}
          >
            <input
              className="CheckboxStyle"
              type="checkbox"
              id="check"
              onChange={(e) => onChecked(e.currentTarget.checked)}
              checked={isAgree}
              required
            />
            <br />
            <label defaultValue="check" htmlFor="check" style={{ margin: "0" }}>
              동의함
            </label>
          </div>
          <br />
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              white_medium
              _onClick={() => {
                navigate("/");
              }}
            >
              취소
            </Button>
            <Button orange_medium _onClick={signup}>
              회원가입
            </Button>
          </div>
        </div>
      </SignupOutterBox>
    </>
  );
}

const SignupOutterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  /* min-width: 1440px; */
  padding: 5% 0%;
  width: 100%;
  /* height: 52em; */
`;

const SignupText = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #121212;
  margin-left: 1.2%;
`;

const SignupInputBox = styled.input`
  /* width: 90%; */
  /* min-width: 400px; */
  width: 400px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e3e5e9;
  border-radius: 4px;
  margin: 6px 0px;
  padding-left: 3%;
  box-sizing: border-box;

  @media ${({ theme }) => theme.device.mobile} {
    /* min-width: 335px; */
  }
`;

const Check = styled.div`
  color: #fa5a30;
  font-size: 13px;
  margin-left: 1%;
`;

const Check2 = styled.div`
  color: #4f65ff;
  font-size: 13px;
  margin-left: 1%;
`;

// 주소 찾기 스타일
const postCodeStyle = {
  padding: "30px",
  background: "white",
  width: "40%",
  minWidth: "340px",
  height: "500px",
  border: "2px solid #d2d2d2",
  position: "absolute",
  zIndex: "3",
};

const PostCodeBtn = styled.div`
  border: 2px solid #eeeeee;
  width: 128px;
  height: 52px;
  border-radius: 8px;
  background-color: #4e4e56;
`;

export default Signup;
