package com.first.project.entity;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private LocalDateTime create_At;
}
