package com.sikku.tasksubmissionservice.model;

public enum TaskStatus {
	PENDING("PENDING"), ASSIGNED("ASSIGNED"), DONE("DONE");

	public final String status;

	TaskStatus(String status) {
		this.status = status;
	}
}
