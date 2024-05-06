package com.sikku.userservice.services;

import com.sikku.userservice.model.request.SignInRequest;
import com.sikku.userservice.model.request.SignUpRequest;
import com.sikku.userservice.model.response.JwtAuthenticationResponse;

public interface IAuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SignInRequest request);
}