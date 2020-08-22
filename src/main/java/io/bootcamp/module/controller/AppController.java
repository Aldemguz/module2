package io.bootcamp.module.controller;

import static io.bootcamp.module.constants.URLConstants.HEALTH_ENDPOINT_URL;
import static io.bootcamp.module.constants.URLConstants.API_GET_PROPERTIES_URL;
import static io.bootcamp.module.constants.URLConstants.APP_VERSION_URL;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import io.bootcamp.module.pojo.ModuleProperties;
import io.bootcamp.module.utilities.Response;

@Controller
public class AppController {
	private static final Logger logger = LoggerFactory.getLogger(AppController.class);

	@Value("${build.version}")
	private String buildVersion;

	@Value("${app.tag}")
	private String appTag;

	@GetMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping(HEALTH_ENDPOINT_URL)
	public String health() {
		return "redirect:/";
	}

	@GetMapping(APP_VERSION_URL)
	@ResponseBody
	public ResponseEntity<Map<String, String>> getVersion() {
		logger.info("Called resource: getVersion");
		logger.info("Project version {}", buildVersion);

		Map<String, String> response = new HashMap<>();
		response.put("version", buildVersion);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping(API_GET_PROPERTIES_URL)
	@ResponseBody
	public ResponseEntity<Object> getProperties() {
		logger.info("Called resource: getProperties");
		ModuleProperties properties = new ModuleProperties(appTag);

		Response<Object> response = new Response<>(properties, null);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
