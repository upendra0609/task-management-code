package com.sikku.tasksubmissionservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sikku.tasksubmissionservice.feignclient.IUserServiceFeignClient;
import com.sikku.tasksubmissionservice.model.Submission;
import com.sikku.tasksubmissionservice.model.UserDTO;
import com.sikku.tasksubmissionservice.service.ISubmissionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/submission")
@RequiredArgsConstructor
public class SubmissionController {

	private final ISubmissionService submissionService;
	private final IUserServiceFeignClient userServiceFeignClient;

	@PostMapping("")
	public ResponseEntity<Submission> submitTask(@RequestParam Long taskId, @RequestParam String githubUrl,
			@RequestHeader("Authorization") String token) throws Exception {		
		ResponseEntity<UserDTO> user = userServiceFeignClient.getUserProfile(token);		
		Submission submitTask = submissionService.submitTask(taskId, githubUrl, user.getBody().getId(), token);
		return ResponseEntity.ok(submitTask);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Submission> getSubmissionById(@PathVariable Long id,
			@RequestHeader("Authorization") String token) throws Exception {
		Submission submission = submissionService.getSubmission(id);
		return ResponseEntity.ok(submission);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Submission>> getAllSubmission(@RequestHeader("Authorization") String token)
			throws Exception {
		List<Submission> submission = submissionService.getAllTaskSubmissions();
		return ResponseEntity.ok(submission);
	}

	@GetMapping("/task/{taskId}")
	public ResponseEntity<List<Submission>> getSubmissionByTaskId(@PathVariable Long taskId,
			@RequestHeader("Authorization") String token) throws Exception {
		List<Submission> submission = submissionService.getTaskSubmissionsByTaskId(taskId);
		return ResponseEntity.ok(submission);
	}

	@PatchMapping("/{submissionId}")
	public ResponseEntity<Submission> acceptDeclineSubmission(@PathVariable Long submissionId,
			@RequestParam String status, @RequestHeader("Authorization") String token) throws Exception {		
		Submission submission = submissionService.acceptDeclineSubmission(submissionId, status, token);		
		return ResponseEntity.ok(submission);
	}

}
