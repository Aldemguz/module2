package io.bootcamp.module.constants;

public class ResponseMessage {

	// SERVER
	public static final String INTERNAL_SERVER_ERROR_MESSAGE = "exception.request_internal_server_error";

	// REQUEST
	public static final String REQUEST_METHOD_NOT_SUPPORTED = "exception.request_method_not_supported";
	public static final String REQUEST_MEDYA_TYPE_NOT_SUPPORTED = "exception.request_http_media_not_supporte";
	public static final String REQUEST_BODY_NOT_READABLE = "exception.request_not_readable";
	public static final String REQUEST_PARAMETERS_INVALID = "exception.request_parameters_invalid";
	public static final String REQUEST_HANDLER_NOT_FOUND = "exception.request_handler_not_found";
	public static final String REQUEST_EMPTY_VALUE = "request.null_or_empty_value";
	public static final String REQUEST_INVALID_VALUE = "request.invalid_value";

	// CONTENT
	public static final String CONTENT_NOT_FOUND_MESSAGE  = "content.not_found";

	// RESTTEMPLATE
	public static final String ERROR_RESTTEMPLATE_CALL = "resttesmplate.error_call";

	private ResponseMessage() {/*Empty*/}
}
