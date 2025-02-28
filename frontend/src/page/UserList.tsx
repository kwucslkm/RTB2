import { useEffect, useState } from "react";
import { fetchUsers } from "../service/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>User List</h2>
	  
	  <table>
	    <thead>
	      <tr>
	        <th>ID</th>
	        <th>Username</th>
	        <th>email</th>
	        <th>가입일</th>
	      </tr>
	    </thead>
	    <tbody>
	      {users.map((user: ㅋ) => (
	        <tr key={user.id}>
	          <td>{user.id}</td>
	          <td>{user.username}</td>
	          <td>{user.email}</td>
	          <td>{user.create_At}</td>
	        </tr>
	      ))}
	    </tbody>
	  </table>
	  
    </div>
  );
};

export default UserList;
