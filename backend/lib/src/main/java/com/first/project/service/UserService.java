package com.first.project.service;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.first.project.entity.User;
import com.first.project.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

@Service
public class UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	private final UserMapper userMapper;
	private final BCryptPasswordEncoder passwordEncoder;

	public UserService(UserMapper userMapper, BCryptPasswordEncoder passwordEncoder) {
		this.userMapper = userMapper;
		this.passwordEncoder = passwordEncoder;
	}

	public List<User> getUsers() {
		List<User> list = userMapper.findAll();
		return list;
	}
	public List<User> getManagerUsers() {
		List<User> list = userMapper.findManagerUsers();
		return list;
	}
	
	@Transactional
	public int updateUser(User user) {
		System.out.println("update data in userService = > "+ user);
		try {
			int result = userMapper.updateUser(user);
			
			return result;
		}catch (DataAccessException e) {
			logger.error("SQL 예외 발생: {}", e.getMessage(), e);
			throw new RuntimeException("회원 정보 update 중 오류 발생", e);
		}
	}
	@Transactional(rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
	public int saveUser(User user) {
		System.out.println("insert data in userService = > "+ user);
		try {
			String encryptedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encryptedPassword); // 암호화된 비밀번호로 변경
			System.out.println("user.getPassword = >"+ user.getPassword());
			/* System.out.println("service save before id = > " + user.getId()); */
			int result = userMapper.save(user);
			/* System.out.println("service save after id = > " + user.getId()); */
			System.out.println("service save result = > " + result);
			return result;
		} catch (DataAccessException e) {
			logger.error("SQL 예외 발생: {}", e.getMessage(), e);
			throw new RuntimeException("회원가입 중 오류 발생", e);
		}
	}

	public User findByEmail(User user) { 
		// 
		User result = userMapper.findByEmail(user.getEmail());
		return result;
	}

	public User loginCheck(User user) {
		/* System.out.println("login check  input user info = > "+ user); */
		try {
			User findByEmailResult = findByEmail(user);
			if(findByEmailResult != null) {
				String storedPassword = findByEmailResult.getPassword();
				/* System.out.println("login ismatch result = > "+ismatch); */
				if(passVarify(user.getPassword(), storedPassword)) return findByEmailResult;
				else return null;
				
			}else {
				System.out.println("해당하는 email이 없습니다.");
				return null;
			}
		}catch (DataAccessException e ) {
			logger.error("SQL 예외발생 : {}", e.getMessage(), e);
			throw new RuntimeException("로그인 확인 중 오류 발생", e);
		}
	}
	public boolean passVarify(String inputPassword, String storedPassword ) {
		if(passwordEncoder.matches(inputPassword, storedPassword)) {
			return true;
			
		}else return false;
		
	}

}
