package io.bootcamp.module.model;

import org.junit.Assert;
import org.junit.Test;

import junit.framework.TestCase;

public class ContentTest extends TestCase {

	private String value = "value";
	private Long id = 1L;

	@Test
	public void testContentEmptyConstructor() {
		Content content = new Content();

		Assert.assertNull(content.getId());
		Assert.assertNull(content.getUrl());
		Assert.assertNull(content.getAuthorized());
	}

	@Test
	public void testContentGetterAndSetters() {
		Content content = new Content();

		content.setId(id);
		content.setUrl(value);
		content.setAuthorized(true);

		Assert.assertEquals(id, content.getId());
		Assert.assertEquals(value,content.getUrl());
		Assert.assertTrue(content.getAuthorized());
	}

}