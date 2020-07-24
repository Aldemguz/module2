package io.bootcamp.module.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Content")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Content {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	protected Long id;

	@Column(nullable = false)
	@JsonProperty("url")
	private String url;

	@Column(nullable = false)
	@JsonIgnore
	private Boolean authorized;
}
