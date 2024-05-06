package com.sikku.tasksubmissionservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sikku.tasksubmissionservice.model.Submission;
import java.util.List;


public interface ISubmissionRepo extends JpaRepository<Submission, Long>{
	List<Submission> findByTaskId(Long taskId);

}