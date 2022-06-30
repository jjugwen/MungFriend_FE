import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import MungPlusModal from "../components/MungPlusModal";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/test" element={<MungPlusModal/>}/>
      </Routes>
    </div>
  );
}

export default App;
