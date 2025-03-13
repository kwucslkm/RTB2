import React from 'react';
import '../../styles/layout.css';

interface JoinFormProps {
  onsubmitCreate: ( userEmail: string, password: string, username:string , managerYn:string ) => void; // 회원가입 제출
}
const JoinForm: React.FC<JoinFormProps> = ({ onsubmitCreate }) => {
  // const [managerYnValue, setManagerYnValue] = useState("N"); // 관리자YN 상태 관리
  
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userEmail = formData.get('userEmail') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;
	/*console.log("formData.get('managerYn') = > ",formData.get("managerYn"));*/
	const managerYn = formData.get("managerYn") ? "Y" : "N";
	
	/*console.log("입력 받은 managerYN = > ", managerYn);*/	

    onsubmitCreate(userEmail, password, username, managerYn);
  };
  return (
      <div className="join-form">
        <h3> 회원가입 </h3>
        <form onSubmit={handleLoginCheck}>
		  <p>
            Email(이메일):&nbsp;
            <input type="text" name="userEmail" />&nbsp;
          </p>
          <p>
            Password(비밀번호):&nbsp;
            <input type="password" name="password" required />&nbsp;
          </p>
		  <p>
            name(이름):&nbsp;
            <input type="text" name="username" required />&nbsp;
          </p>
          <p style = {{textAlign: 'center'}}>
		  	<label>
	          <input type="checkbox" name="managerYn" value="true" />
	          관리자 여부
	        </label>
		  </p>
          <button type="submit">가입하기</button>&nbsp;
          
        </form>
      </div>
  );
};

export default JoinForm;
