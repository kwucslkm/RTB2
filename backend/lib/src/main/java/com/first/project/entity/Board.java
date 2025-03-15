package com.first.project.entity;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Board {
  private Long id;
  private String writer;
  private String title;
  private String contents;
  private String category;
  private Long userid;
  private LocalDateTime created_At;
  private LocalDateTime updated_At;
}
