package io.bootcamp.module.service;

import static io.bootcamp.module.constants.ResponseMessage.ERROR_RESTTEMPLATE_CALL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import io.bootcamp.module.exception.ModuleException;
import io.bootcamp.module.model.Content;
import io.bootcamp.module.repository.ContentRepository;

@Service
public class ContentService {

	@Autowired
	private ContentRepository contentRepository;

	@Autowired
	private RestTemplate restTemplate;

	public Content getByUrl(String url) {

		return contentRepository.findByUrl(url);
	}

	public Content storeContent(Content content) {

		return contentRepository.save(content);
	}

	public void removeContent(Content content) {

		contentRepository.delete(content);
	}

	public boolean checkContent(String url, String word) {
		String page = this.callUrl(url);

		return page.contains(word);
	}

	public List<Content> getAllAuthorized(){
		return contentRepository.findAllByAuthorized(Boolean.TRUE);
	}

	private String callUrl(String url) {

		HttpEntity<?> request = new HttpEntity<>(this.setHeaders());

		try {
			return restTemplate.exchange(url,
					HttpMethod.GET, request, String.class ).getBody();

		}catch (Exception exception){

			throw new ModuleException(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_RESTTEMPLATE_CALL);
		}
	}

	private HttpHeaders setHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return headers;
	}

}
