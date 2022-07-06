import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
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


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupsuccess" element={<SignupSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/postcreate" element={<PostCreate/>}/>
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/oauth" element={<KakaoLoginRedirect />} />
        <Route path="/oauth" element={<GoogleLoginRedirect />} />
        <Route path="/test" element={<DogPlusModal/>}/>
        <Route path="/test2" element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;
