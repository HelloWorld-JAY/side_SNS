import cors from "cors";
import express, { Request, Response } from "express";
import connection from "./db";
import { RowDataPacket } from "mysql2";

// 백엔드 서버생성
const app = express();
const port = 5000;

// 크로스오리진 옵션
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// 크로스오리진 처리 및 json 처리
app.use(cors(corsOptions));
app.use(express.json());

// 최초 / 경로 실행 테스트
app.get("/", (req, res) => {
  res.send("Hello from server!");
});

// 로그인 버튼 누를시 로그인 절차
app.post("/api/login", async (req: Request, res: Response) => {
  const { id, pass }: { id: string; pass: string } = req.body;

  // id or pass 빈칸으로 보내졌는지 확인
  if (!id || !pass) {
    return res.status(400).json({
      success: false,
      message: "아이디 또는 비밀번호를 입력하지 않았습니다.",
    });
  }
  // 쿼리 입력
  const query = "SELECT * FROM member WHERE id = ? and pass = ?";

  // 데이터베이스 연결 및 결과전달 (비동기 처리)
  try {
    const [result] = await connection
      .promise()
      .query<RowDataPacket[]>(query, [id, pass]);
    if (result.length > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("데이터베이스 오류:" + error);
    return res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
});

//아이디 중복검사
app.post("/api/checkId", async (req: Request, res: Response) => {
  // 아이디가 넘어왔는지 확인
  const { id }: { id: string } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "아이디를 입력해주세요." });
  }
  // 쿼리문
  const query = "SELECT COUNT(*) AS count FROM member WHERE id = ?";
  //데이터베이스 연결 및 결과값 전달
  try {
    const [result] = await connection
      .promise()
      .query<RowDataPacket[]>(query, [id]);

    const count = result[0].count;

    if (count > 0) {
      return res.json({
        success: false,
        message: "이미 사용 중인 아이디 입니다.",
      });
    } else {
      return res.json({ success: true, message: "사용 가능한 아이디입니다." });
    }
  } catch (error) {
    console.error("데이터베이스 오류:" + error);
    return res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
});

//회원가입
app.post("/api/signup", async (req: Request, res: Response) => {
  // 객체받기
  const { id, pass, name } = req.body;
  if (!id && !pass && !name) {
    return res
      .status(400)
      .json({
        success: false,
        message: "입력되지 않은 값이 있습니다. 확인해 주세요.",
      });
  }

  const query = "INSERT INTO member VALUES(?,?,?)";
  try {
    const [result] = await connection
    .promise()
    .query<RowDataPacket[]>(query, [id, pass, name]);

    if(result){
      res.json({success:true,message:"정상적으로 회원가입 되었습니다."})
    }else{
      res.json({success:false,message:"회원가입중 오류가 발생하였습니다."})
    }
  } catch (error) {
    console.error("데이터베이스 오류:" + error);
    return res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
  
});

// 서버 실행시 포트번호
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
