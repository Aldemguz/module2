package io.bootcamp.module.model.dto;

import org.junit.Assert;
import org.junit.Test;

import junit.framework.TestCase;

public class DeleteContentDTOTest extends TestCase {

	private String text = "test";

	@Test
	public void testDeleteContentDTOEmptyConstructor() {
		DeleteContentDTO dto = new DeleteContentDTO();

		Assert.assertNull(dto.getUrl());
	}

	@Test
	public void testDeleteContentDTOGettersAndSetters() {
		DeleteContentDTO dto = new DeleteContentDTO();

		dto.setUrl(text);

		Assert.assertEquals(text,dto.getUrl());
	}

}
