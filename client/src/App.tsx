import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
// import Main from "./main/Main";
import Signup from "./signup/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/main" element={<Main />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
