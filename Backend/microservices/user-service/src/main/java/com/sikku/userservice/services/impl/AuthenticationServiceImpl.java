package com.sikku.userservice.services.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sikku.userservice.model.Role;
import com.sikku.userservice.model.User;
import com.sikku.userservice.model.request.SignInRequest;
import com.sikku.userservice.model.request.SignUpRequest;
import com.sikku.userservice.model.response.JwtAuthenticationResponse;
import com.sikku.userservice.repositories.IUserRepository;
import com.sikku.userservice.services.IAuthenticationService;
import com.sikku.userservice.services.IJwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements IAuthenticationService {
	private final IUserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final IJwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@Override
	public JwtAuthenticationResponse signup(SignUpRequest request) {
		log.info("AuthenticationServiceImpl()=> signup New user is trying to register: {}", request.getEmail());
		var user = User.builder().firstName(request.getFullName())
				.email(request.getEmail()).password(passwordEncoder.encode(request.getPassword())).role(Role.USER)
				.phoneNumber(request.getPhoneNumber()).build();		
		userRepository.save(user);
		log.info("AuthenticationServiceImpl()=> signup New user has been created: {}", user);
		var jwt = jwtService.generateToken(user);
		log.info("AuthenticationServiceImpl()=> token created: {}", jwt);
		return JwtAuthenticationResponse.builder().token(jwt).message("Register Success").status(true).build();
	}

	@Override
	public JwtAuthenticationResponse signin(SignInRequest request) {
		log.info("AuthenticationServiceImpl()=> signin User is trying to login: {}", request.getUserName());
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
		log.info("AuthenticationServiceImpl()=> signin User has been authenticated: {}", request.getUserName());
		var user = userRepository.findByEmail(request.getUserName())
				.orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
		log.info("AuthenticationServiceImpl()=> signin User has been found: {}", user);
		var jwt = jwtService.generateToken(user);
		log.info("AuthenticationServiceImpl()=> token created: {}", jwt);
		return JwtAuthenticationResponse.builder().message("Login Success").status(true).token(jwt).build();
	}
}