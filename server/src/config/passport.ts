import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";
import passport from "passport";
import { Strategy as NaverStrategy, Profile as NaverProfile } from "passport-naver-v2";
import connection from "./db";
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";

//env호출
dotenv.config();

//구글 패스포트
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      callbackURL: process.env.GOOGLE_REDIRECT_URI as string,
    },
    (accessToken: string, refreshToken: string, profile: GoogleProfile, done:any) => {
      return done(null, profile);
    }
  )
)

//네이버 패스포트트
passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.NAVER_REDIRECT_URI,
    },
    (accessToken: string, refreshToken: string, profile: NaverProfile, done:any) => {
      return done(null, profile);
    }
  )
);

// 사용자 정보를 세션에 저장할 때 호출되는 함수
passport.serializeUser((user: any, done) => {
  if (user.provider === "google") {
    done(null, user.id); // 구글 프로필의 id 저장
  } else if (user.provider === "naver") {
    done(null, user.id); // 네이버 프로필의 id 저장
  } else {
    done(null, user.id); // 다른 경우
  } 
});

// 세션에 저장된 id를 통해 사용자 정보를 복원할 때 호출되는 함수
passport.deserializeUser(async (id: string, done) => {
  const query = "SELECT * FROM member WHERE id = ?";
  try {
    const [user] = await connection.promise().query<RowDataPacket[]>(query, [id]);
    done(null, user[0]); // 복원된 사용자 객체를 done에 전달
  } catch (error) {
    done(error);
  }
});


export default passport;
