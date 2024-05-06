package com.sikku.tasksubmissionservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/submission")
public class HomeController {
	
	@GetMapping("/home")
	public String home() {
		return "Welcome to Task Submission Service";
	}

}
