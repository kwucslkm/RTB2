import { useEffect, useState } from "react";
import * as api from "../../service/userService";
import { User } from '../../types/types';

interface UpdateFormProps {
  onUpdateSubmit: (id: string , email: string, name:string, managerYn: string) => void;
}

const Mypage: React.FC<UpdateFormProps> = ({ onUpdateSubmit }) => {
  const [user, setUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [managerYn, setManagerYn] = useState<string>("N");

  useEffect(() => {
    api.getSession()
      .then((userData) => {
        setUser(userData);
        setInputValue(userData?.username || "");
        setManagerYn(userData.managerYn || "N");
      })
      .catch((error) => {
        console.error("Error: user 세션값 조회 실패", error);
      });
  }, []);

  useEffect(() => {
    console.log("세션에서 받아 온 managerYn => ", managerYn);
  }, [managerYn]);

  const handleMyPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const id = user.id;
    const email = formData.get("userEmail") as string;
    const name = inputValue;
    const storedPassword = user.password;

    const inputPw = prompt(
      `<회원 정보 수정 확인>\n 
	  이름 : ${inputValue}\n 
	  관리자여부 : ${managerYn}\n 
	  입력한 정보가 맞으면 비밀번호를 입력하여 수정하세요`
    );
    if (!inputPw) {
      alert("비밀번호 입력이 취소되었습니다.");
      return;
    }

    try {
      const varifyPassRes = await api.varifyPassword(inputPw, storedPassword);
      console.log("varifyPassRes => ", varifyPassRes);

      if (varifyPassRes) {
        onUpdateSubmit(id, email, name, managerYn);
      } else {
        alert("비밀번호 검증에 실패하였습니다.");
      }
    } catch (error) {
      console.error("비밀번호 검증 실패: ", error);
    }
  };

  return (
    <div>
		<h4> </h4>
		{/*<button >수정하기</button>*/}
		<div>
	      <div className="update-form">
	        <h3> Mypage </h3>
	        <form onSubmit={handleMyPage}>
			  <p>
	            Email(이메일):&nbsp;&nbsp;
	            <input style = {{border: 'none'}} type="text" readOnly name="userEmail" value={user?.email || ""}
				onChange={(e) => setInputValue(e.target.value)} />&nbsp;
	          </p>
			  <p>
	            name(이름):&nbsp;&nbsp;
	            <input type="text" name="username" value = {inputValue}
				onChange={(e) => setInputValue(e.target.value)}/>&nbsp;
	          </p>
			  <p style = {{textAlign: 'left' ,marginLeft: '50px'}}>
	  		  	<label>
	  	          관리자 여부:&nbsp;&nbsp;&nbsp;&nbsp;
	  	          <input  className="checkbox-large" 
				  			type="checkbox" name="managerYn" checked={managerYn === "Y"}
				  onChange={(e) => setManagerYn(e.target.checked ? "Y" : "N")} />
	  	        </label>
	  		  </p>
	          <button type="submit">수정하기</button>&nbsp;
	        </form>
	      </div>
	    </div>
    </div>
  );
};

export default Mypage;
