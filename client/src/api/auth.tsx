import {api} from "./http";

export const login = (id:string,pass:string) => api.post("/login",{id,pass});

export const idDuplicate = (id:string) => api.post("/checkId",{id});

export const signup = (id:string,pass:string,name:string) => api.post("/signup",{id,pass,name})