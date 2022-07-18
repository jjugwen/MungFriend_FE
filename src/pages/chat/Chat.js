// react
import React, { useRef } from "react";

// style
import styled from "styled-components";

// pages
import Chatting from "./Chatting";
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

  //매칭하기 눌렀을 때의 신청자 nickname

  // 첫 렌더링
  React.useEffect(() => {
    dispatch(loadChannel());
  }, [dispatch]);

  React.useEffect(() => {
    if (id) {
      console.log("useEffect >> LoadChat넘기기전 id : " + id);
      dispatch(loadChat(id));
    }
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Container>
        <div style={{ display: "flex" }}>
          <LeftContainer>
            <ChannelList2>
              <h1>개설된 채팅방</h1>
              {channel_data &&
                channel_data.map((list, index) => {
                  return (
                    <ChannelListBox
                      key={list.id}
                      onClick={() => {
                        navigate(`/chat/${list.id}`);
                        // clearStorage('channelId');
                        // setStorage('channelId', `${list.id}`);
                      }}
                    >
                      <p ref={chatroom}>{list.channel}</p>
                    </ChannelListBox>
                  );
                })}
            </ChannelList2>
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
        </div>
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  margin: auto;
`;

const LeftContainer = styled.div`
  background: #f2f3f6;
  width: 100%;
  min-width: 274px; //19.05%
  max-width: 15%;
  height: 100%;
  min-height: 640px;
  max-height: 77vh;
`;

const ChannelList2 = styled.div`
  /* height: 100%; */
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
  background: #fa5a30;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 1% 5%;

  & p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    color: white;
  }
  & div {
    cursor: pointer;
    top: 0;
    right: 0px;
  }
  & img {
    width: 25px;
    margin-top: 7px;
  }
`;

const ChatBox = styled.div`
  /* position: relative; */
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  margin: 5px & p {
    color: black;
    padding: 15px;
  }
`;

const ChatList = styled.div`
  bottom: 0;
  width: 100%;
  height: 600px;

  & p {
    color: black;
    padding: 15px;
  }
`;

export default Chat;
