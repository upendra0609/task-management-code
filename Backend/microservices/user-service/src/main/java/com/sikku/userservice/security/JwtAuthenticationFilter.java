package com.sikku.userservice.security;

import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sikku.userservice.services.IJwtService;
import com.sikku.userservice.services.IUserService;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final IJwtService jwtService;
	private final IUserService userService;

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain) throws ServletException, IOException, java.io.IOException {
		log.info("JwtAuthenticationFilter()=> doFilterInternal");
		final String authHeader = request.getHeader("Authorization");
		log.info("JwtAuthenticationFilter()=> doFilterInternal authHeader: {}", authHeader);
		final String jwt;
		final String userEmail;
		if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader, "Bearer ")) {
			log.info("JwtAuthenticationFilter()=> doFilterInternal authHeader is empty or does not start with Bearer");
			filterChain.doFilter(request, response);
			return;
		}
		jwt = authHeader.substring(7);
		userEmail = jwtService.extractUserName(jwt);
		log.info("JwtAuthenticationFilter()=> doFilterInternal userEmail extracted from jwt: {}", userEmail);
		if (StringUtils.isNotEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
			log.info("JwtAuthenticationFilter()=> doFilterInternal userEmail is not empty and SecurityContextHolder is empty");
			UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);
			log.info("JwtAuthenticationFilter()=> doFilterInternal userDetails: {}", userDetails);
			if (jwtService.isTokenValid(jwt, userDetails)) {
				log.info("JwtAuthenticationFilter()=> doFilterInternal jwt is valid");
				SecurityContext context = SecurityContextHolder.createEmptyContext();
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
						null, userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				context.setAuthentication(authToken);
				SecurityContextHolder.setContext(context);
				log.info("JwtAuthenticationFilter()=> doFilterInternal SecurityContextHolder: {}", SecurityContextHolder.getContext());
			}
		}
		log.info("JwtAuthenticationFilter()=> doFilterInternal calling filterChain.doFilter");
		filterChain.doFilter(request, response);
	}
}