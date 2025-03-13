import React from 'react';
import '../../styles/layout.css';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void; // 로그인 제출 이벤트
  
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    onSubmit(email, password);
  };
  return (
    <div>
      <div className="login-form">
      <h3> 로그인 </h3>
        <form onSubmit={handleLoginCheck}>
          <p>
            이메일(email):&nbsp;
            <input type="text" name="email" required placeholder='아이디 입력'/>&nbsp;
          </p>
          <p>
            비밀번호(Password):&nbsp;
            <input type="password" name="password" required placeholder='비밀번호 입력'/>&nbsp;
          </p>
          <button type="submit">로그인</button>&nbsp;
          
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
