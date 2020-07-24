package io.bootcamp.module.config;

import static io.bootcamp.module.constants.Constants.LOGGER_MESSAGE;
import static io.bootcamp.module.constants.ResponseMessage.*;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.bootcamp.module.exception.ModuleException;
import io.bootcamp.module.utilities.Response;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@Autowired
	private MessageSource messageSource;

	private Locale locale = LocaleContextHolder.getLocale();

	private static final Logger loggerOut = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler({ ModuleException.class})
	public ResponseEntity<Object> moduleException(ModuleException e) {
		loggerOut.error("Caught exception: ModuleException");

		String message = messageSource.getMessage(e.getMessage(), null, locale);

		Response<Object> response = new Response<>(null, message);
		loggerOut.error(LOGGER_MESSAGE, message);

		return new ResponseEntity<>(response, e.getStatus());
	}

	@Override
	public ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		loggerOut.error("Caught exception: HttpRequestMethodNotSupportedException");

		Object[] args = new Object[] { ex.getMethod() };

		String message = messageSource.getMessage(REQUEST_METHOD_NOT_SUPPORTED, args, locale);

		Response<Object> response = new Response<>( null, message);
		loggerOut.error(LOGGER_MESSAGE, message);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		loggerOut.error("Caught exception: MethodArgumentNotValidException");

		StringBuilder errors = new StringBuilder();
		int i = 1;

		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			String errorOnParameter = messageSource.getMessage(error.getDefaultMessage(), null, locale);
			errors.append(" ").append(i++).append(") ").append(error.getField()).append(": ").append(errorOnParameter);
		}

		Object[] args = new Object[] { errors };
		String message = messageSource.getMessage(REQUEST_PARAMETERS_INVALID, args, locale);

		Response<Object> response = new Response<>(null, message);

		loggerOut.error(LOGGER_MESSAGE, message);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		loggerOut.error("Caught exception: NoHandlerFoundException");

		Object[] args = new Object[] { ex.getHttpMethod(), ex.getRequestURL() };

		String message = messageSource.getMessage(REQUEST_HANDLER_NOT_FOUND, args, locale);

		Response<Object> response = new Response<>(null, message);
		loggerOut.error(LOGGER_MESSAGE, message);

		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);

	}

	@Override
	protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		loggerOut.error("Caught exception: HttpMediaTypeNotSupportedException");
		Object[] args = new Object[] { ex.getContentType() };

		String message = messageSource.getMessage(REQUEST_MEDYA_TYPE_NOT_SUPPORTED, args, locale);

		Response<Object> response = new Response<>( null, message);
		loggerOut.error(LOGGER_MESSAGE, message);

		return new ResponseEntity<>(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
	}

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		loggerOut.error("Caught exception: HttpMessageNotReadableException");

		String message = messageSource.getMessage(REQUEST_BODY_NOT_READABLE, null, locale);

		Response<Object> response = new Response<>( null, message);

		loggerOut.error(LOGGER_MESSAGE, message);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<Object> handleAll(Exception ex, WebRequest request) {
		loggerOut.error("Caught exception: Exception");
		loggerOut.error("Exception: ", ex);

		String message = messageSource.getMessage(INTERNAL_SERVER_ERROR_MESSAGE, null, locale);

		Response<Object> response = new Response<>(null, message);
		loggerOut.error(LOGGER_MESSAGE, message);

		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
