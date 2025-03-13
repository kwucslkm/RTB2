// 유저 정보 타입
export interface User {
  id?: number;
  email:string;
  password: string;
  username:string;
  managerYn:String;
  created_At?:string;
  updated_At?:string;
  

}