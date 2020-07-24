package io.bootcamp.module.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import io.bootcamp.module.model.Content;

@Repository
@RestResource(exported = false)
public interface ContentRepository extends JpaRepository<Content, Long> {
	Content findByUrl(String url);

	List<Content> findAllByAuthorized(Boolean authorized);
}
