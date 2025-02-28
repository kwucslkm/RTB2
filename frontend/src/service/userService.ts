import axios from "axios";

/*const API_URL = "http://localhost:8080/api/users";*/
const api = axios.create({baseURL: 'http://localhost:8080/api/users',});
export const fetchUsers = async () => {
	try{
	  const response = await api.get('/');
	  
	  console.log("response.data = > ",response.data);
	  return response.data;
		
	}catch (error){
		alert('error check', error);
		return false;
	}
};
