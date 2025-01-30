import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "./config/passport";
import session from "express-session";
import authRoutes from './routes/auth';
import socialRoutes from './routes/social';

//env 환경변수 로드
dotenv.config();

// 익스프래스 객체 및 포트설정정
const app = express();
const port = 5000;


// 크로스오리진 처리 및 json 처리
app.use(cors({origin: "http://localhost:3000",credentials: true}));
app.use(express.json());

// 세션 설정정
app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: true,
  })
);

// passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session()); // 세션을 passport와 함께 사용

// 최초 / 경로 실행 테스트
app.get("/", (req, res) => {
  res.send("여긴 서버주소야!");
});

//라우트 설정
app.use("/api",authRoutes)
app.use("/oauth",socialRoutes)

// 서버 실행시 포트번호
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
