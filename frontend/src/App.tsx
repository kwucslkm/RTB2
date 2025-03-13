import {useEffect, useState} from "react";
import axios from "axios";
import * as api from "./service/userService";
import Nav from './page/layout/Nav.tsx';
import UserList from './page/control/UserList.tsx';
import Home from './page/control/Home.tsx';
import JoinForm from './page/control/JoinForm.tsx';
import LoginForm from './page/control/Loginform.tsx';
import Mypage from './page/control/Mypage.tsx';

import BoardList from './page/boardPages/BoardList.tsx';
import { User } from './types/types';

const App: React.FC = () => {
	const [mode, setMode] = useState('home');
	const [loginYn, setLoginYn] = useState(false);
	const [managerYn, setManagerYn] = useState(false);
	const [userInfo, setUserInfo] = useState<User>(null);
	const [username, setUsername] = useState("");
	/*const [upperMenu, setUpperMenu] = useState("App.");*/
	console.log("===== App.tsx");
	
	let homeControl = null;
	let upperMenu = null;
	
	const deleteSession = async () => {
		const logoutResult = await api.logout();
		if(logoutResult)
			alert("로그아웃 되었습니다. ");
	}
	
	const logincheck = async (email:string, password:string)=>{
		const loginResult = await api.loginchk({
			email, password
		});
		/*console.log(" loginReuslt in App.tsx = > ", loginResult);*/
		if(loginResult){
			alert(' App.tsx 로그인 성공');
			setMode('home');
			setLoginYn(true);
			setUserInfo(loginResult);
			setUsername(loginResult.username);
			setManagerYn(loginResult.managerYn === "Y" ? true:false);
		}
	}
	useEffect(() => {
	    console.log("App.tsx useEffect 관리자 확인 = > ", managerYn);
    }, [managerYn]);
/*	useEffect(() => {
	    console.log("App.tsx userInfo 확인 = > ", userInfo);
	}, [userInfo]);*/
	
	const updateMember = async (id:number, email:string,  username:string, managerYn:string) =>{
		const userUpdateResult = await api.userUpdate({
			id, email, username, managerYn
		});
		if(userUpdateResult){
			
			alert("수정되었습니다. ");
			setUserInfo(api.getSession());
			setMode("mypage");
		}
	};
	
	const joinMember = async (email:string, password:string, username:string, managerYn:string) => {
		const memberCreateResult = await api.joinMemberCreate({
			email, password, username, managerYn
		});
		if(memberCreateResult.status === 201){
			console.log("App.tsx  회원가입성공", memberCreateResult);
			setMode('login');
			alert(' 회원가입 되셨습니다.');
		}else if (memberCreateResult === 409){
			console.log("memberCreateResult = > ",memberCreateResult);
			alert('App.tsx 이미 가입된 아이디 입니다. ');
			setMode('join');
		}
	};
	//main page control
	if (mode == 'home'){
		upperMenu = "#Home";
		homeControl = <Home/>
	}else if (mode =='mypage'){
		upperMenu = "#myPage";
		homeControl = <Mypage onUpdateSubmit = {(_id, _email, _name, _managerYn)=>{
			const id = _id;
			const email = _email;
			const username = _name;
			const managerYn = _managerYn;
			/*console.log(id, email, username, managerYn);*/
			/*updateMember(id, email, username, managerYn);*/
			updateMember(_id, _email, _name, _managerYn);
		}}/>	
	}else if (mode == 'bd'){
		upperMenu = "#Board";
	 	homeControl = <BoardList onBoardListClick = {()=>{
			
						}}/>	
	
	}else if (mode == 'join'){
		upperMenu = "#Join";
		homeControl = <JoinForm onsubmitCreate = {(_email, _password, _name, _managerYn)=>{
							/*console.log('onsubmitCreate 실행됨');*/
							const email = _email;
							const password = _password;
							const username = _name;
							const managerYn = _managerYn;
							console.log("회원가입 데이터 from JoinForm = > ",email, password, username, managerYn);
							joinMember(email, password, username, managerYn);
						}
					}
					 />
	}else if (mode == 'login'){
		upperMenu = "#Login";
		homeControl = <LoginForm onSubmit ={(_email, _password)=>{
			console.log("input login email and password = > ",_email,_password);
			
			const email = _email;
			const password = _password;
			logincheck(email, password);
			
		}}
		 />
	}else if (mode == 'userList'){
		upperMenu = "#UserList";
		homeControl = <UserList/>
	}
	
    return (
        <div className="App">
            <div style = {{paddingBottom:'10px'}}> {upperMenu}</div>
			<Nav userInfo = {userInfo} userName = {username} _loginYn = {loginYn} _managerYn = {managerYn}
				 onJoinClick = {()=>{
				setMode('join');
				}}
				onHomeClick = {()=>{
					setMode('home');
				}}
				onMemberListClick = {()=>{
					setMode('userList');
				}}
				onLoginClick = {()=>{
					setMode('login');
				}}
				onLogoutClick = {()=>{
					deleteSession();
					setMode('home');
					setLoginYn(false);
					setManagerYn(false);
				}}
				onBoardListClick = {()=>{
					setMode('bd');
				}}
				onMyPageClick = {()=>{
					setMode('mypage');
				}}
				
			/>
			{homeControl}
			
        </div>
    );
}

export default App;
