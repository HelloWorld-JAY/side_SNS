import axios from "axios";
import express, { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { Profile } from "passport-naver-v2";
import qs from "qs";
import connection from "../config/db";
import passport from "../config/passport";
import { generateRandomPassword } from "../utils/generatePass";


const router = express.Router();

// 구글 로그인
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  router.get(
    "/callback/google",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:3000/",
    }),
    async (req: Request, res: Response) => {
      const user = req.user as Profile;
  
      if (!user) {
        return res
          .status(500)
          .json({ success: false, message: "구글 로그인에 실패하였습니다." });
      }
  
      const { id, name } = user;
  
      // name이 오브젝트 형으로 넘어와서 안의 내용 string으로 만들기 및 디비저장
      if (typeof name === "object" && name !== null) {
        const { familyName, givenName } = name;
        // fullName을 만들고 사용
        const fullName = `${familyName}${givenName}`;
  
        //DB 저장
        const query = "SELECT * FROM member WHERE id = ?";
  
        const [checkUser] = await connection
          .promise()
          .query<RowDataPacket[]>(query, [id]);
  
        if (checkUser.length === 0) {
          // 새로운 사용자일시 회원가입 처리
          // 무작위 비밀번호 생성성
          const randomPassword = generateRandomPassword();
          const insertQuery = "INSERT INTO member VALUES(?,?,?)";
          await connection
            .promise()
            .query(insertQuery, [id, randomPassword, fullName]);
        }
      }
      res.redirect("http://localhost:3000/main");
    }
  );
  
  // 네이버 로그인
  router.get(
    "/naver",
    passport.authenticate("naver", { session: false, authType: "reprompt" })
  );
  
  router.get(
    "/callback/naver",
    passport.authenticate("naver", { failureRedirect: "http://localhost:3000/" }),
    async (req: Request, res: Response) => {
      const user = req.user as Profile;
  
      if (!user) {
        return res
          .status(500)
          .json({ success: false, message: "네이버 로그인에 실패하였습니다." });
      }
  
      const { id, name } = user;
      console.log(name);
      //DB 저장
      const query = "SELECT * FROM member WHERE id = ?";
  
      const [checkUser] = await connection
        .promise()
        .query<RowDataPacket[]>(query, [id]);
  
      if (checkUser.length === 0) {
        // 새로운 사용자일시 회원가입 처리
        // 무작위 비밀번호 생성성
        const randomPassword = generateRandomPassword();
        const insertQuery = "INSERT INTO member VALUES(?,?,?)";
        await connection.promise().query(insertQuery, [id, randomPassword, name]);
      }
      res.redirect("http://localhost:3000/main");
    }
  );
  
  // 카카오 로그인
  router.get("/callback/kakao", async (req: Request, res: Response) => {
    const { code } = req.query;
  
    // 코드를 정상적으로 받아왔는지 확인작업
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "인증 코드가 필요합니다.",
      });
    }
  
    //엑세스토큰 받고 처리과정
    try {
      // 엑세스 토큰 요청
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        qs.stringify({
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_ID,
          redirect_url: process.env.REDIRECT_URI,
          code,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      const { access_token } = response.data; // 엑세스 토큰
  
      // 카카오 사용자 정보 요청
      const userInfoResponse = await axios.get(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
      const userInfo = userInfoResponse.data; // 사용자정보
      // 카카오 아이디 및 정보 가져오기기
      const { id, properties } = userInfo;
      const name = properties.nickname;
  
      // DB에 있는지 확인후 새로운 사용자일시 회원가입.
      const query = "SELECT * FROM member WHERE id = ?";
      const [userCheck] = await connection
        .promise()
        .query<RowDataPacket[]>(query, [id]);
  
      if (userCheck.length === 0) {
        // 새로운 사용자라면 회원가입 처리
        // 무작위 비밀번호생성성
        const randomPassword = generateRandomPassword();
  
        const insertQuery = "INSERT INTO member VALUES (?, ?, ?)";
        await connection.promise().query(insertQuery, [id, randomPassword, name]);
      }
  
      // 결과 반환(페이지 이동)
      res.redirect("http://localhost:3000/main");
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      res.status(500).json({ success: false, message: "카카오 로그인 실패" });
    }
  });

  export default router;