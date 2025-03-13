/*import axios from "axios";

const API_URL = "http://localhost:8080/api/users";
const api = axios.create({
	baseURL: 'http://localhost:8080/api/session',
	withCredentials: true, // ✅ 세션 유지 (쿠키 포함)
});

// 세션 가져오기 
export const getSession = async () => {
	try{
	  const response = await api.get('/user');
	  console.log("response.data = > ",response.data);
	  return response.data;
	}catch (error){
	  console.error("세션 조회 에러: ", error);
	  return false;
	}
};*/