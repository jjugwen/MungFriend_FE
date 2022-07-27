// react
import React, { useEffect, useRef } from "react";

// style
import styled from "styled-components";

// pages
import { Chatting } from "./Chatting";
import NoRoom from "./NoRoom";

// redux
import { useDispatch, useSelector } from "react-redux";

// router
import { useNavigate, useParams } from "react-router-dom";

// toolkit - Slice
import { loadChat } from "../../redux/modules/chat/chatSlice";
import { loadChannel } from "../../redux/modules/chat/channelSlice";

const Chat = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const chatroom = useRef("");
  // state에 axiso get한 데이터 불러오기
  const channel_data = useSelector((state) => state.channel.list);

  // 첫 렌더링
  useEffect(() => {
    dispatch(loadChannel());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      // console.log("useEffect >> LoadChat넘기기전 id : " + id);
      dispatch(loadChat(id));
    }
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Container>
        <LineupLeftAndRightContainer>
          {/* 왼쪽 채널 화면 */}
          <LeftContainer>
            <ChannelList>
              <h1>개설된 채팅방</h1>
              {channel_data &&
                channel_data.map((list, index) => {
                  return (
                    <section key={list.id}>
                      {Number(id) === list.id ? (
                        <ChannelListBox
                          style={{ backgroundColor: "#fa5a30" }}
                          onClick={() => {
                            navigate(`/chat/${list.id}`);
                          }}
                        >
                          <p style={{ color: "white" }} ref={chatroom}>
                            {list.channel}
                          </p>
                        </ChannelListBox>
                      ) : (
                        <ChannelListBox
                          onClick={() => {
                            navigate(`/chat/${list.id}`);
                          }}
                        >
                          <p ref={chatroom}>{list.channel}</p>
                        </ChannelListBox>
                      )}
                    </section>
                  );
                })}
            </ChannelList>
          </LeftContainer>

          {/* 우측 메인 화면 */}
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <ChatBox>
              <ChatList>
                {!id && <NoRoom />}
                {id && <Chatting id={id} />}
              </ChatList>
            </ChatBox>
          </div>
        </LineupLeftAndRightContainer>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 2;
  height: 610px;
  width: 99%;
`;

const LineupLeftAndRightContainer = styled.div`
  display: flex;
  position: relative;
  height: 133%;
  background: white;
`;

const LeftContainer = styled.div`
  position: relative;
  background: #f2f3f6;
  min-width: 274px; //19.05%
  overflow-y: scroll;

  /* 스크롤바 설정*/
  ::-webkit-scrollbar {
    width: 8px; //스크롤바 막대 너비 설정
  }

  /* 스크롤바 막대 설정*/
  ::-webkit-scrollbar-thumb {
    height: 16%; //스크롤바 막대 높이 설정
    background-color: #fa5a30;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f2f3f6; //스크롤바 뒷 배경 설정
  }
`;

const ChannelList = styled.div`
  & h1 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    padding: 13.3% 0 5% 13.3%; //40px
    margin: 2% 0 10% 0;
  }
`;

const ChannelListBox = styled.div`
  width: 100%;
  min-width: 205px;
  max-width: 15%;
  margin: 4% 8%;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 1% 5%;
  background-color: #fff;
  & p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    color: black;
  }
  & img {
    width: 25px;
    margin-top: 7px;
  }
`;

const ChatBox = styled.div`
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  margin: 5px;

  & p {
    color: black;
    padding: 15px;
  }
`;

const ChatList = styled.div`
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  min-width: 1166px;
  height: 600px;

  & p {
    color: black;
    padding: 15px;
  }
`;

export default Chat;
