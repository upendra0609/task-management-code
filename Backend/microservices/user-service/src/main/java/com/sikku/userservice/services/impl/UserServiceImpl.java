package com.sikku.userservice.services.impl;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sikku.userservice.model.User;
import com.sikku.userservice.repositories.IUserRepository;
import com.sikku.userservice.services.IUserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements IUserService {

	private final IUserRepository userRepository;

	/*
	 * used in JwtAuthenticationFilter.java
	 */
	@Override
	public UserDetailsService userDetailsService() {
		log.info("UserServiceImpl=> userDetailsService()");
		return new UserDetailsService() {
			@Override
			public UserDetails loadUserByUsername(String username) {
				return userRepository.findByEmail(username)
						.orElseThrow(() -> new UsernameNotFoundException("User not found"));
			}
		};
	}
	
	
	/*
	 * Lambda
	 */
//	@Override
//    public UserDetailsService userDetailsService() {
//    	return username -> userRepository.findByEmail(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//    }
	
	public User loadUserByUsername(String username) {
		log.info("UserServiceImpl=> loadUserByUsername()");
		return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}


	@Override
	public List<User> getAllUsers() {
		log.info("UserServiceImpl=> getAllUsers()");
		return userRepository.findAll();
	}

}
