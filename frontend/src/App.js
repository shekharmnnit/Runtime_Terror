// import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login.tsx'
import FileUpload from './components/FileUpload.tsx'
import Home from "./components/Home.tsx";
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
      </Routes>
    </BrowserRouter>
    // <Login/>
  );
}

export default App;
