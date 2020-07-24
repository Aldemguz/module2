package io.bootcamp.module.utilities;

import static io.bootcamp.module.constants.ResponseMessage.CONTENT_NOT_FOUND_MESSAGE;

import org.springframework.http.HttpStatus;

import io.bootcamp.module.exception.ModuleException;
import io.bootcamp.module.model.Content;

public class Utilities {
	public static void existContent(Content content) {
		if(content == null) {
			throw new ModuleException(HttpStatus.NO_CONTENT, CONTENT_NOT_FOUND_MESSAGE);
		}
	}

	private Utilities() {}
}
