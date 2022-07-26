import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

// 리덕스
import { loadChat } from "../../redux/modules/chat/chatSlice";
import { deleteChannel } from "../../redux/modules/chat/channelSlice";

// 스타일
import styled from "styled-components";
import chatroomOut from "../../assets/images/Chatting/chatroomOut.svg";
import airplain from "../../assets/images/Chatting/airplain.svg";
import CautionButton from "../../elements/CautionButton";

const Chatting = (props) => {
  const chat_data = useSelector((state) => state.chat.list);

  // console.log(`chat_data: ${chat_data[props.id]}`);
  const channel_data = useSelector((state) =>
    state.channel.list.filter((v) => v.id === Number(props.id))
  );
  // console.log(channel_data);

  // 웹 소켓 통신
  const dispatch = useDispatch();

  // 소켓 통신 객체 // 백엔드서버
  const sock = new SockJS("https://hjkim-sparta.shop/chatting");
  // const sock = new SockJS('http://localhost:8080/chatting');
  const ws = Stomp.over(sock);

  // 토큰
  const token = sessionStorage.getItem("token");

  // sender 정보 가져오기
  const sender = sessionStorage.getItem("nickname");
  // console.log(`token: ${token}`);
  // console.log(`sender: ${sender}`);

  // MemberId 정보 가져오기. 편도랑 2022-07-07
  const memberId = sessionStorage.getItem("memberId");
  // console.log("memberId" + memberId);

  // 렌더링 될 때마다 연결, 구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [props.id]); //channelId

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${parseInt(props.id)}`,
            // `/sub/api/chat/rooms/${sessionStorage.getItem('channelId')}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              // console.log(newMessage);
              // console.log("props.id :" + props.id);
              // console.log("웹소켓 연결 구독 : " + newMessage.roomId);
              dispatch(loadChat(newMessage.roomId));
              // dispatch(loadChat(sessionStorage.getItem('channleId')));
            },
            { token: token }
          );
        }
      );
    } catch (error) {
      // console.log(error);
    }
  }

  // 연결해제, 구독해제
  function wsDisConnectUnsubscribe() {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        },
        { token: token }
      );
    } catch (error) {
      // console.log(error);
    }
  }

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 메시지 보내기
  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        window.location.replace("/");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId: props.id,
        sender: sender,
        memberId: memberId, // 2022-07-07 추가 편도랑.
        // message: message_ref,
        message: message_ref.current.value,
      };

      // console.log("send할 데이터" + JSON.stringify(data));

      // console.log("chat_data"+JSON.stringify(chat_data));
      // 빈문자열이면 리턴
      if (message_ref === "") {
        return;
      }
      // 로딩 중
      waitForConnection(ws, function () {
        ws.send(
          "/pub/api/chat/message",
          { token: token },
          JSON.stringify(data)
        );
        // console.log(ws.ws.readyState);

        // 메세지 전송 후 다시 메세지 목록 조회하는 요청? 필요 없음!! 지우니까 401 에러 사라짐
        // dispatch(postChat(data.roomId, data.message));
      });
    } catch (error) {
      // console.log(error);
      // console.log(ws.ws.readyState);
    }
  }

  const message_ref = useRef(null);

  const messageOnClick = () => {
    sendMessage();
    message_ref.current.value = "";
    scrollToBottom();
  };

  // 스크롤 내리기
  const scrollRef = useRef();
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [sendMessage]);

  //엔터로 메시지 보내기 (새로고침되는 문제;)
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      messageOnClick();
    }
  };

  return (
    <React.Fragment>
      {/* 우측 상단 화면 */}
      <ChannelTitle>
        <p>{channel_data[0]?.channel}</p>
        <div
          style={{
            display: "flex",
            padding: "0 4%",
            gap: "4%",
          }}
        >
          <CautionButton />
          <button
            className="roomout"
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(deleteChannel(channel_data[0]));
            }}
          >
            <img src={chatroomOut} alt="chatroomOut" />
            나가기
          </button>
        </div>
      </ChannelTitle>

      <ChatListContainer ref={scrollRef} id="ChatListContainerDiv">
        <ChatList>
          {chat_data &&
            chat_data?.map((list, index) => {
              return (
                <ChatContent key={list.id}>
                  <p style={{ padding: "0.5%" }}>
                    {list.sender === "[알림]" ? (
                      <div style={{ textAlign: "center" }}>
                        <span style={{ color: "#7A7A80" }}>
                          <span
                            style={{
                              fontWeight: "500",
                              fontSize: "14px",
                            }}
                          >
                            {/* {list?.sender} */}
                          </span>{" "}
                          {list?.message}
                        </span>
                      </div>
                    ) : (
                      <>
                        {list.memberId === Number(memberId) ? ( //로그인한 사람 = 메시지 보내는 입장이면 메시지 내용 오른쪽에
                          <div
                            style={{
                              textAlign: "right",
                            }}
                          >
                            {list.createdAt ? (
                              <span
                                style={{
                                  color: "#747474",
                                  fontWeight: "400",
                                  fontSize: "12px",
                                  paddingRight: "5px",
                                }}
                              >
                                {list?.createdAt?.slice(5, 7)}월
                                {list?.createdAt?.slice(8, 10)}일{" "}
                                {list?.createdAt?.slice(11, 16)}
                              </span>
                            ) : null}
                            <span
                              style={{
                                fontWeight: "500",
                                fontSize: "14px",
                              }}
                            >
                              {list?.sender}
                            </span>
                            <br />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <SenderMessage>{list?.message}</SenderMessage>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span
                              style={{
                                fontWeight: "500",
                                fontSize: "14px",
                              }}
                            >
                              {list?.sender}
                            </span>
                            {list.createdAt ? (
                              <span
                                style={{
                                  color: "#747474",
                                  fontWeight: "400",
                                  fontSize: "12px",
                                  paddingLeft: "5px",
                                }}
                              >
                                {list?.createdAt?.slice(5, 7)}월
                                {list?.createdAt?.slice(8, 10)}일{" "}
                                {list?.createdAt?.slice(11, 16)}
                              </span>
                            ) : null}
                            <br />
                            <SenderMessage
                              style={{
                                background: "#F2F3F6",
                                color: "black",
                                borderRadius: "0px 8px 8px 8px",
                              }}
                            >
                              {list?.message}
                            </SenderMessage>
                          </>
                        )}
                      </>
                    )}
                  </p>
                </ChatContent>
              );
            })}
        </ChatList>
      </ChatListContainer>
      <ChatPost>
        <form onSubmit={sendMessage}>
          <input
            id="inputMessage"
            ref={message_ref}
            className="Content"
            type="text"
            placeholder="멍친구에게 메시지 보내기"
            onKeyPress={onKeyPress}
            maxLength="300"
          />
          <ChatToolDown>
            <button type="button" onClick={messageOnClick}>
              <img src={airplain} alt="Post" />
            </button>
          </ChatToolDown>
        </form>
      </ChatPost>
    </React.Fragment>
  );
};

// params 받아온거를 api get요청 하나 더 만들어서 roomId를 디스패치하고
// chatList 부분에 noRoom && Chatting 비교해서 출력한다.
const ChatListContainer = styled.div`
  position: relative;
  z-index: 6;
  background-color: white;
  width: 100%;
  max-height: 105%;
  overflow-y: auto !important;
  overflow-x: hidden;
  height: auto;
  /* margin-bottom: 0.2%; */

  /* 스크롤바 설정*/
  ::-webkit-scrollbar {
    width: 8px; // 스크롤바 막대 너비 설정
  }

  /* 스크롤바 막대 설정*/
  ::-webkit-scrollbar-thumb {
    height: 16%; // 스크롤바 막대 높이 설정
    background-color: #fa5a30;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: white; // 스크롤바 뒷 배경 설정
  }
`;

const ChatList = styled.div`
  min-height: 100%;
  & p {
    color: black;
    padding: 15px;
  }
`;

const ChatContent = styled.div`
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  margin: 5px 0;
  & p {
    color: black;
    padding: 15px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin: 0 1% auto;
  }
`;

const ChatPost = styled.div`
  height: 75px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  display: grid;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-width: 1140px;
  & form {
    margin: 1% 0;
    display: flex;
    align-items: center;
  }

  & input {
    margin: 0 10px;
    width: 100%;
    max-width: 660%;
    height: 40px;
    border: 1px solid #e3e5e9;
    border-radius: 4px;
    padding-left: 1%;
  }
`;

const ChatToolDown = styled.div`
  border-radius: 0px 0px 10px 10px;

  & p {
    color: black;
    padding: 7px;
  }

  & button {
    width: 48px;
    height: 48px;
    background: #4f65ff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
`;

const ChannelTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 99%;
  height: 100px;
  border-top: 1px solid #e3e5e9;
  border-bottom: 1px solid #e3e5e9;
  & p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    margin: 0 4%;
  }
  & button {
    width: 104px;
    height: 40px;
    border: 1px solid #e3e5e9;
    border-radius: 4px;
    background: none;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4%;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
  }

  /* .roomout {
    @media ${({ theme }) => theme.device.tabletV} {
      margin: 0 0 0 -76%;
    }
  } */
`;

const SenderMessage = styled.div`
  width: fit-content;
  box-sizing: border-box;
  margin-top: 6px;
  padding: 1%;
  max-width: 45%;
  background: #fa5a30;
  border-radius: 8px 0px 8px 8px;
  color: white;
  text-align: left;
`;
export { ChannelTitle, CautionButton, Chatting };
