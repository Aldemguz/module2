package io.bootcamp.module.exception;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.http.HttpStatus;

import junit.framework.TestCase;

public class ModuleExceptionTest extends TestCase {

	@Test
	public void testModuleExceptionConstructor() {
		String value = "value_test";

		ModuleException ex = new ModuleException(HttpStatus.OK,value);

		Assert.assertEquals(HttpStatus.OK, ex.getStatus());
		Assert.assertEquals(value, ex.getMessage());
	}

}
