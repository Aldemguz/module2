package io.bootcamp.module.service;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import io.bootcamp.module.exception.ModuleException;
import io.bootcamp.module.model.Content;
import io.bootcamp.module.repository.ContentRepository;
import junit.framework.TestCase;

@RunWith(SpringRunner.class)
public class ContentServiceTest extends TestCase {

	@MockBean
	private RestTemplate restTemplate;

	@Autowired
	private ContentService contentService;

	private List<Content> contentList = new ArrayList<>();

	@MockBean
	private ContentRepository contentRepository;

	@TestConfiguration
	static class ContentServiceTestContextConfiguration {
		@Bean
		public ContentService contentService() {
			return new ContentService();
		}
	}

	private HttpHeaders headers;

	ResponseEntity<String> response;

	private String value = "value_test";

	private Content content = new Content();

	@Override
	@Before
	public void setUp() throws Exception {
		super.setUp();

		headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		response = new ResponseEntity<>(value,HttpStatus.OK);
		content.setUrl(value);
	}

	@Test
	public void testGetByUrl() {
		Mockito.when(contentRepository.findByUrl(value)).thenReturn(content);

		Content content2 = contentService.getByUrl(value);

		Assert.assertEquals(content, content2);
	}

	@Test
	public void testGetByUrlWhenNotFound() {
		Mockito.when(contentRepository.findByUrl(value)).thenReturn(null);

		Content content2 = contentService.getByUrl(value);

		Assert.assertNull(content2);
	}

	@Test
	public void testStoreContent() {
		Mockito.when(contentRepository.save(content)).thenReturn(content);

		Content content2 = contentService.storeContent(content);

		Assert.assertEquals(content, content2);
	}

	@Test
	public void testGetAllAuthorizedContents() {
		contentList.add(content);

		Mockito.when(contentRepository.findAllByAuthorized(true)).thenReturn(contentList);

		List<Content> list2 = contentService.getAllAuthorized();

		Assert.assertEquals(contentList, list2);
	}

	@Test
	public void testGetAllAuthorizedContentsWhenIsEmpty() {
		Mockito.when(contentRepository.findAllByAuthorized(true)).thenReturn(contentList);

		List<Content> list2 = contentService.getAllAuthorized();

		Assert.assertEquals(0, list2.size());
	}

	@Test
	public void testCheckContent() {
		HttpEntity<?> request = new HttpEntity<>(headers);

		Mockito.when(restTemplate.exchange(value, HttpMethod.GET, request,
				String.class)).thenReturn(response);

		boolean isFound = contentService.checkContent(value, value);
		Assert.assertTrue(isFound);
	}

	@Test
	public void testCheckContentWhenFails() {

		HttpEntity<?> request = new HttpEntity<>(headers);

		Mockito.when(restTemplate.exchange(value, HttpMethod.GET, request,
				String.class)).thenThrow(ModuleException.class);

		try {
			contentService.checkContent(value, value);
		}catch(ModuleException e) {
			Assert.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, e.getStatus());
		}
	}
	
	@Test
	public void testRemovedContent() {
		contentService.removeContent(content);
		Assert.assertTrue(true);
	}

}
