package io.bootcamp.module.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ModuleException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private final HttpStatus status;

	public ModuleException(HttpStatus status, String message) {
		super(message);
		this.status = status;
	}

}
