package io.bootcamp.module.controller;

import static io.bootcamp.module.constants.URLConstants.APP_VERSION_URL;
import static io.bootcamp.module.constants.URLConstants.HEALTH_ENDPOINT_URL;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import io.bootcamp.module.controller.AppController;

import junit.framework.TestCase;

@RunWith(SpringRunner.class)
@WebMvcTest(AppController.class)
public class AppControllerTest extends TestCase {

	@Autowired
	private MockMvc mvc;

	@Value("${build.version}")
	private String buildVersion;

	@Test
	public void testGetVersion() throws Exception {
		mvc.perform(get(APP_VERSION_URL)
				.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.version", equalTo(buildVersion)));
	}

	@Test
	public void testGetIndex() throws Exception {
		mvc.perform(get("/"))
		.andExpect(view().name("index"))
		.andExpect(status().isOk());
	}

	@Test
	public void testHealth() throws Exception {
		mvc.perform(get(HEALTH_ENDPOINT_URL))
		.andExpect(view().name("redirect:/"))
		.andExpect(status().isFound());
	}
}