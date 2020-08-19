package io.bootcamp.module.controller;

import static io.bootcamp.module.constants.URLConstants.API_CHECK_URL;
import static io.bootcamp.module.constants.URLConstants.API_CONTENT_URL;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import io.bootcamp.module.model.Content;
import io.bootcamp.module.model.State;
import io.bootcamp.module.model.dto.ContentDTO;
import io.bootcamp.module.model.dto.DeleteContentDTO;
import io.bootcamp.module.service.ContentService;
import io.bootcamp.module.utilities.ContentResponse;
import io.bootcamp.module.utilities.Response;
import io.bootcamp.module.utilities.Utilities;

// TODO
@Controller
public class ContentController {

	private static final Logger logger = LoggerFactory.getLogger(ContentController.class);

	@Autowired
	private ContentService contentService;

	@PostMapping(value = API_CHECK_URL, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ContentResponse> createContent(@Valid @RequestBody ContentDTO contentDTO) {
		logger.info("Called resource: POST /api/content/check with url: {} and word: {}"
				, contentDTO.getUrl(), contentDTO.getWord());
		ContentResponse response = new ContentResponse();
		boolean isFound = contentService.checkContent(contentDTO.getUrl(), contentDTO.getWord());

		Content content = contentService.getByUrl(contentDTO.getUrl());
		if(content==null) {
			content = new Content();
			content.setUrl(contentDTO.getUrl());
		}

		content.setAuthorized(isFound ? Boolean.FALSE : Boolean.TRUE);
		response.setState(isFound ? State.REJECTED.toString() : State.ACCEPTED.toString());

		contentService.storeContent(content);
		logger.info("Content with url: {} created Successfully", contentDTO.getUrl());
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping(value = API_CONTENT_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<List<Content>>> getAuthorizedContents() {
		logger.info("Called resource: GET /api/content");

		List<Content> list = contentService.getAllAuthorized();

		Response<List<Content>> response = new Response<>(list,null);
		logger.info("All authorized contents consulted successfully");
		return new ResponseEntity<>(response, list.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
	}

	@DeleteMapping(value = API_CONTENT_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<Content>> deleteContent(@Valid @RequestBody DeleteContentDTO deleteContentDTO){
		logger.info("Called resource: DELETE /api/content with url: {}", deleteContentDTO.getUrl());

		Content content = contentService.getByUrl(deleteContentDTO.getUrl());
		Utilities.existContent(content);

		contentService.removeContent(content);
		logger.info("content with url: {}, removed successfully", deleteContentDTO.getUrl());
		Response<Content> response = new Response<>(content, null);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
