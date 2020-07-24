package io.bootcamp.module.utilities;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.http.HttpStatus;

import io.bootcamp.module.exception.ModuleException;
import io.bootcamp.module.model.Content;
import junit.framework.TestCase;

public class UtilitiesTest extends TestCase {

	@Test
	public void testExisteContent() {
		Content content = new Content();
		Utilities.existContent(content);
		Assert.assertTrue(true);
	}

	@Test
	public void testExisteContentWhenDoesNotExists() {
		try {
			Utilities.existContent(null);
		}catch(ModuleException e) {
			Assert.assertEquals(HttpStatus.NO_CONTENT, e.getStatus());
		}

	}
}
