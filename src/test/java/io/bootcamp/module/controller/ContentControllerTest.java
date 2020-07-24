package io.bootcamp.module.controller;

import static io.bootcamp.module.constants.URLConstants.API_CONTENT_URL;
import static io.bootcamp.module.constants.URLConstants.API_CHECK_URL;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.bootcamp.module.model.Content;
import io.bootcamp.module.model.State;
import io.bootcamp.module.model.dto.ContentDTO;
import io.bootcamp.module.service.ContentService;
import junit.framework.TestCase;

@RunWith(SpringRunner.class)
@WebMvcTest(ContentController.class)
public class ContentControllerTest extends TestCase {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private ContentService contentService;

	private Content content = new Content();

	private String url = "url_test";

	private String word = "word_test";

	private ContentDTO contentDTO = new ContentDTO();

	private List<Content> contentList = new ArrayList<>();

	@Override
	@Before
	public void setUp() throws Exception {
		super.setUp();

		contentDTO.setUrl(url);
		contentDTO.setWord(word);

		content.setUrl(url);
		content.setAuthorized(Boolean.TRUE);
	}

	@Test
	public void testGetContents() throws Exception {
		contentList.add(content);

		Mockito.when(contentService.getAllAuthorized()).thenReturn(contentList);

		mvc.perform(get(API_CONTENT_URL).accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andExpect(jsonPath("$.data[0].url", equalTo(url)));
	}

	@Test
	public void testGetContentsWhenListIsEmpty() throws Exception {
		Mockito.when(contentService.getAllAuthorized()).thenReturn(contentList);

		mvc.perform(get(API_CONTENT_URL).accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isNoContent());
	}
	
	@Test
	public void testDeleteContent() throws Exception {
		String request = new ObjectMapper().writeValueAsString(contentDTO);
		Mockito.when(contentService.getByUrl(url)).thenReturn(content);

		mvc.perform(delete(API_CONTENT_URL).contentType(MediaType.APPLICATION_JSON_VALUE).accept(MediaType.APPLICATION_JSON)
		.content(request)).andExpect(status().isOk());
	}
	
	@Test
	public void testCreateContentWhenContentExistAndisRejected() throws Exception {
		String request = new ObjectMapper().writeValueAsString(contentDTO);
		Mockito.when(contentService.getByUrl(url)).thenReturn(content);
		Mockito.when(contentService.checkContent(url, word)).thenReturn(true);

		mvc.perform(post(API_CHECK_URL).contentType(MediaType.APPLICATION_JSON_VALUE).accept(MediaType.APPLICATION_JSON)
		.content(request)).andExpect(status().isOk()).andExpect(jsonPath("$.state", equalTo(
				State.REJECTED.toString())));
	}
	
	@Test
	public void testCreateContentWhenContentExistAndisAccepted() throws Exception {
		String request = new ObjectMapper().writeValueAsString(contentDTO);
		Mockito.when(contentService.getByUrl(url)).thenReturn(content);
		Mockito.when(contentService.checkContent(url, word)).thenReturn(false);

		mvc.perform(post(API_CHECK_URL).contentType(MediaType.APPLICATION_JSON_VALUE).accept(MediaType.APPLICATION_JSON)
		.content(request)).andExpect(status().isOk()).andExpect(jsonPath("$.state", equalTo(
				State.ACCEPTED.toString())));
	}
	
	@Test
	public void testCreateContentWhenContentDoesNotExistAndisRejected() throws Exception {
		String request = new ObjectMapper().writeValueAsString(contentDTO);
		Mockito.when(contentService.getByUrl(url)).thenReturn(null);
		Mockito.when(contentService.checkContent(url, word)).thenReturn(true);

		mvc.perform(post(API_CHECK_URL).contentType(MediaType.APPLICATION_JSON_VALUE).accept(MediaType.APPLICATION_JSON)
		.content(request)).andExpect(status().isOk()).andExpect(jsonPath("$.state", equalTo(
				State.REJECTED.toString())));
	}
	
	@Test
	public void testCreateContentWhenContentDoesNotExistAndisAccepted() throws Exception {
		String request = new ObjectMapper().writeValueAsString(contentDTO);
		Mockito.when(contentService.getByUrl(url)).thenReturn(null);
		Mockito.when(contentService.checkContent(url, word)).thenReturn(false);

		mvc.perform(post(API_CHECK_URL).contentType(MediaType.APPLICATION_JSON_VALUE).accept(MediaType.APPLICATION_JSON)
		.content(request)).andExpect(status().isOk()).andExpect(jsonPath("$.state", equalTo(
				State.ACCEPTED.toString())));
	}

	
}
