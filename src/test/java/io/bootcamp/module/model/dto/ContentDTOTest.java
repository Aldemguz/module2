package io.bootcamp.module.model.dto;

import org.junit.Assert;
import org.junit.Test;

import junit.framework.TestCase;

public class ContentDTOTest extends TestCase {

	private String text = "test";

	@Test
	public void testContentDTOEmptyConstructor() {
		ContentDTO dto = new ContentDTO();

		Assert.assertNull(dto.getUrl());
		Assert.assertNull(dto.getWord());
	}

	@Test
	public void testContentDTOGettersAndSetters() {
		ContentDTO dto = new ContentDTO();

		dto.setUrl(text);
		dto.setWord(text);

		Assert.assertEquals(text,dto.getUrl());
		Assert.assertEquals(text,dto.getWord());
	}

}
