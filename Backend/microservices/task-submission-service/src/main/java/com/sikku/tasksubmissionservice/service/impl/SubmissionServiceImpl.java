package com.sikku.tasksubmissionservice.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sikku.tasksubmissionservice.feignclient.ITaskServiceFeignClient;
import com.sikku.tasksubmissionservice.model.Submission;
import com.sikku.tasksubmissionservice.model.Task;
import com.sikku.tasksubmissionservice.repository.ISubmissionRepo;
import com.sikku.tasksubmissionservice.service.ISubmissionService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubmissionServiceImpl implements ISubmissionService {

	private final ISubmissionRepo submissionRepo;
	private final ITaskServiceFeignClient taskService;

	@Override
	public Submission submitTask(Long taskId, String githubLink, Long userId, String jwtToken) throws Exception {
		log.info("SubmissionServiceImpl=> submitTask() Fetching user by userId: {}", userId);
		Task task = taskService.getTaskById(taskId, jwtToken).getBody();
		if(task!=null) {
			log.info("Task found");
			Submission submission = new Submission();			
			submission.setTaskId(taskId);
			submission.setUserId(userId);
			submission.setGithubLink(githubLink);
			submission.setSubmissionTime(LocalDateTime.now());
			log.info("Submission created successfully");
			return submissionRepo.save(submission);
		}else {
			log.error("Task not found");
			throw new Exception("Task not found");
		}
	}

	@Override
	public Submission getSubmission(Long submissionId) throws Exception {
		log.info("SubmissionServiceImpl=> getSubmission() Fetching submission by submissionId: {}", submissionId);
		return submissionRepo.findById(submissionId).orElseThrow(() -> new Exception("Submission not found"));		
	}

	@Override
	public List<Submission> getAllTaskSubmissions() throws Exception {
		log.info("SubmissionServiceImpl=> getAllTaskSubmissions() Fetching all submissions");
		return submissionRepo.findAll();
	}

	@Override
	public List<Submission> getTaskSubmissionsByTaskId(Long taskId) throws Exception {
		log.info("SubmissionServiceImpl=> getTaskSubmissionsByTaskId() Fetching submissions by taskId: {}", taskId);
		return submissionRepo.findByTaskId(taskId);
	}

	@Override
	public Submission acceptDeclineSubmission(Long submissionId, String status, String jwtToken) throws Exception {
		log.info("SubmissionServiceImpl=> acceptDeclineSubmission() Fetching submission by submissionId: {}", submissionId);
		Submission submission = submissionRepo.findById(submissionId).orElseThrow(() -> new Exception("Submission not found"));		
		submission.setStatus(status);
		if (status.equals("ACCEPTED")) {
			log.info("Submission accepted");
			taskService.completeTask(submission.getTaskId(), jwtToken);
		}		
		return submissionRepo.save(submission);
	}
}
