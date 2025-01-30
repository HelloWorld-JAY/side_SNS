import {api} from "./http";

export const login = (id:string,pass:string) => api.post("/login",{id,pass});

export const idDuplicate = (id:string) => api.post("/checkId",{id});

export const signup = (id:string,pass:string,name:string) => api.post("/signup",{id,pass,name})


// 카카오 로그인
const REST_API_KEY: any = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI: any = process.env.REACT_APP_KAKAO_REDIRECT_URI;

export const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}` ;


