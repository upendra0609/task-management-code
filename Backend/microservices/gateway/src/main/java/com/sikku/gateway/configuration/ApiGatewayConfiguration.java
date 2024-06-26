package com.sikku.gateway.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class ApiGatewayConfiguration {
	
	 @Bean
	    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
	        return builder.routes()
	            .route(r -> r.path("/api/v1/auth/**")
	                .uri("lb://USER-SERVICE"))
	            .route(r -> r.path("/api/v1/user/**")	            		
	                .uri("lb://USER-SERVICE"))
	            // Add more routes for other services
	            
	            .route(r -> r.path("/api/v1/task/**")
	                .uri("lb://TASK-SERVICE"))
	            .route(r -> r.path("/api/v1/submission/**")
	                .uri("lb://TASK-SUBMISSION-SERVICE"))
	            .build();
	    }

	    @Bean
	    public CorsWebFilter corsWebFilter() {
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true);
	        config.addAllowedOrigin("http://localhost:5173");
	        config.addAllowedHeader("*");
	        config.addAllowedMethod("*");

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", config);

	        return new CorsWebFilter(source);
	    }

}
