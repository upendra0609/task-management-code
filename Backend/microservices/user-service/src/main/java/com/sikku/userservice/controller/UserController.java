package com.sikku.userservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sikku.userservice.model.User;
import com.sikku.userservice.services.IUserService;
import com.sikku.userservice.services.impl.JwtServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final JwtServiceImpl jwtService;
	private final IUserService userService;

	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwtToken) {
		log.info("UserController=> getUserProfile()");
		jwtToken = jwtToken.split(" ")[1].trim();
		log.info("UserController=> getUserProfile() jwtToken: {}", jwtToken);
		String userName = jwtService.extractUserName(jwtToken);
		log.info("UserController=> getUserProfile() userName: {}", userName);
		return ResponseEntity.ok(userService.loadUserByUsername(userName));
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUsers() {
		log.info("UserController=> getAllUsers()");
		return ResponseEntity.ok(userService.getAllUsers());
	}

}
