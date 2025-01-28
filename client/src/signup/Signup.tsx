import React, { useState } from "react";
import "./Signup.scss";
import { idDuplicate } from "../api/auth";

const Signup = () => {
  const [id, setId] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passCheck, setPassCheck] = useState<string>("");
  const passDuplicateHandler = () => {
    return pass === passCheck ? alert("비밀번호가 일치함"):alert("비밀번호가 틀림림") ;
  };
  const idDuplicateHandler = async () => {
    const response = await idDuplicate(id);
    if (response.data.success) {
      alert("사용가능아이디");
    } else {
      alert("사용불가아이디");
    }
  };
  return (
    <div className="centerContainer">
      <div className="title">
        <h1>회원가입</h1>
      </div>
      <form>
        <div className="signupInput">
          <div className="signupText">아이디</div>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            onBlur={idDuplicateHandler}
          />
          <div className="signupText">비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <div className="signupText">비밀번호 확인</div>
          <input
            type="password"
            placeholder="비밀번호를 다시한번 입력하세요."
            value={passCheck}
            onChange={(e) => {
              setPassCheck(e.target.value);
            }}
            onBlur={passDuplicateHandler}
          />
          <div className="signupText">이름</div>
          <input type="text" placeholder="이름을 입력하세요." />
        </div>
        <div className="signupBtn">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
