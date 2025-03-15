import React, { useEffect, useState } from "react";
import "../../styles/layout.css";
import * as api from "../../service/userService";
import { User } from "../../types/types";

interface NavProps {
  userInfo: User|null;
  userName: string;
  _managerYn: boolean;
  _loginYn: boolean;
  onMyPageClick(): void;
  onLoginClick(): void;
  onJoinClick(): void;
  onMemberListClick(): void;
  onLogoutClick(): void;
  onHomeClick(): void;
  onBoardListClick(): void;
  onFreeBoardListClick(): void;
}
const Nav: React.FC<NavProps> = ({
  userInfo,
  userName,
  _managerYn,
  _loginYn,
  onMyPageClick,
  onHomeClick,
  onMemberListClick,
  onLoginClick,
  onJoinClick,
  onLogoutClick,
  onBoardListClick,
  onFreeBoardListClick,
}) => {
  const [loginYnS, setLoginYnS] = useState(_loginYn);
  const [userInfoS, setUserInfoS] = useState<User | null>(userInfo);
  const [usernameS, setUserNameS] = useState(userName);
  const [managerYnS, setManagerYnS] = useState(_managerYn);

  console.log(" ==== Nav.tsx");
  /*console.log(" == = Nav 프롭스 관리자 확인 = > ", _managerYn);*/
  // 세션 userInfo 값 가져오기
  const getSessionInNav = async () => {
    /*console.log("Nav. getSessionInNav 함수 실행!! 세션값 가져오자~~~ ");*/
    const user = await api.getSession();
    if (user) {
      setUserInfoS(user);
      setUserNameS(user.username);
      setLoginYnS(true);
      setManagerYnS(user.managerYn === "Y");
      console.log(" = = Nav. session에 user 있다면 = > ", user);
      /*const managerList = await api.findManager();*/
      /*const isManagerYn = user.managerYn;*/
      /*const isManagerYn = managerList.some((manager) => user.email === manager.email);*/
      /*sessionStorage.setItem("userInfo", JSON.stringify(user));
			sessionStorage.setItem("managerYnS", JSON.stringify(isManagerYn));*/
    } else {
      console.log(" = = Nav. No session value in server  ", userInfoS);
    }
  };
  useEffect(() => {
    console.log("  === Nav. useEffect");

    /*setLoginYnS(_loginYn);
		setManagerYnS(userInfoS.managerYn ==="Y" ? true:false);*/
    if (!_loginYn) {
      setLoginYnS(false);
      setUserInfoS(null);
      setManagerYnS(false);
    }
    getSessionInNav();
  }, [userInfo]);
  /*useEffect(() => {
		    console.log(" == = Nav 관리자 확인 2 = > ", managerYnS);
	    }, [managerYnS]);*/
  const handleLoginClick = async () => {
    /*console.log("로그 아웃 후 다시 로그인 할때 세션 값 가져오는 함수")*/
    /*getSessionInNav();*/
    onLoginClick();
  };

  /*const nickname: string = memberInfo ? JSON.parse(memberInfo).nickname : null;*/
  return (
    <nav>
      <div className="nav container ">
        <ul className="menu">
          {" "}
          {/*드롭다운 메뉴 부분 */}
          <div id="grid">
            <span className="left">
              <li className="dropdown">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onHomeClick();
                  }}
                >
                  Home
                </a>
              </li>

              {loginYnS && managerYnS && (
                <li className="dropdown">
                  <a
                    href="/list"
                    onClick={(e) => {
                      e.preventDefault();
                      onMemberListClick();
                    }}
                  >
                    {" "}
                    MemberList{" "}
                  </a>
                </li>
              )}

              {loginYnS && (
                <li className="dropdown">
                  Board
                  <ul className="dropdown-menu">
                    {" "}
                    {/*드롭다운 메뉴 부분 */}
                    <li className="dropdown">
                      <a
                        href="/notice"
                        onClick={(e) => {
                          e.preventDefault();
                          onBoardListClick();
                        }}
                      >
                        {" "}
                        공지사항
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        href="/free"
                        onClick={(e) => {
                          e.preventDefault();
                          onFreeBoardListClick();
                        }}
                      >
                        {" "}
                        자유게시판
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </span>
            <span className="right">
              {!loginYnS && (
                <li className="dropdown">
                  <a
                    href="/join"
                    onClick={(e) => {
                      e.preventDefault();
                      onJoinClick();
                    }}
                  >
                    {" "}
                    join{" "}
                  </a>
                </li>
              )}
              {!loginYnS && (
                <li className="dropdown">
                  <a
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("로그인화면 띄우기");
                      handleLoginClick();
                      /*onLoginClick();*/
                    }}
                  >
                    {" "}
                    login{" "}
                  </a>
                </li>
              )}
              {loginYnS && (
                <li className="dropdown">
                  <a
                    href="/myPage"
                    onClick={(e) => {
                      e.preventDefault();
                      onMyPageClick();
                    }}
                  >
                    {" "}
                    {managerYnS && (
                      <span style={{ color: "blue" }}>(Manager)</span>
                    )}{" "}
                    {usernameS} 님 환영합니다.{" "}
                  </a>
                </li>
              )}
              {loginYnS && (
                <li className="dropdown">
                  <a
                    href="/logout"
                    onClick={(e) => {
                      e.preventDefault();
                      onLogoutClick();
                      setUserInfoS(null); // 🔥 로그아웃 시 userInfo 초기화
                      setUserNameS(""); // 🔥 로그아웃 시 username 초기화
                      setLoginYnS(false);
                    }}
                  >
                    {" "}
                    Logout{" "}
                  </a>
                </li>
              )}
            </span>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
