import React, { useState } from "react";
import "./Signup.scss";
import { idDuplicate, signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();
  // 변수선언
  const [id, setId] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passCheck, setPassCheck] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [idCheckMessage,setIdCheckMessage] = useState<string>("");
  const [passCheckMessage,setPassCheckMessage] = useState<string>("");

  // 비밀번호 맞는지 확인 함수
  const passDuplicateHandler = () => {
    return pass === passCheck && pass.length > 0 && passCheck.length > 0
      ? setPassCheckMessage("비밀번호가 일치합니다.")
      : setPassCheckMessage("비밀번호가 틀리거나 공백입니다.");
  };
  // 회원가입버튼 누를시 이벤트
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id.length > 0 && pass.length > 0 && name.length > 0 && passCheck.length > 0) {
      try {
        const response = await signup(id,pass,name);
        if(response.data.success){
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        }else{
          alert("회원가입중 오류가 발생하였습니다. 다시 시도해주세요.")
        }
      } catch (error) {}
    }else{
      alert("빠진 항목이 있습니다.")
    }
  };
  // 아이디 중복체크 함수
  const idDuplicateHandler = async () => {
    try {
      const response = await idDuplicate(id);
      if (response.data.success) {
        setIdCheckMessage("사용 가능한 아이디입니다.");
      } else {
        setIdCheckMessage("사용 불가한 아이디입니다.");
      }
    } catch (error) {
      setIdCheckMessage("사용할 아이디를 입력해주세요.");
    }
  };
  return (
    <div className="centerContainer">
      <div className="title">
        <h1>회원가입</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="signupInput">
          <div className="signupText">아이디<span style={{color: idCheckMessage === "사용 가능한 아이디입니다."?"blue":"red"}}>{idCheckMessage}</span></div>
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
          <div className="signupText">비밀번호 확인<span style={{color : passCheckMessage === "비밀번호가 일치합니다."?"blue":"red"}}>{passCheckMessage}</span></div>
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
          <input
            type="text"
            placeholder="이름을 입력하세요."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="signupBtn">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
