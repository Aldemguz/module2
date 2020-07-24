package io.bootcamp.module.utilities;

import org.junit.Assert;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;

import junit.framework.TestCase;

public class ResponseTest extends TestCase {

	private String message = "message_test";
	private Long data = 1L;

	@Test
	public void testResponseEmptyConstructor() {
		Response<Object> response = new Response<Object>();
		Assert.assertNull(response.getData());
		Assert.assertNull(response.getMessage());
	}

	@Test
	public void testResponseGettersAndSetters() {

		Response<Long> response = new Response<Long>();
		response.setMessage(message);
		response.setData(data);

		Assert.assertEquals(message, response.getMessage());
		Assert.assertEquals(data, response.getData());
	}

	@Test
	public void testResponseRequiredConstructor() {
		Response<Long> response = new Response<Long>(data, message);

		Assert.assertEquals(message, response.getMessage());
		Assert.assertEquals(data, response.getData());
	}

	@Test
	public void testResponseToJson() throws JsonProcessingException {
		Response<Long> response = new Response<Long>(data, message);
		String json = "{\"data\":1,\"message\":\"message_test\"}";

		String test = response.toJson();
		Assert.assertFalse(test.isEmpty());
		Assert.assertEquals(json, test.replace(" ", "").replaceAll("\n", ""));
	}

}
