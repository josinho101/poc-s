package com.josinho.rest.services.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.josinho.rest.services.dao.PostsDaoService;

@RestController
@RequestMapping(path = "/api")
public class PostsController {

	@Autowired
	private PostsDaoService service;

	@GetMapping(path = "/users/{userId}/posts")
	public ResponseEntity<Object> findAll(@PathVariable int userId) {
		return ResponseEntity.ok(service.findAll(userId));
	}
}
