package io.bootcamp.module.utilities;

import org.junit.Assert;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;

import junit.framework.TestCase;

public class ContentResponseTest extends TestCase {

	private String state = "message_test";

	@Test
	public void testContentResponseEmptyConstructor() {
		ContentResponse response = new ContentResponse();
		Assert.assertNull(response.getState());
	}

	@Test
	public void testContentResponseAllArgsConstructor() {
		ContentResponse response = new ContentResponse(state);

		Assert.assertEquals(state,response.getState());
	}

	@Test
	public void testContentResponseGettersAndSetters() {
		ContentResponse response = new ContentResponse();
		response.setState(state);

		Assert.assertEquals(state,response.getState());
	}
	  @Test
	  public void testContentResponseToJson() throws JsonProcessingException {
	    ContentResponse response = new ContentResponse(state);
	    String json = "{\"state\":\"message_test\"}";

	    String test = response.toJson();
	    Assert.assertFalse(test.isEmpty());
	    Assert.assertEquals(json, test.replace(" ", "").replaceAll("\n", ""));
	  }

}
