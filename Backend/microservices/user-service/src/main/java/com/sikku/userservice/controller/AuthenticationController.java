package com.sikku.userservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sikku.userservice.model.request.SignInRequest;
import com.sikku.userservice.model.request.SignUpRequest;
import com.sikku.userservice.model.response.JwtAuthenticationResponse;
import com.sikku.userservice.services.IAuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final IAuthenticationService authenticationService;
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignUpRequest request) {
    	log.info("AuthenticationController()=> signup New user is trying to register: {}", request.getEmail());
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SignInRequest request) {
    	log.info("AuthenticationController()=> signin User is trying to login: {}", request.getUserName());
        return ResponseEntity.ok(authenticationService.signin(request));
    }
}