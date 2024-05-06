package com.sikku.tasksubmissionservice.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestHeader;

import com.sikku.tasksubmissionservice.model.Submission;

public interface ISubmissionService {
	
	Submission submitTask(Long taskId, String githubLink, Long userId, @RequestHeader("authorization") String jwtToken)
			throws Exception;

	Submission getSubmission(Long submissionId) throws Exception;

	List<Submission> getAllTaskSubmissions() throws Exception;

	List<Submission> getTaskSubmissionsByTaskId(Long taskId) throws Exception;

	Submission acceptDeclineSubmission(Long submissionId, String status, String jwtToken) throws Exception;

}
