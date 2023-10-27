// import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './assets/css/global.css';
import Login from './components/Login.tsx'
import FileUpload from './components/FileUpload.tsx'
import Shekhar_test from './components/shekhar_test.tsx'
import Home from "./components/Home.tsx";
import ProfilePage from './components/ProfilePage.tsx'
import ShowPostSummary from "./components/Post_summary.tsx";
import ShowPostContent from "./components/Post_detail_container.tsx";
import PostPage from './components/PostPage.tsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/home" element={<Home />}>
        </Route>
        <Route path="/upload" element={<FileUpload />}> // To be commented, form to handle file upload
        </Route>
        <Route path="/shekhar" element={<Shekhar_test />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/post" element={<PostPage />}></Route>
      </Routes>
    </BrowserRouter>
    // <Login/>
  );
}

export default App;
