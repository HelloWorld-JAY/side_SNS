import cors from "cors";
import express, { Request, Response  } from "express";
import connection from "./db"
import { RowDataPacket } from "mysql2";
// 기본 서버연결
const app = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});
// 로그인
app.post("/api/login", (req, res) => {
  console.log(req.body);
});
//아이디 중복검사
app.post("/api/checkId", (req:Request, res:Response) => {
    const {id} : {id:string} =req.body;
    if(!id) {
        return res.status(400).json({success:false, message:"아이디를 입력해주세요."});
    }


    const query = "SELECT COUNT(*) AS count FROM member WHERE id = ?";

    connection.query(query,[id],(err,result:RowDataPacket[]) => {
        if (err){
            console.error("데이터베이스 오류:"+err);
            return res.status(500).json({success:false,message:"서버 오류가 발생했습니다."});
        }

        const count = result[0].count;

        if (count > 0){
            return res.json({success:false,message:"이미 사용 중인 아이디 입니다."})
        }else{
            return res.json({success:true,message:"사용 가능한 아이디입니다."})
        }
    })
     
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
