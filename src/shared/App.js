import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/shared/Header";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import Posts from "../pages/Posts";
import PostDetail from "../pages/PostDetail";
import SignupSuccess from "../pages/SignupSuccess";
import Test from "../components/Test";
//소셜로그인
import KakaoLoginRedirect from "./KakaoLoginRedirect";
import GoogleLoginRedirect from "./GoogleLoginRedirect";
import DogPlusModal from "../components/DogPlusModal";
import PostCreate from "../pages/PostCreate";
import Footer from "../components/shared/Footer";
import ProfileUpdate from "../components/ProfileUpdate";
import ReviewDetailModal from "../components/ReviewDetailModal";

//chatting
import Chat from "../pages/chat/Chat";

//loading
import Spinner from "../components/shared/Spinner";

//에러 페이지
import ErrorNoAccess from "../components/shared/errors/ErrorNoAccess";
import ErrorNotFound from "../components/shared/errors/ErrorNotFound";
import ErrorPage from "../components/shared/errors/ErrorPage";
import Preparing from "../components/shared/errors/Preparing";
import NeedLogin from "../components/shared/errors/NeedLogin";
import HeaderModal from "../components/shared/HeaderModal";
import styled from "styled-components";

function App() {
  const token = sessionStorage.getItem("token");

  const [headerModal, setHeaderModal] = useState(false);
  // const outSection = useRef();
  return (
    <div className="App">
      <Header modal={headerModal} setModal={setHeaderModal} />
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
        <Route path="/posts" element={token ? <Posts /> : <NeedLogin />} />
        <Route path="/postcreate" element={<PostCreate />} />
        <Route path="/postcreate/:id" element={<PostCreate />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/oauth" element={<KakaoLoginRedirect />} />
        <Route path="/oauth" element={<GoogleLoginRedirect />} />
        <Route path="/test" element={<Test />} />
        <Route path="/reviews/:id" element={<ReviewDetailModal />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/errortest" element={<ErrorPage />} />
        <Route path="/preparing" element={<Preparing />} />
      </Routes>
      <Footer />
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
