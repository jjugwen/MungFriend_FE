import { useState } from "react";
import { Route, Routes } from "react-router-dom";

//페이지
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import Posts from "../pages/Posts";
import PostDetail from "../pages/PostDetail";
import SignupSuccess from "../pages/SignupSuccess";
import PostCreate from "../pages/PostCreate";

//컴포넌트
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ReviewDetailModal from "../components/detail/review/ReviewDetailModal";
import HeaderModal from "../components/shared/HeaderModal";

//채팅
import Chat from "../pages/chat/Chat";

//소셜로그인
import KakaoLoginRedirect from "./KakaoLoginRedirect";
import GoogleLoginRedirect from "./GoogleLoginRedirect";

//에러 페이지
import ErrorNotFound from "../components/shared/errors/ErrorNotFound";
import ErrorNoAccess from "../components/shared/errors/ErrorNoAccess";
import ErrorPage from "../components/shared/errors/ErrorPage";
import Preparing from "../components/shared/errors/Preparing";
import NeedLogin from "../components/shared/errors/NeedLogin";

//스타일
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  const token = sessionStorage.getItem("token");
  const imgURL = process.env.REACT_APP_IMAGE_URL;
  const [headerModal, setHeaderModal] = useState(false);
  // const outSection = useRef();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header modal={headerModal} setModal={setHeaderModal} imgURL={imgURL} />
        {headerModal && (
          <HeaderModal modal={headerModal} setModal={setHeaderModal} />
        )}
        {headerModal && (
          <OutSection
            onClick={() => {
              setHeaderModal(false);
            }}
          />
        )}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupsuccess" element={<SignupSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route
            path="/posts"
            element={
              // token ? <Posts imgURL={imgURL} /> : <NeedLogin imgURL={imgURL} />
              <Posts />
            }
          />
          <Route path="/postcreate" element={<PostCreate />} />
          <Route path="/postcreate/:id" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/oauth" element={<KakaoLoginRedirect />} />
          <Route path="/oauth" element={<GoogleLoginRedirect />} />
          <Route path="/reviews/:id" element={<ReviewDetailModal />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<Chat />} />
          {/* 에러페이지 */}
          <Route path="/needlogin" element={<NeedLogin imgURL={imgURL} />} />
          <Route path="/error" element={<ErrorPage />} /> {/* 500 */}
          <Route path="/noaccess" element={<ErrorNoAccess />} /> {/* 403 */}
          <Route path="/preparing" element={<Preparing />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

const OutSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background: rgba(0, 0, 0, 0.8); */
  z-index: 2;
`;
export default App;
