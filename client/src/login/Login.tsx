import { PiArrowBendDownRightBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { login, KAKAO_AUTH_URL } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(id, pass);
      if (response.data.success) {
        navigate("/main");
      } else {
        alert("아이디 또는 비밀번호 입력 오류입니다.");
        setId("");
        setPass("");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
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
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handlerSubmit(e as unknown as React.FormEvent);
              }
            }}
          />
        </div>
        <div className="loginBtn">
          <div>
            <a href="http://localhost:5000/oauth/google">
              <img src="/imgs/google.png" alt="구글글로그인" />
            </a>
          </div>
          <div>
            <a href="http://localhost:5000/oauth/naver">
              <img src="/imgs/naver.png" alt="네이버로그인" />
            </a>
          </div>
          <div>
            <a href={KAKAO_AUTH_URL}>
              <img src="/imgs/kakao.png" alt="카카오로그인" />
            </a>
          </div>
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
