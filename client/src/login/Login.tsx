import { PiArrowBendDownRightBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { login } from "../api/auth";

const Login = () => {
  const [id, setId] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(id, pass);
    } catch (error) {}
  };

  return (
    <div className="centerContainer">
      <div className="logo">
        <Link to="/">
          <img src="/imgs/instagram-new-logo.png" alt="로고이미지" />
        </Link>
      </div>
      <form onSubmit={handlerSubmit}>
        <div className="loginInput">
          <div className="loginText">아이디</div>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <div className="loginInput">
          <div className="loginText">비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className="loginBtn">
          <button type="submit">로 그 인</button>
          <div className="signupBtn">
            <Link to="/signup">
              <PiArrowBendDownRightBold />
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
