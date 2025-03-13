import { useEffect, useState } from "react";
import { fetchUsers } from "../../service/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
	fetchUsers().then(setUsers).catch(error => {
	    console.error("Error users 조회실패:", error);
  	});
  }, []);
  /*useEffect(() => {
    const getUsers = async () => {
      try {
		console.log("두 번 호출 하는지 확인");
		
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error users 조회실패:", error);
      }
    };
    getUsers();
  }, []);*/
  return (
    <div>
      <h2>User List</h2>
	  
	  <table>
	    <thead>
	      <tr>
	        <th>번호</th>
	        <th>회원명</th>
	        <th>이메일</th>
			<th>관리자</th>
	        <th>가입일</th>
	      </tr>
	    </thead>
	    <tbody>
	      {users.map( (user) => (
	        <tr key={user.id}>
	          <td>{user.id}</td>
	          <td>{user.username}</td>
	          <td>{user.email}</td>
	          <td>{user.managerYn}</td>
	          <td>{user.created_At}</td>
	        </tr>
	      ))}
	    </tbody>
	  </table>
	  
    </div>
  );
};

export default UserList;
