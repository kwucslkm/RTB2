import axios from "axios";

/*const API_URL = "http://localhost:8080/api/users";*/
const api = axios.create({
	baseURL: 'http://localhost:8080/api/users',
	withCredentials: true, // ✅ 세션 유지 (쿠키 포함)
});


//관리자 확인
export const findManager = async () => {
	try{
	  console.log("관리자리스트 가져오기");
	  const response = await api.get('/findManagerList');
	  /*console.log("response.data = > ",response.data);*/
	  return response.data;
	}catch (error){
	  alert('api 관리자리스트 조회 에러 error check', error);
	  return false;
	}
};
// 로그아웃 세션 "userInfo delete"
export const logout = async () => {
	try{
	
		console.log(' = userService try logout');
		const logoutResult = await api.get('/logout');
		if(logoutResult) console.log(' =  logout complete!');
		return logoutResult;
	}	catch (error){
		  console.error(" = logout connect error: ", error);
		  return false;
		}
};
// 세션 가져오기 
export const getSession = async () => {
    console.log(' = userService.ts rest api try request server session');
	try{
	  const response = await api.get('/getUserSession');
	  console.log(" = userService.ts rest api getSession response  = > ",response);
	  return response.data;
	}catch (error){
	  console.error(" = session connect error: ", error);
	  return false;
	}
};

// 회원리스트 가져오기 
export const fetchUsers = async () => {
	try{
	  console.log(" = userSevice.ts  connect fetchUsers");
	  const response = await api.get('/');
	  /*console.log("response.data = > ",response.data);*/
	  return response.data;
	}catch (error){
	  alert('api 리스트 조회 에러 error check', error);
	  return false;
	}
};
// 로그인
export const loginchk = async (
	data:{email:string, password:string})=>{
	try{
		const response  = await api.post('/login',data);
		return response.data;
	}catch (error){
		console.log('api 로그인 error.status',error.status, error);
		/*console.error(' userService.ts  error:', error);*/
		return error.status;
	}
}

export const userUpdate = async (
	data:{id:number, email:string, username:string, managerYn:string})=>{
		console.log("update data from App.tsx = > ", data);
		try{
			const response  = await api.post('/update',data);
		}catch(error){
			console.log('api 회원정보 수정 error.status',error.status, error);
			return error.status;
		}
	}


// 회원가입
export const joinMemberCreate = async (
	data:{email:string, password:string, username:string, managerYn:string}) => {
	console.log("insert user data from App.tsx = > ", data);
	try{
		const response  = await api.post('/join',data);
		/*console.log(" api response.status = > ",response.status);*/
		/*console.log(" api response = > ",response);*/
		if (response.status === 201){
			console.log(' api userService.ts 회원가입 성공', response);
			return response;
			
		}
	}catch (error){
		console.log('api 회원가입 error.status',error.status, error);
		/*console.error(' userService.ts 회원가입 error:', error);*/
		return error.status;
		
	}
	
}
