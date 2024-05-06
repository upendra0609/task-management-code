package com.sikku.tasksubmissionservice.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Submission {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long taskId;
	private String githubLink;
	private Long userId;
	private String status = "PENDING";
	private LocalDateTime submissionTime;

}
