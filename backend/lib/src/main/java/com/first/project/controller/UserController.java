package com.first.project.controller;

import com.first.project.entity.PasswordRequest;
import com.first.project.entity.User;
import com.first.project.mapper.UserMapper;
import com.first.project.service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @SessionAttributes("userInfo") 
@RestController
@RequestMapping("/api/users")
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("varifyPass")
	/* public boolean varifyPass(@RequestParam String inputPass, @RequestParam String storedPass) {*/
	public ResponseEntity<Boolean> varifyPass(@RequestBody PasswordRequest request) {
		System.out.println("비밀번호 검증 "+request.getInputPass()+request.getStoredPass());
		try {
      boolean isMatch = userService.passVarify(request.getInputPass(), request.getStoredPass());
      return ResponseEntity.ok(isMatch);
  } catch (DataAccessException e) {
      System.err.println("user controller SQL 예외 발생: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
  }
	/*
	 * try { return userService.passVarify(inputPass, storedPass);
	 * }catch(DataAccessException e) { // SQL 예외 발생 시
	 * System.err.println("user controller SQL 예외 발생: " + e.getMessage()); return
	 * false;
	 */
		
		
	}
	@GetMapping("/logout")
	public boolean logout(HttpSession session) {
		System.out.println("logout connect");
		session.invalidate();
		
		return true;
		
	}
	
	@GetMapping("/getUserSession")
  public Object getUserSession(HttpSession session) {
  	System.out.println("세션조회 시작");
      User userInfo = (User)session.getAttribute("userInfo");
      System.out.println("this is Session Controller 조회 된 세션 정보 = > "+userInfo);
      if (userInfo != null) {
          return userInfo; // 세션 값 반환
      } else {
          return null; // 세션 값이 없을 경우
      }
  }
	
	@GetMapping("/")
	public List<User> getUsers() {
		System.out.println("api connect");
		List<User> list = userService.getUsers();
		/* System.out.println("userMapper.findall = >\n"+list); */
		return list;
	}
	@GetMapping("/findManagerList")
	public List<User> getManagerUsers() {
		System.out.println("api connect");
		List<User> list = userService.getManagerUsers();
		/* System.out.println("userMapper.findall = >\n"+list); */
		return list;
	}
	@PostMapping("/login")
	public User login(@RequestBody User user, HttpSession session) {
		try {
			User loginUserInfo = userService.loginCheck(user);
			if (loginUserInfo != null) {
				/* System.out.println("UserChecked = > \n" + loginUserInfo); */
				
				session.setAttribute("userInfo", loginUserInfo);
				User userInfoInsession = (User)session.getAttribute("userInfo");
				System.out.println(" UserController SessionUserInfo = > \n" + userInfoInsession);
				return userInfoInsession;
			}
		}catch(DataAccessException e) {
		// SQL 예외 발생 시
			System.err.println("user controller SQL 예외 발생: " + e.getMessage());
			return null;
		}
		return null;
	}

	@PostMapping("/update")
	public ResponseEntity<String> updateUser(@RequestBody User user, HttpSession session){
		try {
			int result = userService.updateUser(user);
			System.out.println("== update result  = > "+ result);
			if (result > 0) {
				session.setAttribute("userInfo", userService.findByEmail(user));
				
				return ResponseEntity.status(HttpStatus.OK).body("User updated successfully");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to updated user");
			}
		}catch (DataAccessException e) {
		// SQL 예외 발생 시
			System.err.println("user controller SQL 예외 발생: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error occurred");
		}
	}
	@PostMapping("/join")
	public ResponseEntity<String> saveUser(@RequestBody User user) {
		/* System.out.println(" from aip.ts = > "+ user); */ 
		User dupleCheckResult = userService.findByEmail(user);
		/* System.out.println("dupleCheckEmail = > " +dupleCheckEmail); */
		if (dupleCheckResult == null) {
			try {
				int result = userService.saveUser(user);
				if (result > 0) {
					return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create user");
				}
			} catch (DataAccessException e) {
				// SQL 예외 발생 시
				System.err.println("user controller SQL 예외 발생: " + e.getMessage());
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error occurred");
			}
		}else {
	    System.out.println("중복 이메일 중복");
	    return ResponseEntity
	        .status(HttpStatus.CONFLICT)
	        .body("Email already exist 이미 사용 중인 이메일입니다.");
		}
	}

}
