package io.bootcamp.module.model.dto;

import static io.bootcamp.module.constants.ResponseMessage.REQUEST_EMPTY_VALUE;

import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeleteContentDTO {
	@NotEmpty(message = REQUEST_EMPTY_VALUE)
	@JsonProperty("url")
	private String url;
}
