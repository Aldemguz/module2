package io.bootcamp.module.pojo;

import org.junit.Assert;
import org.junit.Test;

import io.bootcamp.module.pojo.ModuleProperties;
import junit.framework.TestCase;

public class ModulePropertiesTest extends TestCase {

	private String text = "test";

	@Test
	public void testModulePropertiesEmptyConstructor() {
		ModuleProperties module = new ModuleProperties();

		Assert.assertNull(module.getTag());
	}

	@Test
	public void testModulePropertiesRequiredConstructor() {
		ModuleProperties module = new ModuleProperties(text);

		Assert.assertEquals(text,module.getTag());
	}

	@Test
	public void testModulePropertiesGettersAndSetters() {
		ModuleProperties module = new ModuleProperties();
		module.setTag(text);
		Assert.assertEquals(text,module.getTag());
	}

}
