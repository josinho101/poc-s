package com.josinho.rest.services.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.josinho.rest.services.exceptions.UserNotFoundException;
import com.josinho.rest.services.modals.Post;
import com.josinho.rest.services.modals.User;
import com.josinho.rest.services.repository.PostRepository;
import com.josinho.rest.services.repository.UserRepository;

@RestController
@RequestMapping(path = "/api")
public class PostsController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@GetMapping(path = "/users/{userId}/posts")
	public ResponseEntity<Object> findAll(@PathVariable int userId) {
		Optional<User> user = userRepository.findById(userId);
		if (!user.isPresent()) {
			throw new UserNotFoundException("Id - " + userId);
		}

		return ResponseEntity.ok(user.get().getPosts());
	}

	@PostMapping(path = "/users/{userId}/posts")
	public ResponseEntity<Object> savePost(@PathVariable int userId, @RequestBody Post post) {
		Optional<User> optionalUser = userRepository.findById(userId);
		if (!optionalUser.isPresent()) {
			throw new UserNotFoundException("Id - " + userId);
		}

		User user = optionalUser.get();
		post.setUser(user);

		postRepository.save(post);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}
}
