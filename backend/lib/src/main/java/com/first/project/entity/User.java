package com.first.project.entity;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class User {
    private Long id;
    private String email;
    private String password;
    private String username;
    private String managerYn;
    private LocalDateTime created_At;
    private LocalDateTime updated_At;
		
}
