package com.first.project.controller;

import com.first.project.entity.User;
import com.first.project.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
	private final UserMapper userMapper;

  public UserController(UserMapper userMapper) {
      this.userMapper = userMapper;
  }

  @GetMapping("/")
  public List<User> getUsers() {
  	System.out.println("api connect");
  	List<User> list = userMapper.findAll();
  		System.out.println("userMapper.findall = >\n"+list);
      return list;
  }
}
//    @GetMapping("/api/users")
//    public String hello() {
//        return "테스트입니다.";
//    }
//}





/*public class UserController {

    private final UserMapper userMapper;

    public UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping
    public List<User> getUsers() {
        return userMapper.findAll();
    }
}*/
