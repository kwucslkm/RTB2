package com.first.project.entity;

import lombok.Data;


@Data
public class PasswordRequest {
	private String id;
	private String username;
  private String inputPass;
  private String storedPass;
}
