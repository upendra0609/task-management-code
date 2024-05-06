package com.sikku.userservice.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.sikku.userservice.model.User;

public interface IUserService {
	UserDetailsService userDetailsService();
	User loadUserByUsername(String username);
	List<User> getAllUsers();
}
