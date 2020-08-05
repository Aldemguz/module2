package io.bootcamp.module.service;

import static io.bootcamp.module.constants.ResponseMessage.ERROR_RESTTEMPLATE_CALL;
import static io.bootcamp.module.constants.Constants.WORD_PATTERN;
import static io.bootcamp.module.constants.Constants.WORD_KEY;

import java.util.List;

import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private static final Logger logger = LoggerFactory.getLogger(ContentService.class);

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
		String page = this.callUrl(url).toLowerCase();	
		logger.info("searching word: '{}' in page: {}", word, url);
		
		return page.matches(WORD_PATTERN.replace(WORD_KEY, word.toLowerCase()));
	}

	public List<Content> getAllAuthorized(){
		return contentRepository.findAllByAuthorized(Boolean.TRUE);
	}

	private String callUrl(String url) {

		HttpEntity<?> request = new HttpEntity<>(this.setHeaders());

		try {
			return Jsoup.parse(restTemplate.exchange(url,
					HttpMethod.GET, request, String.class ).getBody()).text();

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
