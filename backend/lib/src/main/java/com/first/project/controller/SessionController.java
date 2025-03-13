package com.first.project.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.first.project.entity.User;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    @GetMapping("/user")
    public Object getUserSession(HttpSession session) {
    	System.out.println("세션조회 시작");
        User userInfo = (User)session.getAttribute("userInfo");
        System.out.println("this is Session Controller 조회 된 세션 정보 = > "+userInfo);
        if (userInfo != null) {
            return userInfo; // 세션 값 반환
        } else {
            return "nosession"; // 세션 값이 없을 경우
        }
    }
}
